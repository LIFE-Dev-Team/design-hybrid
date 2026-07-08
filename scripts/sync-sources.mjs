#!/usr/bin/env node
/**
 * Check upstream design skills for updates.
 * Usage:
 *   node scripts/sync-sources.mjs           # report only
 *   node scripts/sync-sources.mjs --pull    # download changed remote files to _incoming/
 *   node scripts/sync-sources.mjs --write-lock
 */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HYBRID_ROOT = resolve(__dirname, "..");
const MANIFEST_PATH = join(HYBRID_ROOT, "sources.manifest.json");
const LOCK_PATH = join(HYBRID_ROOT, "sources.lock.json");
const INCOMING_DIR = join(HYBRID_ROOT, "_incoming");

const args = new Set(process.argv.slice(2));
const shouldPull = args.has("--pull");
const shouldWriteLock = args.has("--write-lock") || args.has("--pull");

function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function sha256(text) {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

function fileFingerprint(absPath) {
  if (!absPath || !existsSync(absPath)) return null;
  const stat = statSync(absPath);
  const content = readFileSync(absPath);
  return {
    path: absPath,
    size: stat.size,
    mtimeMs: stat.mtimeMs,
    sha256: sha256(content),
  };
}

function resolveLocal(manifestEntry) {
  const candidates = [manifestEntry.localMirror, manifestEntry.altLocalMirror].filter(Boolean);
  for (const rel of candidates) {
    const abs = resolve(HYBRID_ROOT, rel);
    if (existsSync(abs)) return abs;
  }
  return candidates.length ? resolve(HYBRID_ROOT, candidates[0]) : null;
}

function ghApi(path) {
  try {
    const out = execSync(`gh api "${path}"`, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
    return JSON.parse(out);
  } catch (e) {
    return { error: e.stderr?.toString() || e.message };
  }
}

function fetchRemoteMeta(source) {
  const apiPath = `repos/${source.repo}/contents/${source.remotePath}?ref=${source.branch || "main"}`;
  const data = ghApi(apiPath);
  if (data.error) return { error: data.error, id: source.id };
  return {
    id: source.id,
    sha: data.sha,
    size: data.size,
    url: data.download_url,
    htmlUrl: data.html_url,
  };
}

function downloadRemote(source, meta) {
  if (!meta.url) return null;
  const res = execSync(`gh api "repos/${source.repo}/contents/${source.remotePath}?ref=${source.branch || "main"}" -H "Accept: application/vnd.github.raw"`, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  mkdirSync(INCOMING_DIR, { recursive: true });
  const safeName = `${source.id}__${source.remotePath.replace(/[/\\]/g, "__")}`;
  const outPath = join(INCOMING_DIR, safeName);
  writeFileSync(outPath, res, "utf8");
  return outPath;
}

function compareFingerprints(prev, next) {
  if (!prev) return "new";
  if (prev.sha && next.sha && prev.sha !== next.sha) return "changed";
  if (prev.sha256 && next.sha256 && prev.sha256 !== next.sha256) return "changed";
  if (prev.size !== next.size) return "changed";
  return "same";
}

async function main() {
  const manifest = loadJson(MANIFEST_PATH);
  const prevLock = existsSync(LOCK_PATH) ? loadJson(LOCK_PATH) : { entries: {} };
  const nextLock = {
    checkedAt: new Date().toISOString(),
    hybridVersion: manifest.hybridVersion,
    entries: {},
  };

  const rows = [];
  let changedCount = 0;

  console.log(`\nDesign Hybrid — upstream sync (${manifest.hybridVersion})\n`);

  for (const source of manifest.sources) {
    const remote = fetchRemoteMeta(source);
    const localPath = resolveLocal(source);
    const local = fileFingerprint(localPath);

    const entry = {
      id: source.id,
      label: source.label,
      repo: source.repo,
      remotePath: source.remotePath,
      remoteSha: remote.sha || null,
      remoteSize: remote.size || null,
      localPath,
      localSha256: local?.sha256 || null,
      localSize: local?.size || null,
      install: source.install || null,
      error: remote.error || null,
    };

    const prev = prevLock.entries[source.id];
    const status = remote.error
      ? "error"
      : compareFingerprints(
          { sha: prev?.remoteSha, size: prev?.remoteSize },
          { sha: entry.remoteSha, size: entry.remoteSize }
        );

    if (status === "changed") changedCount += 1;

    if (shouldPull && status === "changed" && !remote.error) {
      entry.pulledTo = downloadRemote(source, remote);
    }

    nextLock.entries[source.id] = entry;
    rows.push({ ...entry, status });
  }

  for (const source of manifest.localOnly || []) {
    const localPath = resolveLocal(source);
    const local = fileFingerprint(localPath);
    const prev = prevLock.entries[source.id];
    const entry = {
      id: source.id,
      label: source.label,
      localPath,
      localSha256: local?.sha256 || null,
      localSize: local?.size || null,
      vaultRoot: source.vaultRoot || null,
    };
    const status = compareFingerprints(prev, entry);
    if (status === "changed") changedCount += 1;
    nextLock.entries[source.id] = entry;
    rows.push({ ...entry, status, repo: "(local)" });
  }

  for (const row of rows) {
    const flag =
      row.status === "changed" ? "UPDATE" : row.status === "error" ? "ERROR" : row.status === "new" ? "NEW" : "ok";
    console.log(`[${flag.padEnd(6)}] ${row.label}`);
    if (row.repo !== "(local)") {
      console.log(`         remote: ${row.repo}/${row.remotePath}`);
      if (row.remoteSha) console.log(`         sha: ${row.remoteSha.slice(0, 12)}… size: ${row.remoteSize}`);
    }
    if (row.localPath) {
      const exists = existsSync(row.localPath);
      console.log(`         local:  ${exists ? "found" : "MISSING"} (${row.localPath})`);
      if (exists) console.log(`         hash:   ${row.localSha256} size: ${row.localSize}`);
    }
    if (row.pulledTo) console.log(`         pulled: ${row.pulledTo}`);
    if (row.install) console.log(`         install: ${row.install}`);
    if (row.error) console.log(`         error: ${String(row.error).trim().slice(0, 200)}`);
    console.log("");
  }

  if (changedCount > 0) {
    console.log(`${changedCount} upstream source(s) changed since last lock.\n`);
    console.log("Recommended refresh:");
    console.log("  1. Re-install changed skills via the install commands above");
    console.log("  2. Review _incoming/ diffs against references/ in design-hybrid");
    console.log("  3. Merge meaningful rule changes into SKILL.md + references/");
    console.log("  4. Bump hybridVersion in sources.manifest.json");
    console.log("  5. Re-run: node scripts/sync-sources.mjs --write-lock\n");
  } else {
    console.log("All tracked sources match last lock.\n");
  }

  if (shouldWriteLock) {
    writeFileSync(LOCK_PATH, JSON.stringify(nextLock, null, 2) + "\n", "utf8");
    console.log(`Wrote ${LOCK_PATH}\n`);
  } else if (!existsSync(LOCK_PATH)) {
    console.log("Tip: run with --write-lock to baseline future comparisons.\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
