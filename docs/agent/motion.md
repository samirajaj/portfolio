# GSAP Motion Policy

## Engine Decision

GSAP is the only JavaScript animation engine.

Use CSS for simple hover, focus, color, border, and basic transitions. Use GSAP for coordinated timelines, SVG paths, scroll choreography, pinning, and parallax.

Do not add Motion, Framer Motion, Rive, Three.js, Lenis, or another animation system without an explicit approved requirement.

## Relevant Skills

Select only what the task needs: `gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins`, `gsap-utils`, and `gsap-performance`.

## Registration

Create one stable module-level registration file:

```text
src/lib/gsap/gsap.ts
```

Register required plugins once. Do not register plugins during render or repeatedly inside components.

## React Integration

Use `@gsap/react` and `useGSAP`.

- Scope selectors to an owning component ref.
- Clean up timelines and ScrollTriggers on unmount.
- Use `contextSafe` for later event-handler animation when required.
- Do not use broad document selectors.
- Avoid React state for frame-by-frame animation values.

## Motion Tokens

Keep standard values in `src/lib/gsap/motion-tokens.ts`.

Define durations, easings, reveal distance, parallax ranges, pointer-depth limits, and stagger intervals.

Components must not invent unrelated timings without a reason.

## Motion Hierarchy

Use three levels:

1. Ambient motion
2. Scroll-linked motion
3. Interaction feedback

Alternate high-impact moments with calm reading areas. Do not animate every section equally.

## Hero Concept

The hero visual explains:

```text
Interface → React → API → Authentication → Application logic → Database → Response
```

Recommended implementation:

- SVG or layered DOM technical diagram
- GSAP entrance timeline
- MotionPath request packet
- Small status indicators
- Pointer-responsive depth on pointer devices
- Controlled scroll-linked depth
- Static or simplified reduced-motion state

The headline and calls to action must be immediately usable.

## Selected Work Scroll Story

Desktop:

- Sticky visual stage
- ScrollTrigger determines active project or state
- Stable visual plateaus
- Controlled opacity, translation, scale, and architecture-state changes
- Native scrolling remains intact

Mobile:

- Do not pin long storytelling sections
- Render normal stacked content
- Use short entrance transitions only

## ScrollTrigger

Use only for genuinely scroll-driven behavior.

- Prefer transforms and opacity.
- Keep scrub ranges controlled.
- Avoid continuously animating layout-heavy properties.
- Recalculate after image load, font change, or locale change.
- Kill and rebuild direction-sensitive triggers after switching language.
- Call `ScrollTrigger.refresh()` after translated layout settles.
- Do not create a scroll trap.

## MotionPath

Use MotionPath for meaningful technical flow, such as a request packet moving through the system. Do not use it for arbitrary decoration.

## RTL

```ts
const directionMultiplier = direction === "rtl" ? -1 : 1
```

Mirror semantic inline movement, previous/next navigation, mobile panel entrance, and reading-flow diagrams where appropriate.

Do not mirror neutral vertical, opacity, scale, pulse, or ambient effects. Do not assume positive X always means forward.

## Reduced Motion

Every significant animation requires a reduced-motion design.

Reduced-motion mode must preserve content, navigation, and project state; avoid confusing pinning; replace path travel with a static state or short opacity change; disable pointer parallax; and avoid continuous ambient loops.

Reduced motion is not an empty page and not merely zero duration.

## Performance

- Animate transform and opacity where possible.
- Do not let CSS and GSAP control the same property.
- Avoid React state updates per frame.
- Pause or kill continuous work outside the relevant viewport.
- Avoid excessive blur and large animated filters.
- Do not apply `will-change` globally.
- Test lower-powered devices and smaller screens.
- Lazy-load expensive noncritical visuals.
- Review ScrollTrigger count and cleanup.

## Acceptance Questions

1. What hierarchy, feedback, continuity, or explanation does this provide?
2. Is content understandable without it?
3. Does it work in Arabic and RTL?
4. Does it have a mobile fallback?
5. Does it respect reduced motion?
6. Does it avoid CSS conflicts?
7. Does cleanup succeed on route changes and unmount?
