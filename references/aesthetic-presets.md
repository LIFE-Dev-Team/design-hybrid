# Aesthetic Presets (Taste Skill variants)

These are **dial/palette overlays** on top of `taste-skill-core.md`. They never replace Taste anti-slop law.

Override default dials when the brief or brand clearly fits a preset.

## Default (Taste baseline)
- Dials: VARIANCE 8, MOTION 6, DENSITY 4
- Fonts: Geist, Satoshi, Cabinet Grotesk, Outfit
- Motion: `motion/react` for UI; GSAP only for scroll hijacks
- Surfaces: subtle borders, diffusion shadows, not generic card spam

## Soft Agency (`soft-skill`)
- Vibes: Ethereal Glass | Editorial Luxury | Soft Structuralism
- Layouts: Asymmetric Bento | Z-Axis Cascade | Editorial Split
- Signature: double-bezel nested cards, pill nav detached from top, button-in-button trailing icons
- Dials: VARIANCE 7-9, MOTION 6-8, DENSITY 3-4
- Motion: spring cubic-bezier `cubic-bezier(0.32,0.72,0,1)`, staggered menu reveals

## Minimalist Editorial (`minimalist-skill`)
- Canvas: `#FFFFFF` / `#F7F6F3`, borders `#EAEAEA`
- Serif heroes (Lyon, Newsreader, Playfair) + sans body
- Flat bento, 8-12px radius max, NO pill containers, NO heavy shadows
- Pastel tags only (pale red/blue/green/yellow at low saturation)
- Dials: VARIANCE 5-6, MOTION 3-4, DENSITY 2-3
- Motion: subtle fade-up only; no spectacle

## Industrial Brutalist (`brutalist-skill`)
- Pick ONE archetype: Swiss Industrial Print OR Tactical CRT Terminal
- Macro sans/black uppercase + micro mono telemetry
- Visible grid lines, primary red accent, optional scanline/grain
- Dials: VARIANCE 6-8, MOTION 4-6, DENSITY 7-9
- Avoid: consumer SaaS glass, rounded-[2.5rem] bento, purple gradients

## GSAP Marketing (`gpt-taste`)
- Mandatory `<design_plan>` before code with simulated RNG picks
- AIDA: Nav → Hero → Bento → GSAP Desire → Footer CTA
- Hero: H1 max 2-3 lines, ultra-wide container (`max-w-5xl`+)
- Bento: `grid-flow-dense`, zero empty cells, 3-5 intentional cards
- Dials: VARIANCE 8-10, MOTION 8-10, DENSITY 3-5
- Wrap page: `<main className="overflow-x-hidden w-full max-w-full">`

## Product App (Impeccable register)
- Dials: VARIANCE 3-5, MOTION 3-5, DENSITY 5-7
- OKLCH tokens, restrained accent ≤10%, tabular nums for data
- Prioritize accessibility, cognitive load, empty/loading/error states
- Do NOT force marketing scroll hijacks on dashboards
