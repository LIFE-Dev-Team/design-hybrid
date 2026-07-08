---
name: design-hybrid-frontend
description: Unified frontend design skill merging Taste Skill, Impeccable, UI/UX Pro Max, redesign/soft/minimalist/brutalist presets, marketing slop-gate, and output enforcement. Routes by task type (marketing vs product vs redesign), runs pre-flight gates, applies dial-driven anti-slop rules, and ships complete production UI. Use for any web UI design, redesign, landing page, dashboard, or component work. Run sync-sources.mjs periodically to check upstream updates.
version: 1.0.0
---

# Design Hybrid — Unified Frontend Skill

Single entry point synthesizing: **taste-skill**, **gpt-taste**, **soft/minimalist/brutalist**, **redesign-skill**, **impeccable**, **ui-ux-pro-max**, **websites-slop-gate**, **output-skill**.

**Maintained via:** `node scripts/sync-sources.mjs --write-lock` from this skill directory (see §10).

---

## 0. Route the task (pick ONE primary mode)

| Task | Mode | Preset (see `references/aesthetic-presets.md`) |
|------|------|------------------------------------------------|
| New marketing / landing / portfolio | **MARKETING** | Default or GSAP if scroll storytelling requested |
| Existing codebase UI upgrade | **REDESIGN** | Match brief; use audit protocol |
| SaaS dashboard / app shell / forms | **PRODUCT** | Product App preset |
| Calm editorial / docs-style | **MINIMAL** | Minimalist Editorial |
| Luxury agency / cinematic marketing | **AGENCY** | Soft Agency |
| Raw data / tactical aesthetic | **BRUTAL** | Industrial Brutalist |
| Google Stitch export | **STITCH** | Default + stitch-design-taste rules |

If ambiguous, declare one-line **Design Read** then ask **one** clarifying question max.

**Design Read format:** *"Reading this as: [page kind] for [audience], with [aesthetic language], leaning toward [stack/preset]."*

---

## 1. Pre-flight gates (all modes)

State before editing files:

```text
HYBRID_PREFLIGHT: mode=MARKETING|PRODUCT|REDESIGN|… context=pass|n/a mutation=open
```

### Universal gates
- [ ] Read project context: `PRODUCT.md`, `DESIGN.md`, `docs/BRANDING.md`, or CLAUDE.md brand rules — **project brand overrides generic presets**
- [ ] Check `package.json` before any import; output install command if missing
- [ ] Tailwind version lock (v3 syntax ≠ v4); Next.js RSC: isolate interactivity in `"use client"` leaf components
- [ ] Apply **output-skill**: no `// ...`, no truncated files, no "let me know if you want more"
- [ ] No emojis in code, markup, or alt text

### PRODUCT mode extra (Impeccable)
- Load context: `node impeccable/scripts/load-context.mjs` when Impeccable is installed and PRODUCT.md exists
- If PRODUCT.md missing/placeholder: infer from project docs once; suggest `/impeccable teach` for long-term work
- Register: **brand** (marketing surface) vs **product** (app UI) — first match wins
- For greenfield craft: confirm shape brief before large implementations

### MARKETING mode extra
- Load vault frameworks per `references/marketing-gate.md`
- End deliverable with Vault compliance block when customer-facing

### REDESIGN mode extra
- Run audit from `references/audit-checklist.md` **before** editing
- Preserve mode: match existing dials; Overhaul: +2 variance/motion

---

## 2. Three dials + inference

Defaults: **`DESIGN_VARIANCE: 8`**, **`MOTION_INTENSITY: 6`**, **`VISUAL_DENSITY: 4`**.

Override from Design Read or preset table in `references/aesthetic-presets.md`.

| Signal | VARIANCE | MOTION | DENSITY |
|--------|----------|--------|---------|
| minimalist / calm / Linear | 5-6 | 3-4 | 2-3 |
| premium consumer / brand | 7-8 | 5-7 | 3-4 |
| Awwwards / agency / playful | 9-10 | 8-10 | 3-4 |
| trust-first / public-sector | 3-4 | 2-3 | 4-5 |
| dashboard / data app | 3-5 | 3-5 | 6-8 |
| redesign preserve | match | match+1 | match |

---

## 3. Unified anti-slop law (always enforce)

### Typography
- **Banned:** Inter, Roboto, Arial, Open Sans as defaults
- **Prefer:** Geist, Satoshi, Cabinet Grotesk, Outfit (+ project brand fonts)
- Display: tight tracking, controlled scale (hero ≤2 lines on marketing)
- Body: `leading-relaxed`, ~65ch max width
- Dashboards: sans only; serifs for editorial/marketing only

### Color
- No pure `#000` / `#fff`; use tinted neutrals
- **One accent** per page; saturation <80%
- **LILA BAN:** no AI purple/blue gradient aesthetic
- One gray family (warm OR cool, not both)
- Tint shadows to background hue

### Layout
- **Banned:** generic 3 equal feature cards, centered-everything when VARIANCE >4
- Use CSS Grid; no flex percentage math
- Full height: `min-h-[100dvh]` not `h-screen`
- Container: `max-w-7xl` or `max-w-[1400px] mx-auto`
- Mobile: asymmetric layouts collapse to single column `<768px`

