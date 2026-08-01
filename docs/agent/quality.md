# Quality and Completion Policy

## Required Commands

Before declaring meaningful implementation complete:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

There is currently no automated test command. Do not invent one.

If a command fails, report it, fix task-caused failures, and do not claim full completion.

## Manual Review Matrix

Review affected work in:

- English, LTR
- Arabic, RTL
- Language switch on homepage
- Language switch on project route
- Refresh and deep link
- 360px, 390px, 768px, 1024px, 1280px, 1440px
- System light theme
- System dark theme
- Reduced motion
- Keyboard navigation
- Pointer device
- Touch behavior
- Browser zoom

## Accessibility

Check semantic landmarks, heading order, keyboard reachability, visible focus, accessible names, labels and errors, image alternative text, decorative-media handling, hover independence, color-independent state, RTL reading order, and motion access.

Use `web-design-guidelines` for UI implementation or review.

## Localization Quality

Check that `html[lang]`, `html[dir]`, and shadcn direction match the route; resource keys match; localized portfolio fields include both languages; no visible string is hardcoded; Arabic font and wrapping are intentional; directional icons are correct; and GSAP refreshes after language changes.

## Performance

Check media dimensions and compression, appropriate lazy loading, no unnecessary packages, route lazy loading where useful, GSAP cleanup, stopped unused continuous animation, layout stability, no frame-by-frame React state, and the production bundle.

## Content Integrity

Check links, résumé, email, social links, project status, personal responsibility, metrics, client claims, public placeholders, and screenshot accuracy.

## Completion Response

Report changed files, behavior, decisions, commands and results, manual review, and remaining limitations.

Do not say “fully tested” when only static commands were run.
