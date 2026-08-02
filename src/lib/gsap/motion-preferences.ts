export const motionQueries = {
  reduced: "(prefers-reduced-motion: reduce)",
  full: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 64rem)",
  pointerFine: "(hover: hover) and (pointer: fine)",
} as const

export function prefersReducedMotion() {
  return window.matchMedia(motionQueries.reduced).matches
}