### Content tells (marketing)
- No John Doe, 99.99%, Acme/Nexus/SmartFlow
- No Elevate, Seamless, Unleash, Next-Gen, Delve
- No em-dashes in marketing copy — use hyphen or restructure
- No SECTION 01 eyebrows, scroll cues, decorative status dots, fake div dashboards
- Placeholders: `https://picsum.photos/seed/{keyword}/WxH` — not broken Unsplash links

### Components
- shadcn/ui: never ship default theme — customize radii, colors, shadows
- Cards only when elevation communicates hierarchy; prefer borders/spacing at high density
- Full interaction cycle: loading (skeleton), empty, error, hover, active, focus

### Icons
- Phosphor, Radix, Tabler — standardize stroke width
- Discourage generic Lucide-as-only-choice; no hand-rolled SVG icons

---

## 4. Stack & architecture (Next.js default)

- Server Components default; `"use client"` only for motion/interaction leaves
- State: local `useState` unless deep prop-drill requires global
- Styling: Tailwind 90%; check v3 vs v4 config
- Motion library: `motion/react` default; GSAP for pin/scrub only (`references/motion-patterns.md`)
- Design systems: use official packages when brief maps to Fluent/Carbon/shadcn/etc. — do not hand-roll 90% overrides

---

## 5. Accessibility & UX (UI/UX Pro Max priorities)

Non-negotiable regardless of aesthetic:

1. **Contrast** — 4.5:1 body text; verify CTA contrast (no white-on-white)
2. **Focus** — visible focus rings on all interactive elements
3. **Touch** — 44×44px minimum targets
4. **Forms** — label above input; errors below; no `window.alert`
5. **Motion** — `prefers-reduced-motion` when MOTION >3
6. **Images** — meaningful alt text; WebP/lazy where applicable
7. **Keyboard** — skip-to-content on marketing pages; logical tab order

For palette/font lookups, consult local `ui-ux-pro-max` skill data when needed.

---

## 6. Mode-specific execution

### MARKETING
1. Vault gate (`references/marketing-gate.md`)
2. Optional `<design_plan>` if GSAP/AIDA preset selected
3. Section layout variety: ≥4 layout families across 8 sections
4. Hero discipline: headline ≤2 lines, subtext ≤20 words, CTAs above fold
5. Logo wall under hero with real SVG marks when "trusted by" is used

### PRODUCT
1. Impeccable shared laws: OKLCH, color strategy, cognitive load, empty states
2. Data density scales with VISUAL_DENSITY; monospace/tabular nums for metrics
3. No scroll hijacks unless explicitly requested for a marketing embed

### REDESIGN
1. Audit list → prioritized fixes (`references/audit-checklist.md`)
2. Work existing stack; no framework migration
3. Document what was preserved vs changed

### GSAP-heavy marketing (when requested)
- Follow gpt-taste `<design_plan>`: RNG hero, components, GSAP picks, bento density proof
- See `references/aesthetic-presets.md` → GSAP Marketing

---

## 7. Creative arsenal (when dials allow)

Use sparingly and match mode. Full pattern names from taste-skill: bento 2.0, magnetic buttons, sticky scroll stack, horizontal pan, kinetic type, glass with inner refraction border, staggered reveals.

**Do not** stack every effect on one page. Motion claimed must be motion shown, or lower MOTION dial.

---

## 8. Final pre-flight (before shipping)

- [ ] Design Read declared; preset + dials documented
- [ ] Project brand rules honored over generic presets
- [ ] Mobile collapse verified for high-variance layouts
- [ ] `min-h-[100dvh]` for full-viewport sections
- [ ] Loading, empty, error states present
- [ ] No banned tells (Inter, purple glow, 3-col cards, em-dashes, truncated code)
- [ ] GSAP/Motion cleanup in `useEffect` return functions
- [ ] MARKETING: Vault compliance block attached
- [ ] Output complete per output-skill

---

## 9. Reference files (load when needed)

| File | Use |
|------|-----|
| `references/aesthetic-presets.md` | Soft, minimal, brutal, GSAP, product presets |
| `references/motion-patterns.md` | Motion vs GSAP decision tree |
| `references/audit-checklist.md` | Redesign audits |
| `references/marketing-gate.md` | Obsidian vault frameworks |
| `SOURCES.md` | Upstream attribution + install commands |

Do not load all references for tiny tweaks — grep the relevant section.

---

## 10. Keeping this skill updated

```bash
# From this skill's directory:
node scripts/sync-sources.mjs
node scripts/sync-sources.mjs --write-lock
node scripts/sync-sources.mjs --pull --write-lock
```

When sync reports **UPDATE**:
1. Re-install changed upstream skills (`sources.manifest.json` → `install` field)
2. Diff `_incoming/` against `references/` and `SKILL.md`
3. Merge new rules into hybrid references; bump `hybridVersion`
4. Re-run `--write-lock`

**Upstream sources tracked:** Leonxlnx/taste-skill (full suite), pbakaus/impeccable, nextlevelbuilder/ui-ux-pro-max-skill, local websites-slop-gate + vault.

---

## 11. What this skill is NOT for

- Backend-only work
- Pure CI/deploy config
- Image-generation-only tasks (use imagegen-frontend-web / brandkit separately, then image-to-code)
- Replacing project-specific brand docs — **BRANDING.md wins**
