import { createPortal } from "react-dom"
import type { MutableRefObject, RefObject } from "react"

export type DigitalOrbRefs = {
  root: RefObject<HTMLDivElement | null>
  core: RefObject<HTMLSpanElement | null>
  captureLine: RefObject<HTMLSpanElement | null>
  trailCanvas: RefObject<HTMLCanvasElement | null>
  fragments: MutableRefObject<(HTMLSpanElement | null)[]>
}

type DigitalOrbProps = {
  elements: DigitalOrbRefs
}

export function DigitalOrb({ elements }: DigitalOrbProps) {
  if (typeof document === "undefined") return null

  const { root, core, captureLine, trailCanvas, fragments } = elements

  return createPortal(
    <>
      <span
        ref={captureLine}
        className="digital-orb-capture-line"
        aria-hidden="true"
      />
      <canvas
        ref={trailCanvas}
        className="digital-orb-pixel-trail"
        aria-hidden="true"
      />
      <div
        ref={root}
        className="digital-orb"
        data-mode="pointer"
        data-moving="false"
        data-interactive="false"
        aria-hidden="true"
      >
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
