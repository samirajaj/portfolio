# Application Architecture

## Technology Decisions

- React 19
- TypeScript with strict checking
- Vite
- React Router Data Mode
- Tailwind CSS
- shadcn/ui and Radix UI
- i18next
- GSAP
- Local TypeScript portfolio data

Do not introduce global state management or remote-data libraries without a real new requirement.

## Approved Source Structure

```text
src/
├── app/
│   ├── providers.tsx
│   └── router.tsx
├── assets/
├── components/
│   ├── common/
│   ├── motion/
│   ├── visual/
│   └── ui/
├── content/
├── features/
│   ├── home/
│   ├── projects/
│   └── not-found/
├── layouts/
├── lib/
│   ├── gsap/
│   └── i18n/
├── locales/
├── routes/
├── styles/
├── types/
└── main.tsx
```

Do not create a `shared` directory.

## Ownership

- `app`: application composition and router creation
- `components/ui`: generated or reusable shadcn primitives
- `components/common`: reusable application-level UI
- `components/motion`: reusable motion components with multiple real consumers
- `components/visual`: reusable custom illustrations and technical visuals
- `content`: portfolio data contracts, data, and selectors
- `features`: feature-owned pages, components, hooks, and utilities
- `layouts`: route and site layout composition
- `lib`: cross-cutting integrations and pure infrastructure
- `locales`: i18next interface resources
- `routes`: loaders, redirects, route validation, and route helpers
- `styles`: global tokens, typography, utilities, and motion CSS

## Routing

Use React Router Data Mode with `createBrowserRouter`.

Approved route shape:

```text
/
└── redirects to preferred locale

/:locale
├── index
├── projects/:slug
└── *
```

Requirements:

- Root locale redirect uses saved preference, then browser language, then English.
- After redirect, the URL locale is authoritative.
- Invalid locale parameters produce a redirect or route error.
- Substantial route modules should be lazy-loaded.
- Deep linking and browser refresh must work.
- Route definitions contain routing concerns, not large UI implementations.
- Locale switching preserves the rest of the current path.
- Use a route-level not-found state.

## Data Flow

`portfolio.data.ts` is a local module, not a remote resource.

Do not fetch it, wrap it in promises, cache it with TanStack Query, store it in Zustand, or duplicate it in component state.

Flow:

```text
portfolio.data.ts
→ selectors resolve language and derive views
→ page/feature composition
→ typed component props
```

Only page-level feature composition and content selectors should import raw portfolio data. Leaf components receive props.

## Components

- Use function components and hooks.
- Keep rendering pure.
- Use effects only for external synchronization.
- Keep state close to its owner.
- Prefer composition over boolean-heavy component APIs.
- Avoid premature memoization.
- Do not create an abstraction for one use unless it represents a stable project concept.
- Preserve generated shadcn primitives; prefer consumer composition over modifying them.
- Use React 19 ref-as-prop for new custom components where appropriate.
- Do not refactor stable generated components solely to remove `forwardRef`.

## Imports

- Prefer direct imports.
- Avoid broad barrel files that obscure dependencies or weaken tree shaking.
- Use the configured `@/` alias for source imports.
- Feature code must not import internal files from unrelated features.
- Cross-feature concepts move to an appropriate common or library location only when genuinely shared.

## Dependency Changes

Before adding a package:

1. Confirm the platform, CSS, shadcn, React Router, i18next, or GSAP cannot solve the requirement cleanly.
2. Explain the concrete requirement.
3. Check bundle and maintenance impact.
4. Avoid overlapping libraries.

GSAP is the sole JavaScript animation engine.
