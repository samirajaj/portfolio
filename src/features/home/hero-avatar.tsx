import { useRef } from "react"

import type { LocalizedPortfolioData } from "@/content/portfolio.types"
import { gsap, useGSAP } from "@/lib/gsap/gsap"
import { motionTokens } from "@/lib/gsap/motion-tokens"

type HeroAvatarProps = {
  avatar: LocalizedPortfolioData["personal"]["avatar"]
}

export function HeroAvatar({ avatar }: HeroAvatarProps) {
  const stage = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLDivElement>(null)
  const hitArea = useRef<HTMLDivElement>(null)
  const floatingPortrait = useRef<HTMLDivElement>(null)
  const portraitDepth = useRef<HTMLDivElement>(null)
  const shadowResponse = useRef<HTMLSpanElement>(null)
  const shadow = useRef<HTMLSpanElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const stageElement = stage.current
      const fieldElement = field.current
      const hitAreaElement = hitArea.current
      const floatElement = floatingPortrait.current
      const depthElement = portraitDepth.current
      const shadowResponseElement = shadowResponse.current
      const shadowElement = shadow.current

      if (
        !stageElement ||
        !fieldElement ||
        !hitAreaElement ||
        !floatElement ||
        !depthElement ||
        !shadowResponseElement ||
        !shadowElement ||
        !contextSafe
      ) {
        return
      }

      const media = gsap.matchMedia()

      media.add(
        {
          motionAllowed: "(prefers-reduced-motion: no-preference)",
          finePointer: "(hover: hover) and (pointer: fine)",
          desktop: "(min-width: 48rem)",
        },
        (mediaContext) => {
          const { motionAllowed, finePointer, desktop } =
            mediaContext.conditions as {
              motionAllowed: boolean
              finePointer: boolean
              desktop: boolean
            }

          gsap.set(stageElement, { autoAlpha: 1 })
          if (!motionAllowed) return

          const floatScale = desktop ? 1 : 0.72
          const floatDistance = motionTokens.avatar.floatDistance * floatScale
          const driftDistance = motionTokens.avatar.driftDistance * floatScale

          gsap.set(floatElement, {
            x: -driftDistance * 0.45,
            y: floatDistance * 0.3,
            rotation: -0.28,
          })
          gsap.set(shadowElement, {
            x: -driftDistance * 0.2,
            scaleX: 0.92,
            scaleY: 1.05,
            autoAlpha: 0.68,
          })

          const floatTimeline = gsap
            .timeline({
              repeat: -1,
              defaults: {
                duration: motionTokens.avatar.floatSegmentDuration,
                ease: "sine.inOut",
              },
            })
            .to(floatElement, {
              x: driftDistance,
              y: -floatDistance,
              rotation: 0.48,
            })
            .to(floatElement, {
              x: -driftDistance * 0.45,
              y: floatDistance * 0.3,
              rotation: -0.28,
              duration: motionTokens.avatar.floatSegmentDuration * 1.08,
            })

          const shadowTimeline = gsap
            .timeline({
              repeat: -1,
              defaults: {
                duration: motionTokens.avatar.floatSegmentDuration,
                ease: "sine.inOut",
              },
            })
            .to(shadowElement, {
              x: driftDistance * 0.45,
              scaleX: 1.25,
              scaleY: 0.78,
              autoAlpha: 0.34,
            })
            .to(shadowElement, {
              x: -driftDistance * 0.2,
              scaleX: 0.92,
              scaleY: 1.05,
              autoAlpha: 0.68,
              duration: motionTokens.avatar.floatSegmentDuration * 1.08,
            })

          if (!finePointer) {
            return () => {
              floatTimeline.kill()
              shadowTimeline.kill()
            }
          }

          const depthXTo = gsap.quickTo(depthElement, "x", {
            duration: 0.58,
            ease: "power3.out",
          })
          const depthYTo = gsap.quickTo(depthElement, "y", {
            duration: 0.58,
            ease: "power3.out",
          })
          const rotationTo = gsap.quickTo(depthElement, "rotation", {
            duration: 0.68,
            ease: "power3.out",
          })
          const fieldXTo = gsap.quickTo(fieldElement, "x", {
            duration: 0.82,
            ease: "power2.out",
          })
          const fieldYTo = gsap.quickTo(fieldElement, "y", {
            duration: 0.82,
            ease: "power2.out",
          })
          const shadowXTo = gsap.quickTo(shadowResponseElement, "x", {
            duration: 0.68,
            ease: "power2.out",
          })
          const pointerInfluence = { x: 0, y: 0 }
          let impulseTimeline: gsap.core.Timeline | null = null
          let isImpulsing = false

          const updatePointerInfluence = (event: PointerEvent) => {
            const bounds = hitAreaElement.getBoundingClientRect()
            pointerInfluence.x = gsap.utils.clamp(
              -1,
              1,
              (event.clientX - (bounds.left + bounds.width / 2)) /
                (bounds.width / 2)
            )
            pointerInfluence.y = gsap.utils.clamp(
              -1,
              1,
              (event.clientY - (bounds.top + bounds.height / 2)) /
                (bounds.height / 2)
            )
          }

          const applyPointerInfluence = () => {
            const { x, y } = pointerInfluence
            depthXTo(x * -motionTokens.avatar.depthDistance)
            depthYTo(y * -motionTokens.avatar.depthDistance * 0.78)
            rotationTo(x * motionTokens.avatar.depthRotation)
            fieldXTo(x * 1.75)
            fieldYTo(y * 1.25)
            shadowXTo(x * -3)
          }

          const onPointerEnter = contextSafe((event: PointerEvent) => {
            updatePointerInfluence(event)
            const bounds = hitAreaElement.getBoundingClientRect()
            const deltaX = bounds.left + bounds.width / 2 - event.clientX
            const deltaY = bounds.top + bounds.height / 2 - event.clientY
            const magnitude = Math.hypot(deltaX, deltaY) || 1
            const directionX = deltaX / magnitude
            const directionY = deltaY / magnitude

            isImpulsing = true
            impulseTimeline?.kill()
            impulseTimeline = gsap
              .timeline({
                onComplete: () => {
                  isImpulsing = false
                  applyPointerInfluence()
                },
              })
              .to(
                depthElement,
                {
                  x: directionX * motionTokens.avatar.impulseDistance,
                  y: directionY * motionTokens.avatar.impulseDistance * 0.68,
                  rotation: directionX * motionTokens.avatar.impulseRotation,
                  scaleX: 0.995,
                  scaleY: 1.005,
                  duration: motionTokens.avatar.fluidPushDuration,
                  ease: "sine.out",
                  overwrite: "auto",
                },
                0
              )
              .to(
                shadowResponseElement,
                {
                  x: directionX * 3,
                  scaleX: 0.95,
                  duration: motionTokens.avatar.fluidPushDuration,
                  ease: "sine.out",
                  overwrite: "auto",
                },
                0
              )
              .to(depthElement, {
                x: () =>
                  pointerInfluence.x * -motionTokens.avatar.depthDistance,
                y: () =>
                  pointerInfluence.y *
                  -motionTokens.avatar.depthDistance *
                  0.78,
                rotation: () =>
                  pointerInfluence.x * motionTokens.avatar.depthRotation,
                scaleX: 1,
                scaleY: 1,
                duration: motionTokens.avatar.fluidSettleDuration,
                ease: "power2.out",
              })
              .to(
                shadowResponseElement,
                {
                  x: () => pointerInfluence.x * -3,
                  scaleX: 1,
                  duration: motionTokens.avatar.fluidSettleDuration,
                  ease: "power2.out",
                },
                "<"
              )
          })

          const onPointerMove = (event: PointerEvent) => {
            updatePointerInfluence(event)
            if (!isImpulsing) applyPointerInfluence()
          }

          const onPointerLeave = () => {
            impulseTimeline?.kill()
            isImpulsing = false
            pointerInfluence.x = 0
            pointerInfluence.y = 0
            depthXTo(0)
            depthYTo(0)
            rotationTo(0)
            fieldXTo(0)
            fieldYTo(0)
            shadowXTo(0)
            gsap.to([depthElement, shadowResponseElement], {
              scaleX: 1,
              scaleY: 1,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            })
          }

          hitAreaElement.addEventListener("pointerenter", onPointerEnter)
          hitAreaElement.addEventListener("pointermove", onPointerMove, {
            passive: true,
          })
          hitAreaElement.addEventListener("pointerleave", onPointerLeave)

          return () => {
            hitAreaElement.removeEventListener("pointerenter", onPointerEnter)
            hitAreaElement.removeEventListener("pointermove", onPointerMove)
            hitAreaElement.removeEventListener("pointerleave", onPointerLeave)
            impulseTimeline?.kill()
            floatTimeline.kill()
            shadowTimeline.kill()
          }
        }
      )

      return () => media.revert()
    },
    { scope: stage }
  )

  return (
    <div ref={stage} className="hero-avatar-stage">
      <div ref={field} className="avatar-technical-field" aria-hidden="true" />
      <span
        ref={shadowResponse}
        className="avatar-shadow-response"
        aria-hidden="true"
      >
        <span ref={shadow} className="avatar-shadow" />
      </span>
      <div ref={hitArea} className="avatar-hit-area">
        <div ref={floatingPortrait} className="avatar-float">
          <div ref={portraitDepth} className="avatar-depth">
            <div className="avatar-image-shell">
              <img
                src={avatar.src}
                alt={avatar.alt}
                width={avatar.width}
                height={avatar.height}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
