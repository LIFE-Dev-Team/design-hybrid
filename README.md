# Design Hybrid

Unified agent skill for premium frontend UI — merges routing and rules from [Taste Skill](https://github.com/Leonxlnx/taste-skill), [Impeccable](https://github.com/pbakaus/impeccable), [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), and related anti-slop / redesign presets into one orchestrator.

**Install name:** `design-hybrid-frontend`

## What it does

- **Routes by task:** marketing, product app, redesign, minimalist, agency, brutalist, Stitch
- **Pre-flight gates:** project brand docs, output completeness, optional Impeccable / marketing vault checks
- **Dial-driven design:** `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`
- **Unified anti-slop law:** typography, color, layout, content tells, motion guardrails
- **Sync script:** checks upstream skills for updates

This repo contains the **hybrid orchestrator only**. Upstream skills remain separate; install them via `sources.manifest.json` or let the hybrid reference their rules.

## Install

### Cursor / Claude Code (copy)

```bash
git clone git@github-work:LIFE-Dev-Team/design-hybrid.git
cp -r design-hybrid ~/.claude/skills/design-hybrid
# or for Cursor:
cp -r design-hybrid ~/.cursor/skills/design-hybrid
```

### npx skills (if published to skills registry)

```bash
npx skills add LIFE-Dev-Team/design-hybrid --skill design-hybrid-frontend
```

## Usage

In your agent prompt:

```text
Follow design-hybrid-frontend for this UI work.
```

Or reference `SKILL.md` directly in your skills configuration.

## Optional: marketing vault

The marketing gate can load Obsidian (or any folder) website frameworks. Set in `sources.manifest.json`:

```json
"vaultRoot": "/path/to/your/websites/knowledge"
```

Default in `references/marketing-gate.md` uses `$WEBSITES_VAULT_ROOT` — override locally after install.

## Keep updated

From the skill directory:

```bash
node scripts/sync-sources.mjs              # check upstream
node scripts/sync-sources.mjs --write-lock # baseline lockfile
node scripts/sync-sources.mjs --pull         # download changed upstream files
```

Requires [GitHub CLI](https://cli.github.com/) (`gh`) for remote checks.

## Structure

```
SKILL.md                 # Main orchestrator (load this)
sources.manifest.json    # Upstream source registry
SOURCES.md               # Attribution
references/              # Presets, motion, audit, marketing gate
scripts/sync-sources.mjs # Update checker
```

## Attribution

See [SOURCES.md](./SOURCES.md). This hybrid synthesizes rules from upstream projects; their licenses apply to original works.

## License

MIT — see [LICENSE](./LICENSE).
