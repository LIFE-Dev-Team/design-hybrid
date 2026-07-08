# Motion Decision Tree

## Library choice
| Need | Library | Notes |
|------|---------|-------|
| Hover, layout, micro-interactions, bento loops | `motion/react` | Default. Legacy `framer-motion` OK if already installed |
| Pin + scrub scroll stacks, horizontal pan galleries | GSAP + ScrollTrigger | Isolated client components; strict cleanup |
| Full-page scrolltelling / WebGL backgrounds | GSAP or Three.js | Never mix with Motion in same component tree |

## Forbidden
- `window.addEventListener('scroll')` for animations
- React `useState` for continuous cursor/magnetic tracking (use `useMotionValue`)
- Animating `top`, `left`, `width`, `height` (use `transform` + `opacity`)
- `requestAnimationFrame` loops touching React state

## Reduced motion
When `MOTION_INTENSITY > 3`, honor `prefers-reduced-motion` via `useReducedMotion()` or CSS media query.

## GSAP skeletons (canonical)

**Sticky stack:** parent pins; each card's transform driven by NEXT card's ScrollTrigger; `scrub: true`.

**Horizontal pan:** pin container; `end: "+=" + scrollDistance`; translate inner track on scrub.

## Motion intensity map
| Level | Behavior |
|-------|----------|
| 1-3 | Hover/active only |
| 4-7 | CSS transitions + `whileInView` stagger |
| 8-10 | GSAP pin/scrub or choreographed scroll reveals |

## Performance
- Grain/noise on fixed `pointer-events-none` layers only
- `backdrop-blur` on sticky/fixed chrome only, not scrolling content
- Perpetual loops in memoized leaf client components
- Magnetic buttons: Framer Motion motion values, not state
