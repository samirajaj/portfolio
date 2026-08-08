import { createPortal } from "react-dom"
import type { MutableRefObject, RefObject } from "react"

export type DigitalOrbRefs = {
  root: RefObject<HTMLDivElement | null>
  core: RefObject<HTMLSpanElement | null>
  captureLine: RefObject<HTMLSpanElement | null>
  fragments: MutableRefObject<(HTMLSpanElement | null)[]>
  trail: MutableRefObject<(HTMLSpanElement | null)[]>
}

type DigitalOrbProps = {
  elements: DigitalOrbRefs
}

export function DigitalOrb({ elements }: DigitalOrbProps) {
  if (typeof document === "undefined") return null

  const { root, core, captureLine, fragments, trail } = elements

  return createPortal(
    <>
      <span
        ref={captureLine}
        className="digital-orb-capture-line"
        aria-hidden="true"
      />
      <div
        ref={root}
        className="digital-orb"
        data-mode="pointer"
        data-moving="false"
        aria-hidden="true"
      >
        <span className="digital-orb-trail">
          {Array.from({ length: 4 }, (_, index) => (
            <span
              key={index}
              ref={(element) => {
                trail.current[index] = element
              }}
            />
          ))}
        </span>
        <span ref={core} className="digital-orb-core" />
        <span className="digital-orb-fragments">
          {Array.from({ length: 7 }, (_, index) => (
            <span
              key={index}
              ref={(element) => {
                fragments.current[index] = element
              }}
            />
          ))}
        </span>
      </div>
    </>,
    document.body
  )
}
