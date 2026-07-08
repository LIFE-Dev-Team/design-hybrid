# Redesign & Audit Protocol

Merged from `redesign-skill`, Taste v2 §11, and Impeccable audit patterns.

## Mode detection
1. **Greenfield** — new page/component; full preset + dial freedom
2. **Preserve** — match existing brand; dials match current UI (+1 motion max)
3. **Overhaul** — re-skin; dials +2 variance/motion; keep URLs, nav labels, form field names, legal copy

## Scan sequence
1. Read stack (`package.json`, Tailwind version, existing fonts/colors)
2. Identify register: **brand** (marketing) vs **product** (app/dashboard)
3. Run audit categories below; list findings before editing
4. Apply fix priority order

## Fix priority (highest impact first)
1. Font swap
2. Color palette cleanup (one accent, no AI purple)
3. Hover / active / focus states
4. Layout + spacing (`max-w-*`, grid not flex-math, `min-h-[100dvh]`)
5. Replace generic components (3-col features, card spam)
6. Loading, empty, error states
7. Typography scale polish

## Audit categories (check all)
- **Typography:** Inter/Roboto banned; display tracking; 65ch body; tabular nums for data
- **Color:** no `#000`/`#fff` pure; one gray family; saturation <80%
- **Layout:** no symmetrical 3-card row; container max-width; mobile collapse for asymmetric layouts
- **States:** skeleton loaders, empty states, inline errors, active nav indicator
- **Content:** no John Doe, 99.99%, Acme, Elevate/Seamless/Unleash, em-dashes (marketing copy)
- **Code:** semantic HTML, no div soup, imports exist in package.json, alt text, meta/OG tags
- **Strategic omissions:** 404, skip link, form validation, legal footer links where needed

## Never change silently on redesign
- URL structure, nav labels, form field names, brand wordmark, legal/compliance copy

## Work rules
- Do not migrate frameworks
- Small reviewable diffs
- Test after each change batch
