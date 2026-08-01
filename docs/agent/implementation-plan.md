# Portfolio Implementation Plan

Follow this sequence unless the user explicitly changes the priority.

Do not begin complex animation before the static layout, content model, localization, and responsive behavior are stable.

## Phase 1 — Clean Initial Setup

Establish:

- React Router Data Mode
- Application providers
- Locale-aware routing
- i18next initialization
- English and Arabic resources
- HTML `lang` and `dir` synchronization
- shadcn direction synchronization
- GSAP plugin registration module
- Global design tokens and typography
- Initial feature-based folders

Remove starter assets and starter demo code only after their replacements exist.

Acceptance:

- `/` redirects to a supported locale
- `/en` renders LTR English
- `/ar` renders RTL Arabic
- `pnpm typecheck`, `pnpm lint`, and `pnpm build` pass

## Phase 2 — Portfolio Data Contract

Create:

```text
src/content/
├── portfolio.data.ts
├── portfolio.types.ts
├── portfolio.selectors.ts
└── localized-content.ts
```

Model identity, hero content, social links, services, skill groups, experience, projects, contact details, and SEO metadata.

Separate:

- Interface copy in i18next
- Portfolio-specific content in localized data fields
- Language-neutral values stored once

Acceptance:

- TypeScript rejects missing English or Arabic content
- Components do not hardcode portfolio text
- Leaf components receive resolved strings through typed props

## Phase 3 — Static Application Shell

Build:

- Locale layout
- Site layout
- Header
- Desktop navigation
- Mobile navigation
- Language switcher
- Footer
- Shared section container
- Not-found page
- Project route shell

No complex animation.

Acceptance:

- Keyboard navigation works
- Route refresh and deep links work
- Language switching preserves the current route
- No horizontal overflow at 360px

## Phase 4 — Static Homepage

Build in this order:

1. Hero
2. Credibility strip
3. Selected work
4. Capability-based skills
5. Engineering approach
6. About
7. Contact
8. Footer completion

The page must look professional without JavaScript animation.

Acceptance:

- English and Arabic layouts are intentional
- Dark and light system themes work
- Content remains readable at browser zoom
- No essential information depends on hover

## Phase 5 — Project Case Studies

Build reusable project pages with overview, role and scope, problem, solution, interface gallery, architecture explanation, engineering decisions, challenges, outcomes, and project navigation.

Incomplete projects must be marked honestly.

Acceptance:

- Direct project URLs work in both locales
- Missing project slugs show a useful not-found state
- Project content is not duplicated inside components

## Phase 6 — Motion Foundation

Create:

```text
src/lib/gsap/
├── gsap.ts
├── motion-tokens.ts
├── motion-preferences.ts
└── direction-motion.ts
```

Implement central GSAP registration, `useGSAP` component scoping, reduced-motion detection, direction-aware horizontal motion, and standard durations, easing, and distances.

Acceptance:

- No duplicate plugin registration
- No stale ScrollTriggers after unmount
- Reduced-motion mode preserves all content

## Phase 7 — Hero Motion

Implement a full-stack request-flow visual:

```text
Interface → React → API → Authentication → Application → Database → Response
```

Order:

1. Static SVG/DOM technical diagram
2. Hero entrance timeline
3. MotionPath request packet
4. Ambient status activity
5. Pointer depth
6. Scroll-linked depth
7. Arabic direction review
8. Reduced-motion fallback

Do not block access to the hero text.

## Phase 8 — Selected Work Scroll Story

Desktop:

- Sticky visual stage
- Scroll-driven active project state
- Stable visual plateaus
- Interface, architecture, and engineering-decision states
- Controlled cross-fades and parallax

Mobile:

- Normal stacked content
- No pinned scroll trap
- Short entrance transitions only

Acceptance:

- Native scrolling remains intact
- Project content remains understandable without animation
- Language changes rebuild direction-sensitive ScrollTriggers

## Phase 9 — Interaction Polish

Add only purposeful interaction:

- Header state transition
- Button arrow movement
- Project-card depth
- Cursor spotlight on pointer devices
- Direction-aware arrows
- Small technical demonstrations

Do not add custom cursor replacement, scroll hijacking, continuous large text animation, a forced loading screen, or another JavaScript animation library.

## Phase 10 — Final Quality Review

Review English, Arabic, LTR, RTL, system light theme, system dark theme, reduced motion, keyboard navigation, 360px, 390px, 768px, 1024px, 1280px, 1440px, media compression, route lazy loading, GSAP cleanup, production bundle, links, résumé, and project claims.

Run:

```bash
pnpm typecheck
pnpm lint
pnpm build
```
