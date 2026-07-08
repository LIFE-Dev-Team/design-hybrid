---
name: design-hybrid-frontend
description: Taste Skill-first unified frontend design skill. Leonxlnx/taste-skill is the primary engine (dials, brief inference, anti-slop, bento, motion). Supplements with Impeccable (product gates), UI/UX Pro Max (a11y), redesign/soft/minimalist/brutalist presets, marketing slop-gate, and output enforcement. Use for any web UI design, landing page, redesign, or component work.
version: 1.1.0
---

# Design Hybrid — Taste Skill First

**Primary engine:** [Taste Skill](https://github.com/Leonxlnx/taste-skill) (`design-taste-frontend`)  
**Load first:** `references/taste-skill-core.md` — all non-trivial UI work starts here.

**Supplements (layer on top, never override Taste):**
- **gpt-taste** — GSAP/AIDA when scroll storytelling requested
- **soft / minimalist / brutalist** — aesthetic presets (`references/aesthetic-presets.md`)
- **redesign-skill** — audit protocol for existing codebases
- **impeccable** — product UI gates when `PRODUCT.md` exists
- **ui-ux-pro-max** — accessibility checklist
- **websites-slop-gate** — marketing conversion vault (customer-facing pages)
- **output-skill** — no truncated code

**Conflict rule:** `docs/BRANDING.md` / project design docs > **Taste Skill** > supplements.

---

## Execution order (always)

1. **Taste:** Design Read → set dials → apply `references/taste-skill-core.md`
2. **Mode overlay:** pick one mode below (adjusts dials/presets only)
3. **Supplements:** apply mode-specific gates
4. **Taste pre-flight** → supplement checks → ship

```text
HYBRID_PREFLIGHT: taste=pass mode=MARKETING|PRODUCT|REDESIGN|… mutation=open
```

---

## Mode router (overlay on Taste)

| Task | Mode | Taste adjustment |
|------|------|------------------|
| Marketing / landing / portfolio | **MARKETING** | Default dials; + slop-gate if customer-facing |
| Existing codebase upgrade | **REDESIGN** | Audit first; preserve or +2 variance/motion |
| SaaS dashboard / app shell | **PRODUCT** | Lower dials; + Impeccable if available |
| Calm editorial | **MINIMAL** | Preset overrides dials down |
| Luxury agency / cinematic | **AGENCY** | soft-skill preset; may raise MOTION |
| Raw tactical aesthetic | **BRUTAL** | brutalist preset |
| GSAP scroll storytelling | **GSAP** | gpt-taste `<design_plan>` + Taste motion rules |
| Google Stitch | **STITCH** | stitch-design-taste export rules |

Sibling taste-skill presets live in `references/aesthetic-presets.md`. They **modify dials and vocabulary**, not replace Taste anti-slop law.

---

## Supplement gates (after Taste core)

### All modes
- Check `package.json` before imports (Taste §2)
- **output-skill:** complete files, no `// ...` placeholders
- Project brand docs override generic fonts/colors

### PRODUCT (+ Impeccable)
- `node impeccable/scripts/load-context.mjs` when PRODUCT.md exists
- OKLCH tokens, cognitive load, register (brand vs product)
- Taste still governs layout anti-slop; Impeccable governs product craft gates

### MARKETING (+ slop-gate)
- Load `references/marketing-gate.md` for customer-facing pages
- Vault compliance block at end of deliverable

### REDESIGN (+ redesign-skill)
- Run `references/audit-checklist.md` before editing
- Fix priority: fonts → color → states → layout → components

### Accessibility (+ ui-ux-pro-max)
After Taste pre-flight, verify: 4.5:1 contrast, focus rings, 44px touch targets, form labels, reduced motion, skip link on marketing pages.

---

## GSAP mode (gpt-taste overlay)

When user requests Awwwards-level scroll or GSAP is in brief:

1. Complete Taste Design Read + dials
2. Output mandatory `<design_plan>` (RNG hero, components, GSAP picks, bento density proof)
3. Use canonical GSAP skeletons from `references/motion-patterns.md`
4. Taste performance rules still apply (cleanup, reduced motion, no scroll listeners in React state)

---

## Reference files

| Priority | File | When |
|----------|------|------|
| **1** | `references/taste-skill-core.md` | Every UI task |
| 2 | `references/aesthetic-presets.md` | Mode needs soft/minimal/brutal/GSAP preset |
| 2 | `references/motion-patterns.md` | MOTION > 4 or GSAP requested |
| 3 | `references/audit-checklist.md` | REDESIGN mode |
| 3 | `references/marketing-gate.md` | MARKETING mode |
| — | `SOURCES.md` | Attribution + upstream install |

Local upstream mirror: `../taste-skill/SKILL.md` (install v2: `npx skills add Leonxlnx/taste-skill --skill design-taste-frontend`).

---

## Final pre-flight

**Taste (mandatory — from taste-skill-core §8):** all boxes pass.

**Hybrid supplements:**
- [ ] Mode-appropriate gates applied
- [ ] Project BRANDING honored
- [ ] Output complete (output-skill)
- [ ] MARKETING: vault compliance block if customer-facing

---

## Keeping updated

```bash
node scripts/sync-sources.mjs --write-lock
node scripts/sync-sources.mjs --pull   # review _incoming/, merge into taste-skill-core.md first
```

When **taste-skill-v2** updates on GitHub, merge into `references/taste-skill-core.md` before other references. Bump `hybridVersion` in `sources.manifest.json`.

**Repo:** https://github.com/LIFE-Dev-Team/design-hybrid
