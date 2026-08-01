# Portfolio Repository Router

This repository is a multilingual React portfolio built with React 19, TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui, i18next, and GSAP.

Use `pnpm`.

## Verification Commands

Before declaring a meaningful implementation task complete, run:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Do not claim completion when a relevant command fails. There is currently no automated test command; do not invent one.

## Required Workflow

Before changing code:

1. Inspect the existing implementation.
2. Read the matching project policy under `docs/agent/`.
3. Read only the installed vendor skills relevant to the task.
4. Preserve established project decisions unless the task explicitly changes them.
5. Implement the smallest coherent slice that fully satisfies the request.
6. Verify English, Arabic, LTR, RTL, responsive, accessibility, and reduced-motion behavior whenever affected.

## Project Policy Router

| Task                                              | Required project policies                                                                  |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Initial setup or project-wide planning            | `docs/agent/implementation-plan.md`, `docs/agent/architecture.md`, `docs/agent/quality.md` |
| Routing, layouts, navigation, route loading       | `docs/agent/architecture.md`, `docs/agent/localization.md`                                 |
| English, Arabic, locale switching, RTL            | `docs/agent/localization.md`, `docs/agent/portfolio-content.md`                            |
| Biography, skills, projects, experience, services | `docs/agent/portfolio-content.md`, `docs/agent/localization.md`                            |
| Components, visual styling, responsive layout     | `docs/agent/design-system.md`, `docs/agent/quality.md`                                     |
| GSAP, parallax, timelines, SVG, ScrollTrigger     | `docs/agent/motion.md`, `docs/agent/quality.md`                                            |
| Accessibility, performance, final review          | `docs/agent/quality.md`                                                                    |

Read `docs/agent/README.md` when task ownership is unclear.

## Vendor Skill Router

Use the smallest relevant skill set.

- Routing: `react-router`
- shadcn/ui: `shadcn`
- Reusable component APIs: `vercel-composition-patterns`
- React rendering and bundle performance: `vercel-react-best-practices`
- UX and accessibility review: `web-design-guidelines`
- General GSAP: `gsap-core`
- React GSAP integration: `gsap-react`
- Scroll animation: `gsap-scrolltrigger`
- Sequenced animation: `gsap-timeline`
- Plugin behavior: `gsap-plugins`
- GSAP utilities: `gsap-utils`
- GSAP performance: `gsap-performance`
- Radix-to-Base migration: `migrate-radix-to-base` only when explicitly requested

For Vercel React guidance, apply browser-compatible React, JavaScript, rendering, and bundle rules. Ignore Next.js-specific and server-only guidance.

Do not edit installed vendor skills.

## Repository Invariants

- `src/content/portfolio.data.ts` is the source of portfolio-specific content.
- i18next resources are the source of reusable website interface copy.
- Language-neutral identifiers, URLs, dates, technology names, and media paths are stored once.
- Never hardcode visible user-facing copy inside components.
- Never create separate English and Arabic component trees.
- The locale route segment is the active-language source of truth after initial redirect.
- English and Arabic must be completed in the same change.
- RTL must use logical layout and direction-aware interaction.
- GSAP is the only JavaScript animation engine.
- Every significant animation requires reduced-motion and mobile behavior.
- Do not add global state or remote-data libraries for local portfolio content.
- Do not create a `shared` directory.
- Do not add, remove, or upgrade dependencies without a concrete requirement.

## Completion Response

The final response for implementation work must state:

- Changed files
- Main decisions
- Verification commands run and their results
- Any unresolved limitation or risk
