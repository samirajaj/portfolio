import { useId, useRef } from "react"

import { getDirectionMultiplier } from "@/lib/gsap/direction-motion"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/gsap"
import { motionQueries } from "@/lib/gsap/motion-preferences"
import { motionTokens } from "@/lib/gsap/motion-tokens"

type SystemFlowLabels = {
  request: string
  response: string
  interface: string
  react: string
  api: string
  auth: string
  logic: string
  database: string
  verified: string
}

type SystemTraceVisualProps = {
  direction: "ltr" | "rtl"
  label: string
  description: string
  flow: SystemFlowLabels
}

const logicalNodes = [
  { key: "interface", x: 116, y: 122 },
  { key: "react", x: 276, y: 210 },
  { key: "api", x: 456, y: 120 },
  { key: "auth", x: 614, y: 218 },
  { key: "logic", x: 748, y: 120 },
  { key: "database", x: 844, y: 220 },
] as const

function mapX(x: number, direction: "ltr" | "rtl") {
  return direction === "rtl" ? 960 - x : x
}

function buildPath(direction: "ltr" | "rtl") {
  const points = logicalNodes.map((node) => ({
    x: mapX(node.x, direction),
    y: node.y,
  }))

  return `M ${points[0].x} ${points[0].y} C ${points[0].x + 60 * getDirectionMultiplier(direction)} ${points[0].y}, ${points[1].x - 60 * getDirectionMultiplier(direction)} ${points[1].y}, ${points[1].x} ${points[1].y} S ${points[2].x - 54 * getDirectionMultiplier(direction)} ${points[2].y}, ${points[2].x} ${points[2].y} S ${points[3].x - 48 * getDirectionMultiplier(direction)} ${points[3].y}, ${points[3].x} ${points[3].y} S ${points[4].x - 42 * getDirectionMultiplier(direction)} ${points[4].y}, ${points[4].x} ${points[4].y} S ${points[5].x - 36 * getDirectionMultiplier(direction)} ${points[5].y}, ${points[5].x} ${points[5].y}`
}

function buildResponsePath(direction: "ltr" | "rtl") {
  const start = logicalNodes.at(-1)!
  const end = logicalNodes[0]
  const startX = mapX(start.x, direction)
  const endX = mapX(end.x, direction)
  const multiplier = getDirectionMultiplier(direction)

  return `M ${startX} ${start.y + 30} C ${startX - 150 * multiplier} 380, ${endX + 170 * multiplier} 390, ${endX} ${end.y + 30}`
}

