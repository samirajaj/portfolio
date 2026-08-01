# Visual Design System

## Direction

The portfolio is a creative technical studio experience for recruiters and clients.

It must communicate strong interface craft, full-stack capability, engineering judgment, technical depth, and professional restraint.

The design must not become a generic dashboard or an effects showcase.

## Visual Principles

- Strong grid and section framing
- Editorial typography
- Technical diagrams and product visuals
- Neutral surfaces with controlled accents
- Purposeful asymmetry
- Clear hierarchy
- Calm reading areas between high-impact moments
- Motion supports the design; it does not replace it

## Theme

Use automatic system theme through `prefers-color-scheme`.

Version 1 does not require a manual switcher. Both themes must be intentional.

## Palette

Use design tokens, not raw feature-level colors.

Suggested light tokens:

```css
--background: #f6f7fb;
--surface: #ffffff;
--surface-elevated: #eef0f6;
--foreground: #11131a;
--foreground-muted: #667085;
--border: #dde1ea;
--accent-primary: #6657e8;
--accent-secondary: #078c96;
```

Suggested dark tokens:

```css
--background: #080a0f;
--surface: #10131a;
--surface-elevated: #171b25;
--foreground: #f5f7fa;
--foreground-muted: #a0a8b8;
--border: #272d39;
--accent-primary: #8c7dff;
--accent-secondary: #31c6cd;
```

Use one signature gradient. Do not apply gradients to every card or section.

## Typography

- English and Latin: Inter Variable
- Arabic: Noto Sans Arabic Variable
- Optional technical metadata font may be added later only when required

Rules:

- Sans-serif for readable content
- Monospace only for metadata, labels, code, and diagrams
- No long paragraphs in monospace
- No forced Latin tracking on Arabic
- Arabic needs independent line-height and wrapping review
- Use `clamp()` for large headings

## Layout

Target content width: 1200px–1280px.

Grid:

- Desktop: 12 columns
- Tablet: 8 columns
- Mobile: 4 columns

Review at 360px, 390px, 768px, 1024px, 1280px, and 1440px.

Use logical spacing so the same component works in LTR and RTL. Avoid fixed heights for text-bearing sections.

## Surfaces and Shape

Use thin technical borders, moderate radii, minimal shadows, subtle layered surfaces, controlled glow, and technical grid details sparingly.

Avoid heavy glassmorphism, neon borders everywhere, excessive pills, generic gradient cards, logo clouds, skill percentages, and repeated equal-weight card grids.

## shadcn/ui

Prefer shadcn primitives for buttons, sheets, tooltips, dialogs, badges, separators, and form controls.

Custom-build the hero, project presentation, technical diagrams, architecture visual, skill composition, case-study gallery, and motion stage.

Do not allow the site to look like a default shadcn dashboard. Do not modify generated primitives when consumer composition is sufficient.

## Responsive Behavior

- Hero becomes a clear single-column composition on mobile.
- Important content never depends on hover.
- Sticky scroll stories become normal stacked content.
- Technical diagrams reflow or simplify.
- Navigation uses an accessible mobile sheet.
- Touch targets remain usable.
- Arabic expansion must not overflow.

## Accessibility

Use semantic HTML before ARIA, preserve heading hierarchy, keep visible focus states, avoid color-only state, label icon-only controls, maintain contrast, support browser zoom, and keep decorative visuals out of the accessibility tree.

## Forbidden Patterns

Do not add custom cursor replacement, scroll hijacking, autoplay hero video, matrix rain, floating technology logos, fake terminal typing as the main identity, purposeless particles, or decorative motion that delays content.
