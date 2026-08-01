# Localization and RTL Policy

## Supported Languages

```ts
export const supportedLanguages = ["en", "ar"] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]
```

- English: `en`, LTR
- Arabic: `ar`, RTL
- Fallback: English

## Active-Language Source of Truth

Language precedence:

1. Explicit locale route segment
2. Saved language cookie for the root redirect
3. Browser language for the root redirect
4. English fallback

After entering `/en` or `/ar`, the URL locale is authoritative.

Do not let a cookie or browser detector override an explicit route locale.

Use `i18n.resolvedLanguage`, normalized to `en` or `ar`, when reading the current i18next language.

## Three Content Categories

### Interface Copy — i18next

Use i18next for navigation labels, section labels, buttons, generic project statuses, language-switcher labels, form labels and validation, not-found messages, screen-reader labels, previous/next labels, and menu or dialog actions.

### Portfolio Content — `portfolio.data.ts`

Use localized fields for hero content, biography, services, skill explanations, experience descriptions, project title and narrative, availability statements, and project-specific image alternative text.

### Language-Neutral Data — stored once

Store name, email, URLs, slugs, dates, years, technology names, status enum values, icon identifiers, and image paths or dimensions once.

## Classification Test

Ask:

> Would this text remain the same kind of interface text if the portfolio owner and every project were replaced?

- Yes: i18next
- No: localized portfolio data

| Value | Source |
|---|---|
| `View project` | i18next |
| `Selected work` | i18next |
| `Event Operations Platform` | portfolio data |
| Project architecture explanation | portfolio data |
| `completed` enum | portfolio data |
| Rendered label `Completed` | i18next |
| Repository URL | portfolio data |
| `Open repository` | i18next |

## i18next Resources

```text
src/locales/
├── en/
│   ├── common.json
│   ├── site.json
│   └── contact.json
└── ar/
    ├── common.json
    ├── site.json
    └── contact.json
```

- `common`: shared actions, statuses, accessibility labels, generic errors
- `site`: navigation, section labels, header, footer, project navigation, route UI
- `contact`: contact form labels, placeholders, validation, feedback

Do not create a namespace per component. Do not put project narratives in translation JSON.

English and Arabic resources must have identical key structures.

## Localized Portfolio Type

```ts
export type LocalizedText = Readonly<Record<SupportedLanguage, string>>
```

Every localized field must include both languages. Do not use optional Arabic fields.

Resolve localized values at a selector or page boundary so leaf components receive normal strings.

## Route and Document Synchronization

The locale layout owns synchronization.

When locale changes:

1. Validate and normalize the route locale.
2. Call `i18n.changeLanguage(language)`.
3. Set `document.documentElement.lang`.
4. Set `document.documentElement.dir`.
5. Update the shadcn direction provider.
6. Allow translated content and fonts to settle.
7. Rebuild direction-sensitive GSAP timelines.
8. Call `ScrollTrigger.refresh()` when measurements changed.

Do not synchronize direction independently in feature pages.

## Language Switcher

Switching `/en/projects/example` to Arabic must produce `/ar/projects/example`.

Requirements:

- Preserve slug and query string.
- Use accessible language names.
- Do not use flag icons as the only label.
- Persist the language for future root redirects.
- Navigation works without hover.

## RTL Styling

Prefer logical CSS and Tailwind utilities: `start`, `end`, `ms`, `me`, `ps`, `pe`, `text-start`, and `text-end`.

Avoid physical left and right when the value represents reading direction.

Do not create duplicated Arabic layouts.

## Directional Icons

Mirror back/forward arrows, previous/next arrows, menu entrance direction, breadcrumb separators, and directional chevrons.

Do not mirror brand logos, GitHub, external-link icons, play/pause, checkmarks, or neutral decorative shapes.

## RTL Motion

Use:

```ts
const directionMultiplier = direction === "rtl" ? -1 : 1
```

Directional entrances and previous/next transitions respect direction. Vertical reveals, opacity, scale, pulses, and neutral ambient motion do not need mirroring.

Arabic text may change wrapping and section height. Never reuse stale ScrollTrigger measurements after a locale change.

## Typography

Use Inter Variable for English and Latin, and Noto Sans Arabic Variable for Arabic.

Do not force English letter spacing or line height onto Arabic. Review Arabic headings and paragraphs independently.

## Required Translation Workflow

Whenever adding visible text:

1. Classify ownership.
2. Add English and Arabic in the correct source.
3. Verify resource-key parity or localized-field completeness.
4. Check LTR and RTL layout.
5. Check directional icons.
6. Check direction-sensitive animation.
