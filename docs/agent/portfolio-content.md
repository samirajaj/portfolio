# Portfolio Content Policy

## Source of Truth

The canonical portfolio content file is:

```text
src/content/portfolio.data.ts
```

Supporting files:

```text
src/content/
├── localized-content.ts
├── portfolio.data.ts
├── portfolio.selectors.ts
└── portfolio.types.ts
```

Do not use a generic name such as `file.ts`.

## Content Contract

The top-level model should cover identity, hero, social links, services, skill groups, experience, projects, contact details, and SEO metadata.

Use `satisfies PortfolioData` for type checking while preserving useful literal types.

## Localization

```ts
export type LocalizedText = Readonly<{
  en: string
  ar: string
}>
```

Portfolio-specific prose uses `LocalizedText`. Language-neutral values remain single values.

## Recommended Project Model

```ts
export type ProjectStatus = "completed" | "in-progress" | "concept"

export type PortfolioImage = {
  src: string
  width: number
  height: number
  alt: LocalizedText
}

export type PortfolioProject = {
  slug: string
  status: ProjectStatus
  featured: boolean
  year: number
  title: LocalizedText
  summary: LocalizedText
  problem: LocalizedText
  solution: LocalizedText
  role: LocalizedText
  technologies: string[]
  capabilities: string[]
  decisions: LocalizedText[]
  challenges: LocalizedText[]
  outcomes: LocalizedText[]
  images: PortfolioImage[]
  links: {
    live?: string
    repository?: string
  }
}
```

Adapt the model only when actual content requires it.

## Selectors

Selectors own featured-project selection, slug lookup, localized-field resolution, derived navigation, and ordered content views.

Suggested functions:

```ts
getFeaturedProjects()
getProjectBySlug(slug)
getLocalizedProject(project, language)
getLocalizedPortfolio(language)
```

Selectors must not duplicate content.

## Component Boundary

Raw data should be imported only at composition or selector boundaries.

Preferred:

```tsx
<ProjectCard project={localizedProject} />
```

Avoid leaf components importing global portfolio data. Leaf components should not know about `LocalizedText` unless they are localization infrastructure.

## Content Integrity

Never invent clients, users, revenue, performance improvements, or paid-client status. Never hide that a project is incomplete or claim sole ownership of team work.

Use honest statuses: `completed`, `in-progress`, and `concept`.

Describe responsibility precisely: built, designed, implemented, contributed, led, or collaborated.

## Case-Study Requirements

A full case study should include context, user or business problem, scope, role, interface work, architecture, decisions, trade-offs, challenges, outcome, and current status.

When measurable results do not exist, report delivered capabilities and lessons rather than manufactured metrics.

## Images

Every image requires a stable path, width, height, correct localized alternative text, appropriate format, and clear ownership or permission.

Use empty alternative text only for genuinely decorative media.

## Technology Names

Keep standard technology names language-neutral unless an established localized name is required.

Examples: React, TypeScript, ASP.NET Core, SQL Server, GSAP.
