# Taste Skill Core (Primary Engine)

**Authority:** This file is the **primary design law** for design-hybrid. When rules conflict, Taste Skill wins unless `docs/BRANDING.md`, `DESIGN.md`, or explicit user direction overrides.

**Upstream:** [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (`design-taste-frontend`). Re-sync via `node scripts/sync-sources.mjs --pull`.

---

## Philosophy

Most LLM UI is bad because the model jumps to defaults instead of reading the brief. Taste Skill fixes that with:

1. **Design Read** before code
2. **Three dials** driving layout, motion, density
3. **Bias correction** against statistical AI clichés
4. **Full interaction cycles** (loading, empty, error, hover, active)
5. **Performance guardrails** (transform/opacity only, RSC-safe motion)

Default baseline: **`DESIGN_VARIANCE: 8`**, **`MOTION_INTENSITY: 6`**, **`VISUAL_DENSITY: 4`**.

---

## 0. Brief inference (mandatory)

Read before touching code:

1. **Page kind** — landing, portfolio, redesign, editorial, dashboard
2. **Vibe words** — minimalist, Awwwards, brutalist, Linear-style, Apple-y, etc.
3. **Reference signals** — URLs, screenshots, named products
4. **Audience** — B2B buyer vs design-conscious consumer vs recruiter
5. **Existing brand assets** — logo, colors, type, photography
6. **Quiet constraints** — a11y-first, public-sector, regulated, trust-first

**Output one Design Read:**
*"Reading this as: [page kind] for [audience], with [aesthetic language], leaning toward [stack]."*

Ask **one** clarifying question only when the read genuinely diverges. Otherwise declare and proceed.

**Anti-default discipline:** Do not default to purple gradients, centered dark hero, three equal feature cards, generic glass everywhere, Inter + slate-900, infinite micro-animations on every card.

---

## 1. Three dials

| Signal | VARIANCE | MOTION | DENSITY |
|--------|----------|--------|---------|
| minimalist / calm / Linear | 5-6 | 3-4 | 2-3 |
| premium consumer / brand | 7-8 | 5-7 | 3-4 |
| Awwwards / agency / playful | 9-10 | 8-10 | 3-4 |
| landing / portfolio (default) | 7-9 | 6-8 | 3-5 |
| trust-first / public-sector | 3-4 | 2-3 | 4-5 |
| dashboard / data (when allowed) | 3-5 | 3-5 | 6-8 |
| redesign preserve | match | match+1 | match |
| redesign overhaul | +2 | +2 | match |

### Dial behavior

**DESIGN_VARIANCE**
- 1-3: symmetrical grids, centered layouts OK
- 4-7: offset overlaps, mixed aspect ratios
- 8-10: masonry, fractional grid, massive whitespace zones
- **Mobile:** asymmetric layouts collapse to single column `<768px`

**MOTION_INTENSITY**
- 1-3: hover/active only
- 4-7: CSS transitions, `whileInView` stagger
- 8-10: GSAP pin/scrub, choreographed scroll
- **Rule:** motion claimed must be motion shown, or lower the dial

**VISUAL_DENSITY**
- 1-3: gallery spacing, huge section gaps
- 4-7: standard app spacing
- 8-10: cockpit mode — borders/dividers not cards; `font-mono` for numbers

---

## 2. Stack defaults (Taste architecture)

- **Framework:** Next.js / React, RSC default
- **Interactivity:** `"use client"` leaf components only for motion/pointer physics
- **Styling:** Tailwind v4 default; v3 if project requires — check `package.json`
- **Motion:** `motion/react` for UI; GSAP only for pin/scrub (isolated, cleanup in `useEffect`)
- **State:** local `useState`; never `useState` for mouse/scroll/magnetic — use `useMotionValue`
- **Icons:** Phosphor → HugeIcons → Radix → Tabler; one family per project; standardize stroke width
- **Dependency verification:** check `package.json` before any import; print install command if missing
- **Viewport:** `min-h-[100dvh]` not `h-screen`
- **Layout:** CSS Grid not flex percentage math; `max-w-7xl` or `max-w-[1400px] mx-auto`
- **No emojis** in code, markup, or alt text

---

## 3. Design engineering (bias correction)

### Typography
- Display: `text-4xl md:text-6xl tracking-tighter leading-none`
- Body: `text-base leading-relaxed max-w-[65ch]`
- Discourage Inter as default; prefer Geist, Satoshi, Cabinet Grotesk, Outfit
- **Dashboards:** sans only. Serifs only when brief is editorial/luxury AND justified
- Italic display words with descenders (`y g j p q`): `leading-[1.1]` min + `pb-1` reserve

### Color
- One accent, saturation <80%, one gray family (warm OR cool)
- **LILA BAN:** no default AI purple/blue glow aesthetic
- Tint shadows to background hue; no pure `#000` / `#fff`
- **Color consistency lock:** accent does not change mid-page

### Layout
- **ANTI-CENTER BIAS** when VARIANCE > 4: split screen, asymmetric whitespace
- **NO 3 equal feature cards** — use zig-zag, bento, horizontal scroll, masonry
- **Hero discipline:** headline ≤2 lines desktop; subtext ≤20 words; CTAs above fold; max 4 text elements in hero stack
- **Nav:** single line desktop; height ≤80px
- **Bento cell count:** N items = N cells; no empty tiles
- **Section variety:** ≥4 layout families across 8 sections; max 2 consecutive image+text zigzags
- **Eyebrow restraint:** max 1 eyebrow per 3 sections

### Materiality
- Cards only when elevation communicates hierarchy
- At DENSITY > 7: no generic card boxes — use `border-t`, `divide-y`, space
- **Liquid glass:** `backdrop-blur` + `border-white/10` + inner highlight shadow
- **Shape consistency lock:** one radius system per page

### Interaction states (mandatory)
- Skeleton loaders matching layout shape
- Composed empty states
- Inline form errors
- `:active` → `scale-[0.98]` or `-translate-y-[1px]`
- **Button contrast:** WCAG AA; no white-on-white CTAs
- Forms: label above, error below, `gap-2`

### Content tells
- No John Doe, 99.99%, Acme/Nexus/SmartFlow
- No Elevate, Seamless, Unleash, Next-Gen, Delve
- No em-dashes in marketing copy
- No SECTION 01 eyebrows, scroll cues, fake div dashboards
- Placeholders: `https://picsum.photos/seed/{keyword}/WxH`
- shadcn/ui: never ship default theme

---

## 4. Creative proactivity (when dials allow)

Apply when MOTION > 5 or brief calls for premium/agency feel:

- **Magnetic buttons** — `useMotionValue` / `useTransform`, never `useState`
- **Perpetual micro-interactions** — pulse, typewriter, float, shimmer (memoized leaf components)
- **Spring physics** — `type: "spring", stiffness: 100, damping: 20`
- **Layout transitions** — Motion `layout` / `layoutId`
- **Staggered reveals** — parent + children in same client tree
- **Never mix** GSAP and Motion in the same component tree

---

## 5. Bento 2.0 paradigm (feature sections)

When building SaaS feature grids:

- Background `#f9fafb`; cards white + `border-slate-200/50`
- Surfaces `rounded-[2.5rem]` + diffusion shadow
- Labels **outside and below** cards (gallery style)
- Generous `p-8` / `p-10` inside cards
- Each card: one perpetual micro-interaction when MOTION > 5

**5 archetypes:** Intelligent List, Command Input, Live Status, Wide Data Stream, Contextual Focus UI.

---

## 6. Creative arsenal (pick 1-2, not all)

Asymmetric hero (not centered-over-dark-image), bento grid, sticky scroll stack, horizontal pan, kinetic marquee (max one per page), magnetic button, glass panel with refraction, parallax tilt card, text mask reveal, mesh gradient background.

Full pattern vocabulary in upstream taste-skill §8. GSAP/Three.js for isolated scroll/canvas only.

---

## 7. Performance guardrails

- Animate `transform` and `opacity` only
- Grain/noise on fixed `pointer-events-none` layers
- `backdrop-blur` on sticky/fixed chrome only
- Z-index only for nav, modal, overlay
- Strict `useEffect` cleanup for GSAP/Motion
- `prefers-reduced-motion` when MOTION > 3

---

## 8. Taste pre-flight (runs before hybrid supplements)

- [ ] Design Read declared; dials documented
- [ ] No Inter/purple-glow/3-col-cards/em-dash tells
- [ ] `min-h-[100dvh]` for full-viewport sections
- [ ] Mobile collapse for high-variance layouts
- [ ] Loading, empty, error states present
- [ ] Motion isolated in client leaf components
- [ ] Cards omitted where spacing suffices
- [ ] Hero fits viewport; CTAs visible without scroll

**If any box fails, fix before applying supplement skills (Impeccable, slop-gate, etc.).**
