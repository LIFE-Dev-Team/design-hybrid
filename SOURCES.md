# Design Hybrid — Source Attribution

Hybrid version **1.1.0**. **Taste Skill is the primary engine** (~70% of rules). Other sources are supplements layered on top.

## Primary (always load first)

| Source | Repo | Role |
|--------|------|------|
| **Taste Skill v2** | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | **Primary engine** — dials, brief inference, anti-slop, bento 2.0, motion, AI tells |
| Taste Skill v1 | same / `taste-skill-v1` | Bento paradigm, creative arsenal (fallback if v2 breaks workflow) |

**Hybrid copy:** `references/taste-skill-core.md` (sync from upstream v2)

## Supplements (mode-specific overlays)

| Source | Repo | Role |
|--------|------|------|
| GPT Taste | Leonxlnx/taste-skill | GSAP/AIDA `<design_plan>` when scroll storytelling requested |
| Soft Skill | Leonxlnx/taste-skill | Agency preset (variance engine, double-bezel) |
| Redesign Skill | Leonxlnx/taste-skill | Audit + fix priority for existing codebases |
| Minimalist Skill | Leonxlnx/taste-skill | Editorial preset (low dials) |
| Brutalist Skill | Leonxlnx/taste-skill | Industrial preset |
| Stitch Skill | Leonxlnx/taste-skill | Google Stitch export |
| Output Skill | Leonxlnx/taste-skill | Full output enforcement |
| Impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Product UI gates (PRODUCT mode) |
| UI/UX Pro Max | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Accessibility checklist |
| Websites Slop Gate | local + Obsidian vault | Marketing conversion (MARKETING mode) |
| Websites Quality Gate | local | Post-build Lighthouse/axe (optional) |

## Conflict resolution

1. Project `BRANDING.md` / `DESIGN.md`
2. **Taste Skill** (`taste-skill-core.md`)
3. Mode supplement (Impeccable, slop-gate, etc.)

## Refresh upstream skills

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
npx skills add pbakaus/impeccable
npx skills add nextlevelbuilder/ui-ux-pro-max-skill
```

## Refresh hybrid after upstream changes

```bash
node scripts/sync-sources.mjs --pull --write-lock
# Review _incoming/, merge into references/ + SKILL.md, bump hybridVersion
```
