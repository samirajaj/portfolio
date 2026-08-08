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
  const nodesLayer = useRef<HTMLDivElement>(null)
  const hitArea = useRef<HTMLDivElement>(null)
  const floatingPortrait = useRef<HTMLDivElement>(null)
  const portraitDepth = useRef<HTMLDivElement>(null)
  const shadowResponse = useRef<HTMLSpanElement>(null)
  const shadow = useRef<HTMLSpanElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const stageElement = stage.current
      const fieldElement = field.current
      const nodesElement = nodesLayer.current
      const hitAreaElement = hitArea.current
      const floatElement = floatingPortrait.current
      const depthElement = portraitDepth.current
      const shadowResponseElement = shadowResponse.current
      const shadowElement = shadow.current

      if (
        !stageElement ||
        !fieldElement ||
        !nodesElement ||
        !hitAreaElement ||
        !floatElement ||
        !depthElement ||
        !shadowResponseElement ||
        !shadowElement ||
        !contextSafe
      ) {
        return
      }

      const nodes = gsap.utils.toArray<HTMLElement>(
        "[data-avatar-node]",
        stageElement
      )
      const media = gsap.matchMedia()

      media.add(
        {
          motionAllowed: "(prefers-reduced-motion: no-preference)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (mediaContext) => {
          const { motionAllowed, finePointer } = mediaContext.conditions as {
            motionAllowed: boolean
            finePointer: boolean
          }

          gsap.set(stageElement, { autoAlpha: 1 })
          if (!motionAllowed) return

          const floatTween = gsap.to(floatElement, {
            y: -motionTokens.avatar.floatDistance,
            duration: motionTokens.avatar.floatDuration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
          const shadowTween = gsap.to(shadowElement, {
            scaleX: 1.12,
            scaleY: 0.9,
            autoAlpha: 0.46,
            duration: motionTokens.avatar.floatDuration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
          const nodeTweens = nodes.map((node, index) =>
            gsap.to(node, {
              x: index % 2 === 0 ? 4 + index : -3 - index * 0.5,
              y: index % 3 === 0 ? -5 : 3 + index * 0.35,
              autoAlpha: index === 4 ? 0.34 : 0.76,
              duration: 3.4 + index * 0.47,
              delay: index * -0.38,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            })
          )

          if (!finePointer) {
            return () => {
              floatTween.kill()
              shadowTween.kill()
              nodeTweens.forEach((tween) => tween.kill())
            }
          }

          const depthXTo = gsap.quickTo(depthElement, "x", {
            duration: 0.55,
            ease: "power3.out",
          })
          const depthYTo = gsap.quickTo(depthElement, "y", {
            duration: 0.55,
            ease: "power3.out",
          })
          const rotationTo = gsap.quickTo(depthElement, "rotation", {
            duration: 0.65,
            ease: "power3.out",
          })
          const fieldXTo = gsap.quickTo(fieldElement, "x", {
            duration: 0.8,
            ease: "power2.out",
          })
          const fieldYTo = gsap.quickTo(fieldElement, "y", {
            duration: 0.8,
            ease: "power2.out",
          })
          const nodesXTo = gsap.quickTo(nodesElement, "x", {
            duration: 0.72,
            ease: "power2.out",
          })
          const nodesYTo = gsap.quickTo(nodesElement, "y", {
            duration: 0.72,
            ease: "power2.out",
          })
          let impulseTimeline: gsap.core.Timeline | null = null
          let isImpulsing = false

          const onPointerEnter = contextSafe((event: PointerEvent) => {
            const bounds = hitAreaElement.getBoundingClientRect()
            const deltaX = bounds.left + bounds.width / 2 - event.clientX
            const deltaY = bounds.top + bounds.height / 2 - event.clientY
            const magnitude = Math.hypot(deltaX, deltaY) || 1
            const directionX = deltaX / magnitude
            const directionY = deltaY / magnitude
            isImpulsing = true
            impulseTimeline?.kill()
            impulseTimeline = gsap
              .timeline({ onComplete: () => (isImpulsing = false) })
              .to(
                depthElement,
                {
                  x: directionX * motionTokens.avatar.impulseDistance,
                  y: directionY * motionTokens.avatar.impulseDistance * 0.72,
                  rotation: directionX * motionTokens.avatar.impulseRotation,
                  scaleX: 0.99,
                  scaleY: 1.01,
                  duration: 0.16,
                  ease: "power2.out",
                  overwrite: "auto",
                },
                0
              )
              .to(
                shadowResponseElement,
                {
                  x: directionX * 3,
                  scaleX: 0.94,
                  duration: 0.16,
                  ease: "power2.out",
                  overwrite: "auto",
                },
                0
              )
              .to(depthElement, {
                x: directionX * -2,
                y: directionY * -1.4,
                rotation: directionX * -0.22,
                scaleX: 1,
                scaleY: 1,
                duration: 0.34,
                ease: "power2.out",
              })
              .to(
                shadowResponseElement,
                { x: 0, scaleX: 1, duration: 0.42, ease: "power2.out" },
                "<"
              )
              .to(depthElement, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.42,
                ease: "sine.out",
              })
          })

          const onPointerMove = (event: PointerEvent) => {
            if (isImpulsing) return
            const bounds = hitAreaElement.getBoundingClientRect()
            const x = gsap.utils.clamp(
              -1,
              1,
              (event.clientX - (bounds.left + bounds.width / 2)) /
                (bounds.width / 2)
            )
            const y = gsap.utils.clamp(
              -1,
              1,
              (event.clientY - (bounds.top + bounds.height / 2)) /
                (bounds.height / 2)
            )

            depthXTo(x * motionTokens.avatar.depthDistance)
            depthYTo(y * motionTokens.avatar.depthDistance * 0.65)
            rotationTo(x * motionTokens.avatar.depthRotation)
            fieldXTo(x * -1.5)
            fieldYTo(y * -1.5)
            nodesXTo(x * 4)
            nodesYTo(y * 3)
          }

          const onPointerLeave = () => {
            impulseTimeline?.kill()
            isImpulsing = false
            depthXTo(0)
            depthYTo(0)
            rotationTo(0)
            gsap.to(shadowResponseElement, {
              x: 0,
              scaleX: 1,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            })
            fieldXTo(0)
            fieldYTo(0)
            nodesXTo(0)
            nodesYTo(0)
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
            floatTween.kill()
            shadowTween.kill()
            nodeTweens.forEach((tween) => tween.kill())
          }
        }
      )

      return () => media.revert()
    },
    { scope: stage }
  )

  return (
    <div ref={stage} className="hero-avatar-stage">
      <div ref={field} className="avatar-technical-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div ref={nodesLayer} className="avatar-nodes" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} data-avatar-node data-node={index + 1} />
        ))}
      </div>
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
            <span className="avatar-orbit-guide" aria-hidden="true" />
            <div className="avatar-image-shell">
              <img
                src={avatar.src}
                alt={avatar.alt}
                width={avatar.width}
                height={avatar.height}
                fetchPriority="high"
              />
            </div>
            <span className="avatar-foreground-pixel" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}