export function SystemTraceVisual({
  direction,
  label,
  description,
  flow,
}: SystemTraceVisualProps) {
  const rootRef = useRef<HTMLElement>(null)
  const requestPathRef = useRef<SVGPathElement>(null)
  const responsePathRef = useRef<SVGPathElement>(null)
  const requestPacketRef = useRef<SVGGElement>(null)
  const responsePacketRef = useRef<SVGGElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const requestPath = buildPath(direction)
  const responsePath = buildResponsePath(direction)

  useGSAP(
    () => {
      const root = rootRef.current
      const requestPathElement = requestPathRef.current
      const responsePathElement = responsePathRef.current
      const requestPacket = requestPacketRef.current
      const responsePacket = responsePacketRef.current

      if (
        !root ||
        !requestPathElement ||
        !responsePathElement ||
        !requestPacket ||
        !responsePacket
      ) {
        return
      }

      const media = gsap.matchMedia()

      media.add(
        {
          reduceMotion: motionQueries.reduced,
          fullMotion: motionQueries.full,
          isDesktop: motionQueries.desktop,
          pointerFine: motionQueries.pointerFine,
        },
        (context) => {
          const { reduceMotion, fullMotion, isDesktop, pointerFine } =
            context.conditions as Record<string, boolean>
          const nodes = gsap.utils.toArray<HTMLElement>("[data-system-node]")
          const requestLine = gsap.utils.toArray<SVGPathElement>(
            "[data-request-line]"
          )
          const responseLine = gsap.utils.toArray<SVGPathElement>(
            "[data-response-line]"
          )

          if (reduceMotion) {
            gsap.set(nodes, { autoAlpha: 1, y: 0 })
            gsap.set([...requestLine, ...responseLine], {
              strokeDashoffset: 0,
            })
            gsap.set([requestPacket, responsePacket], { autoAlpha: 0 })
            return
          }

          const entrance = gsap.timeline({
            defaults: {
              duration: motionTokens.duration.base,
              ease: motionTokens.ease.enter,
            },
          })

          entrance
            .from("[data-system-grid]", { autoAlpha: 0, duration: 0.5 })
            .from(
              [...requestLine, ...responseLine],
              { strokeDashoffset: 1, duration: motionTokens.duration.system },
              0.08
            )
            .from(
              nodes,
              {
                autoAlpha: 0,
                y: motionTokens.distance.small,
                stagger: motionTokens.stagger.tight,
              },
              0.18
            )

          if (fullMotion) {
            gsap.set(requestPacket, { autoAlpha: 1 })
            gsap.set(responsePacket, { autoAlpha: 0 })

            const activity = gsap.timeline({
              paused: true,
              repeat: -1,
              repeatDelay: 1.1,
            })

            activity
              .set(requestPacket, { autoAlpha: 1 })
              .to(requestPacket, {
                duration: 3,
                ease: "none",
                motionPath: {
                  path: requestPathElement,
                  align: requestPathElement,
                  alignOrigin: [0.5, 0.5],
                },
              })
              .to(
                nodes.at(-1)!,
                {
                  scale: 1.06,
                  duration: 0.18,
                  repeat: 1,
                  yoyo: true,
                },
                "-=0.2"
              )
              .set(requestPacket, { autoAlpha: 0 })
              .set(responsePacket, { autoAlpha: 1 })
              .to(responsePacket, {
                duration: 2.1,
                ease: "none",
                motionPath: {
                  path: responsePathElement,
                  align: responsePathElement,
                  alignOrigin: [0.5, 0.5],
                },
              })
              .to(
                nodes[0],
                {
                  scale: 1.06,
                  duration: 0.18,
                  repeat: 1,
                  yoyo: true,
                },
                "-=0.18"
              )
              .set(responsePacket, { autoAlpha: 0 })

            const visibilityTrigger = ScrollTrigger.create({
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              onEnter: () => activity.play(),
              onEnterBack: () => activity.play(),
              onLeave: () => activity.pause(),
              onLeaveBack: () => activity.pause(),
            })

            if (visibilityTrigger.isActive) {
              activity.play()
            }
          }

          if (fullMotion && isDesktop) {
            gsap.to("[data-system-foreground]", {
              yPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            })
          }

          if (fullMotion && isDesktop && pointerFine) {
            const middleX = gsap.quickTo("[data-system-middle]", "x", {
              duration: 0.55,
              ease: motionTokens.ease.enter,
            })
            const middleY = gsap.quickTo("[data-system-middle]", "y", {
              duration: 0.55,
              ease: motionTokens.ease.enter,
            })
            const foregroundX = gsap.quickTo("[data-system-foreground]", "x", {
              duration: 0.45,
              ease: motionTokens.ease.enter,
            })
            const foregroundY = gsap.quickTo("[data-system-foreground]", "y", {
              duration: 0.45,
              ease: motionTokens.ease.enter,
            })
            const foregroundRotation = gsap.quickTo(
              "[data-system-foreground]",
              "rotation",
              {
                duration: 0.6,
                ease: motionTokens.ease.enter,
              }
            )

            const handlePointerMove = (event: PointerEvent) => {
              const rect = root.getBoundingClientRect()
              const normalizedX = (event.clientX - rect.left) / rect.width - 0.5
              const normalizedY = (event.clientY - rect.top) / rect.height - 0.5

              middleX(normalizedX * motionTokens.distance.pointer * 0.45)
              middleY(normalizedY * motionTokens.distance.pointer * 0.45)
              foregroundX(normalizedX * motionTokens.distance.pointer)
              foregroundY(normalizedY * motionTokens.distance.pointer)
              foregroundRotation(
                normalizedX *
                  motionTokens.pointerRotation *
                  getDirectionMultiplier(direction)
              )
            }

            const handlePointerLeave = () => {
              middleX(0)
              middleY(0)
              foregroundX(0)
              foregroundY(0)
              foregroundRotation(0)
            }

            root.addEventListener("pointermove", handlePointerMove, {
              passive: true,
            })
            root.addEventListener("pointerleave", handlePointerLeave, {
              passive: true,
            })

            return () => {
              root.removeEventListener("pointermove", handlePointerMove)
              root.removeEventListener("pointerleave", handlePointerLeave)
            }
          }
        }
      )

      return () => media.revert()
    },
    { scope: rootRef, dependencies: [direction], revertOnUpdate: true }
  )

  return (
    <figure
      ref={rootRef}
      className="system-stage"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div
        data-system-grid
        className="technical-grid absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 top-0 z-10 flex h-12 items-center justify-between border-b border-border bg-card/80 px-4"
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-signal" />
          <span className="size-1.5 rounded-full bg-border" />
          <span className="size-1.5 rounded-full bg-response" />
        </div>
        <span className="font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground rtl:tracking-normal">
          {flow.request} / {flow.response}
        </span>
        <span className="font-mono text-[0.62rem] text-response" translate="no">
          200 OK
        </span>
      </div>

      <div
        data-system-middle
        className="absolute inset-0 pt-12"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 960 430"
          className="absolute inset-0 size-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            data-request-line
            d={requestPath}
            pathLength="1"
            fill="none"
            stroke="var(--signal)"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeDasharray="0.018 0.018"
          />
          <path
            ref={requestPathRef}
            d={requestPath}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />
          <path
            data-response-line
            d={responsePath}
            pathLength="1"
            fill="none"
            stroke="var(--response)"
            strokeOpacity="0.66"
            strokeWidth="2"
            strokeDasharray="0.018 0.018"
          />
          <path
            ref={responsePathRef}
            d={responsePath}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />
          <g ref={requestPacketRef} className="request-packet">
            <circle r="7" fill="var(--signal)" />
            <circle r="13" fill="none" stroke="var(--signal)" opacity="0.28" />
          </g>
          <g ref={responsePacketRef} className="request-packet">
            <circle r="7" fill="var(--response)" />
            <circle
              r="13"
              fill="none"
              stroke="var(--response)"
              opacity="0.28"
            />
          </g>
        </svg>
      </div>

      <div
        data-system-foreground
        className="absolute inset-0 pt-12 will-change-transform"
        aria-hidden="true"
      >
        {logicalNodes.map((node) => {
          const x = mapX(node.x, direction)

          return (
            <div
              key={node.key}
              className="absolute -translate-x-1/2"
              style={{
                left: `${(x / 960) * 100}%`,
                top: `calc(${(node.y / 430) * 100}% + 1.5rem)`,
              }}
            >
              <div data-system-node className="system-node">
                {flow[node.key]}
              </div>
            </div>
          )
        })}

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 border-t border-border pt-3 font-mono text-[0.62rem] text-muted-foreground sm:inset-x-6">
          <span>{flow.interface}</span>
          <span className="text-response">{flow.verified}</span>
        </div>
      </div>

      <figcaption className="sr-only">
        <strong id={titleId}>{label}.</strong>{" "}
        <span id={descriptionId}>{description}</span>
      </figcaption>
    </figure>
  )
}
