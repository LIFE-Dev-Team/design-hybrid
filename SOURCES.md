# Design Hybrid — Source Attribution

Hybrid version **1.0.0** (2026-07-03). Synthesized for local use; upstream licenses apply to original repos.

| Source | Repo / Location | Role in hybrid |
|--------|-----------------|----------------|
| Taste Skill v2 | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Dials, brief inference, anti-slop, motion guardrails |
| Taste Skill v1 | same repo / `taste-skill-v1` | Bento 2.0, creative arsenal (local install may be v1) |
| GPT Taste | same repo / `gpt-tasteskill` | GSAP, AIDA, design_plan, bento density |
| Soft Skill | same repo / `soft-skill` | Agency presets, double-bezel, variance engine |
| Redesign Skill | same repo / `redesign-skill` | Audit categories, fix priority |
| Minimalist Skill | same repo / `minimalist-skill` | Editorial monochrome preset |
| Brutalist Skill | same repo / `brutalist-skill` | Industrial preset |
| Stitch Skill | same repo / `stitch-skill` | Google Stitch compatibility |
| Output Skill | same repo / `output-skill` | Full output enforcement |
| Impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Product workflow, OKLCH, gates, register |
| UI/UX Pro Max | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Accessibility + UX priority matrix |
| Websites Slop Gate | local + Obsidian vault | Marketing/conversion frameworks |
| Websites Quality Gate | local | Post-build Lighthouse/axe (optional) |

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
