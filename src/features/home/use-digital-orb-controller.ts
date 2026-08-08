import { useRef, type MutableRefObject, type RefObject } from "react"

import type { DigitalOrbRefs } from "@/components/motion/digital-orb/digital-orb"
import { gsap, MotionPathPlugin, ScrollTrigger, useGSAP } from "@/lib/gsap/gsap"
import { motionTokens } from "@/lib/gsap/motion-tokens"
import {
  createProjectCheckpoints,
  type JourneyPoint,
  type ProjectCheckpoint,
} from "@/features/home/project-journey-utils"

type OrbMode =
  | "pointer"
  | "capturing"
  | "project-path"
  | "project-checkpoint"
  | "releasing"
  | "burst"
  | "respawning"

type UseDigitalOrbControllerOptions = {
  scope: RefObject<HTMLElement | null>
  journey: RefObject<HTMLDivElement | null>
  path: RefObject<SVGPathElement | null>
  progressPath: RefObject<SVGPathElement | null>
  anchors: MutableRefObject<(HTMLSpanElement | null)[]>
  cards: MutableRefObject<(HTMLElement | null)[]>
  projectIds: readonly string[]
  pathData: string
  locale: "en" | "ar"
}

type MotionPoint = { x: number; y: number; angle?: number }
type PixelTrailCell = {
  x: number
  y: number
  bornAt: number
  lifetime: number
  size: number
  breakupAt: number
  driftX: number
  driftY: number
  flickerPhase: number
}

const maxTrailPixels = 1200

function seededUnit(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function setCardPhase(
  card: HTMLElement,
  phase: "upcoming" | "entering" | "active" | "completed",
  visited: boolean
) {
  if (card.dataset.phase !== phase) card.dataset.phase = phase
  const nextVisited = String(visited)
  if (card.dataset.visited !== nextVisited) card.dataset.visited = nextVisited
}

function updateProjectStates(
  progress: number,
  checkpoints: readonly ProjectCheckpoint[],
  cards: readonly (HTMLElement | null)[]
) {
  let activeCheckpoint = false

  checkpoints.forEach((checkpoint) => {
    const card = cards[checkpoint.index]
    if (!card) return

    if (progress < checkpoint.enterStart) {
      setCardPhase(card, "upcoming", false)
    } else if (progress < checkpoint.plateauStart) {
      setCardPhase(card, "entering", progress >= checkpoint.pathProgress)
    } else if (progress <= checkpoint.plateauEnd) {
      setCardPhase(card, "active", true)
      activeCheckpoint = true
    } else {
      setCardPhase(card, "completed", true)
    }
  })

  return activeCheckpoint
}

export function useDigitalOrbController({
  scope,
  journey,
  path,
  progressPath,
  anchors,
  cards,
  projectIds,
  pathData,
  locale,
}: UseDigitalOrbControllerOptions): DigitalOrbRefs {
  const root = useRef<HTMLDivElement>(null)
  const core = useRef<HTMLSpanElement>(null)
  const captureLine = useRef<HTMLSpanElement>(null)
  const trailCanvas = useRef<HTMLCanvasElement>(null)
  const fragments = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    (_, contextSafe) => {
      const orb = root.current
      const orbCore = core.current
      const line = captureLine.current
      const canvas = trailCanvas.current
      const journeyElement = journey.current
      const route = path.current
      const travelledRoute = progressPath.current
      const fragmentElements = fragments.current.filter(
        (fragment): fragment is HTMLSpanElement => fragment !== null
      )

      if (
        !orb ||
        !orbCore ||
        !line ||
        !canvas ||
        !journeyElement ||
        !route ||
        !travelledRoute ||
        !pathData ||
        !contextSafe
      ) {
        return
      }

      const trailContext = canvas.getContext("2d")
      if (!trailContext) return

      const pointerCapable = window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
      )
      const enhancedJourney = window.matchMedia("(min-width: 64rem)").matches
      const routeLength = route.getTotalLength()

      if (!pointerCapable.matches) {
        gsap.set(orb, { autoAlpha: 0 })
        gsap.set(travelledRoute, {
          strokeDasharray: routeLength,
          strokeDashoffset: 0,
        })
        cards.current.forEach((card) => {
          if (card) setCardPhase(card, "completed", true)
        })
        return
      }

      let mode: OrbMode = "pointer"
      let normalizedProgress = 0
      let previousProgress = 0
      let pathMatrix: DOMMatrix | null = null
      let captureTimeline: gsap.core.Timeline | null = null
      let stateTimeline: gsap.core.Timeline | null = null
      let idleTimer = 0
      let burstReady = false
      const rawPath = MotionPathPlugin.getRawPath(route)
      const pointer = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        time: performance.now(),
      }
      const burstPointer = { x: pointer.x, y: pointer.y }
      const trailPixels: PixelTrailCell[] = []
      let trailPixelSequence = 0
      let trailTickerActive = false
      let trailGenerating = false
      let hasTrailSample = false
      let hasPointerInput = false
      let trailSampleX = pointer.x
      let trailSampleY = pointer.y
      let latestTrailSpeed = 0
      let lastTrailInputAt = 0
      let trailColor = ""

      const resizeTrailCanvas = () => {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = Math.round(window.innerWidth * pixelRatio)
        canvas.height = Math.round(window.innerHeight * pixelRatio)
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`
        trailContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        trailPixels.length = 0
        hasTrailSample = false
      }

      const refreshTrailColor = () => {
        trailColor = getComputedStyle(orb).getPropertyValue("--primary").trim()
      }

      const emitPixelRibbon = (
        fromX: number,
        fromY: number,
        toX: number,
        toY: number,
        speed: number,
        now: number
      ) => {
        const deltaX = toX - fromX
        const deltaY = toY - fromY
        const distance = Math.hypot(deltaX, deltaY)
        if (distance < 0.75 || distance > 180) return

        const unitX = deltaX / distance
        const unitY = deltaY / distance
        const normalX = -unitY
        const normalY = unitX
        const normalizedSpeed = gsap.utils.clamp(0, 1, speed)
        const spacing = 1.9 - normalizedSpeed * 0.4
        const stepCount = Math.min(96, Math.ceil(distance / spacing))
        const rowCount = normalizedSpeed > 0.5 ? 5 : 3
        const ribbonWidth = 3.4 + normalizedSpeed * 1.4
        const baseSize = 1.55 + normalizedSpeed * 0.25

        for (let step = 1; step <= stepCount; step += 1) {
          const progress = step / stepCount
          const pathX = fromX + deltaX * progress
          const pathY = fromY + deltaY * progress

          for (let row = 0; row < rowCount; row += 1) {
            const rowProgress = row / (rowCount - 1)
            const crossOffset = (rowProgress - 0.5) * ribbonWidth
            const sequence = trailPixelSequence
            trailPixelSequence += 1
            const lifetimeSeed = seededUnit(sequence, 1)
            const breakupSeed = seededUnit(sequence, 2)
            const driftSeed = seededUnit(sequence, 3)
            const driftDirection = driftSeed > 0.5 ? 1 : -1
            const driftDistance = 0.45 + seededUnit(sequence, 4) * 1.55

            trailPixels.push({
              x: pathX + normalX * crossOffset,
              y: pathY + normalY * crossOffset,
              bornAt: now,
              lifetime: 180 + normalizedSpeed * 110 + lifetimeSeed * 100,
              size: baseSize * (0.88 + seededUnit(sequence, 5) * 0.24),
              breakupAt: 0.3 + breakupSeed * 0.2,
              driftX: normalX * driftDirection * driftDistance,
              driftY: normalY * driftDirection * driftDistance,
              flickerPhase: seededUnit(sequence, 6) * Math.PI * 2,
            })
          }
        }

        if (trailPixels.length > maxTrailPixels) {
          trailPixels.splice(0, trailPixels.length - maxTrailPixels)
        }
      }

      const renderPixelTrail = () => {
        const now = performance.now()

        if (trailGenerating && mode === "pointer" && hasTrailSample) {
          const orbX = Number(gsap.getProperty(orb, "x"))
          const orbY = Number(gsap.getProperty(orb, "y"))
          emitPixelRibbon(
            trailSampleX,
            trailSampleY,
            orbX,
            orbY,
            latestTrailSpeed,
            now
          )
          trailSampleX = orbX
          trailSampleY = orbY

          if (
            now - lastTrailInputAt > motionTokens.orb.idleDelayMs &&
            Math.hypot(pointer.x - orbX, pointer.y - orbY) < 0.75
          ) {
            trailGenerating = false
          }
        }

        trailContext.clearRect(0, 0, window.innerWidth, window.innerHeight)
        trailContext.fillStyle = trailColor

        let livePixelCount = 0
        for (const pixel of trailPixels) {
          const age = (now - pixel.bornAt) / pixel.lifetime
          if (age >= 1) continue

          const breakupProgress = gsap.utils.clamp(
            0,
            1,
            (age - pixel.breakupAt) / (1 - pixel.breakupAt)
          )
          const fade = Math.pow(1 - breakupProgress, 1.35)
          const flicker =
            breakupProgress > 0
              ? 0.82 +
                Math.sin(now * 0.045 + pixel.flickerPhase) *
                  0.18 *
                  breakupProgress
              : 1
          const alpha = 0.76 * fade * flicker
          const size = pixel.size * (1 - breakupProgress * 0.48)
          const drawX = pixel.x + pixel.driftX * breakupProgress
          const drawY = pixel.y + pixel.driftY * breakupProgress

          trailContext.globalAlpha = alpha
          trailContext.fillRect(
            Math.round(drawX * 2) / 2,
            Math.round(drawY * 2) / 2,
            Math.max(0.75, size),
            Math.max(0.75, size)
          )
          trailPixels[livePixelCount] = pixel
          livePixelCount += 1
        }

        trailPixels.length = livePixelCount
        trailContext.globalAlpha = 1

        if (!trailGenerating && trailPixels.length === 0) {
          gsap.ticker.remove(renderPixelTrail)
          trailTickerActive = false
        }
      }

      const startTrailTicker = () => {
        if (trailTickerActive) return
        trailTickerActive = true
        gsap.ticker.add(renderPixelTrail)
      }

      resizeTrailCanvas()
      refreshTrailColor()
      const themeObserver = new MutationObserver(refreshTrailColor)
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme", "style"],
      })

      const setMode = (nextMode: OrbMode) => {
        if (mode === nextMode) return
        mode = nextMode
        orb.dataset.mode = nextMode
        if (nextMode !== "pointer") {
          trailGenerating = false
          hasTrailSample = false
        }
      }

      const setDirection = (x: number, y: number, speed: number) => {
        const magnitude = Math.hypot(x, y) || 1
        const unitX = x / magnitude
        const unitY = y / magnitude
        const normalizedSpeed = Math.min(1, speed)
        const forwardDistance = 12 + normalizedSpeed * 8
        const sideDistance = 7 + normalizedSpeed * 4
        const setLength = (property: string, value: number) => {
          orb.style.setProperty(property, `${value.toFixed(2)}px`)
        }

        setLength("--orb-forward-x", unitX * forwardDistance)
        setLength("--orb-forward-y", unitY * forwardDistance)
        setLength("--orb-side-x", -unitY * sideDistance)
        setLength("--orb-side-y", unitX * sideDistance)
        orb.style.setProperty(
          "--orb-fragment-opacity",
          String(0.18 + normalizedSpeed * 0.32)
        )
        orb.style.setProperty(
          "--orb-halo-opacity",
          String(0.28 + normalizedSpeed * 0.32)
        )
      }

      const refreshPathMatrix = () => {
        const matrix = route.getScreenCTM()
        if (!matrix) return
        pathMatrix = new DOMMatrix([
          matrix.a,
          matrix.b,
          matrix.c,
          matrix.d,
          matrix.e + window.scrollX,
          matrix.f + window.scrollY,
        ])
      }

      const getScreenPoint = (progress: number) => {
        if (!pathMatrix) refreshPathMatrix()
        const position = MotionPathPlugin.getPositionOnPath(
          rawPath,
          gsap.utils.clamp(0, 1, progress),
          true
        ) as MotionPoint
        const documentPoint = new DOMPoint(
          position.x,
          position.y
        ).matrixTransform(pathMatrix ?? undefined)
        return {
          x: documentPoint.x - window.scrollX,
          y: documentPoint.y - window.scrollY,
          angle: position.angle ?? 90,
        }
      }

      const anchorPoints = anchors.current.flatMap<JourneyPoint>((anchor) => {
        if (!anchor) return []
        const anchorBounds = anchor.getBoundingClientRect()
        const journeyBounds = journeyElement.getBoundingClientRect()
        return [
          {
            x: anchorBounds.left + anchorBounds.width / 2 - journeyBounds.left,
            y: anchorBounds.top + anchorBounds.height / 2 - journeyBounds.top,
          },
        ]
      })
      const checkpoints = createProjectCheckpoints(
        route,
        projectIds,
        anchorPoints
      )

      const renderProjectProgress = (progress: number) => {
        normalizedProgress = gsap.utils.clamp(0, 1, progress)
        travelledRoute.style.strokeDashoffset = String(
          routeLength * (1 - normalizedProgress)
        )

        const isCheckpoint = updateProjectStates(
          normalizedProgress,
          checkpoints,
          cards.current
        )

        if (mode === "project-path" || mode === "project-checkpoint") {
          const point = getScreenPoint(normalizedProgress)
          gsap.set(orb, { x: point.x, y: point.y })
          const radians = (point.angle * Math.PI) / 180
          const direction = normalizedProgress >= previousProgress ? 1 : -1
          setDirection(
            Math.cos(radians) * direction,
            Math.sin(radians) * direction,
            0.72
          )
          setMode(isCheckpoint ? "project-checkpoint" : "project-path")
        }

        previousProgress = normalizedProgress
      }

      const xTo = gsap.quickTo(orb, "x", {
        duration: motionTokens.orb.followDuration,
        ease: "power3.out",
      })
      const yTo = gsap.quickTo(orb, "y", {
        duration: motionTokens.orb.followDuration,
        ease: "power3.out",
      })

      const hideCaptureLine = () => {
        gsap.set(line, { autoAlpha: 0, scaleX: 0 })
      }

      const positionCaptureLine = (
        startX: number,
        startY: number,
        endX: number,
        endY: number
      ) => {
        const deltaX = endX - startX
        const deltaY = endY - startY
        gsap.set(line, {
          x: startX,
          y: startY,
          width: Math.hypot(deltaX, deltaY),
          rotation: Math.atan2(deltaY, deltaX) * (180 / Math.PI),
          transformOrigin: "left center",
        })
      }

      const finishPathOwnership = () => {
        hideCaptureLine()
        gsap.set(orb, { autoAlpha: 1, scale: 1 })
        setMode("project-path")
        renderProjectProgress(normalizedProgress)
      }

      const reassemble = contextSafe(
        (x: number, y: number, onComplete: () => void) => {
          stateTimeline?.kill()
          setMode("respawning")
          gsap.set(orb, { x, y, autoAlpha: 1, scale: 1 })
          gsap.set(orbCore, { autoAlpha: 0, scale: 0.2 })
          gsap.set(fragmentElements, {
            autoAlpha: 1,
            x: (index) => Math.cos((index / 7) * Math.PI * 2) * 24,
            y: (index) => Math.sin((index / 7) * Math.PI * 2) * 24,
            scale: 0.75,
          })
          stateTimeline = gsap
            .timeline({ onComplete })
            .to(fragmentElements, {
              x: 0,
              y: 0,
              duration: 0.24,
              stagger: 0.012,
              ease: "power2.in",
            })
            .to(
              orbCore,
              { autoAlpha: 1, scale: 1, duration: 0.18, ease: "power2.out" },
              "-=0.09"
            )
            .to(
              fragmentElements,
              {
                clearProps: "transform,opacity,visibility",
                duration: 0.01,
              },
              "<"
            )
        }
      )

      const capture = contextSafe(() => {
        captureTimeline?.kill()
        stateTimeline?.kill()
        burstReady = false
        const target = getScreenPoint(normalizedProgress)

        if (mode === "burst" || mode === "respawning") {
          reassemble(target.x, target.y, finishPathOwnership)
          return
        }

        setMode("capturing")
        const startX = Number(gsap.getProperty(orb, "x"))
        const startY = Number(gsap.getProperty(orb, "y"))
        positionCaptureLine(startX, startY, target.x, target.y)
        gsap.set(line, { autoAlpha: 0.45, scaleX: 0 })
        orb.dataset.moving = "true"

        captureTimeline = gsap
          .timeline({ onComplete: finishPathOwnership })
          .to(line, { scaleX: 1, duration: 0.18, ease: "power1.out" })
          .to(
            orb,
            {
              x: target.x,
              y: target.y,
              duration: motionTokens.orb.captureDuration,
              ease: motionTokens.ease.exit,
            },
            "-=0.08"
          )
          .to(line, { autoAlpha: 0, duration: 0.12 }, "-=0.1")
      })

      const releaseToPointer = contextSafe(() => {
        captureTimeline?.kill()
        stateTimeline?.kill()
        setMode("releasing")
        const startX = Number(gsap.getProperty(orb, "x"))
        const startY = Number(gsap.getProperty(orb, "y"))
        positionCaptureLine(startX, startY, pointer.x, pointer.y)
        gsap.set(line, { autoAlpha: 0.32, scaleX: 1 })
        stateTimeline = gsap
          .timeline({
            onComplete: () => {
              hideCaptureLine()
              setMode("pointer")
              orb.dataset.moving = "false"
            },
          })
          .to(orb, {
            x: pointer.x,
            y: pointer.y,
            duration: motionTokens.orb.releaseDuration,
            ease: motionTokens.ease.exit,
          })
          .to(line, { scaleX: 0, autoAlpha: 0, duration: 0.12 }, "-=0.12")
      })

      const burst = contextSafe(() => {
        captureTimeline?.kill()
        stateTimeline?.kill()
        setMode("releasing")
        burstReady = false
        burstPointer.x = pointer.x
        burstPointer.y = pointer.y
        const endPoint = getScreenPoint(1)
        const radians = (endPoint.angle * Math.PI) / 180
        gsap.set(orb, { x: endPoint.x, y: endPoint.y, autoAlpha: 1 })

        stateTimeline = gsap
          .timeline({
            onComplete: () => {
              setMode("burst")
              burstReady = true
              orb.dataset.moving = "false"
            },
          })
          .to(orb, {
            x: endPoint.x + Math.cos(radians) * 24,
            y: endPoint.y + Math.sin(radians) * 24,
            duration: 0.14,
            ease: "power1.out",
          })
          .to(orbCore, {
            scale: 1.35,
            duration: 0.1,
            ease: "power2.out",
          })
          .add(() => setMode("burst"))
          .to(
            orbCore,
            { scale: 0.15, autoAlpha: 0, duration: 0.18, ease: "power2.in" },
            ">"
          )
          .to(
            fragmentElements,
            {
              x: (index) => Math.cos((index / 7) * Math.PI * 2) * 38,
              y: (index) => Math.sin((index / 7) * Math.PI * 2) * 38,
              rotation: (index) => (index % 2 === 0 ? 45 : -45),
              autoAlpha: 0,
              duration: 0.26,
              stagger: 0.008,
              ease: "power2.out",
            },
            "<"
          )
          .to(orb, { autoAlpha: 0, duration: 0.08 }, "-=0.06")
      })

      const respawnAtPointer = contextSafe(() => {
        burstReady = false
        reassemble(pointer.x, pointer.y, () => {
          setMode("pointer")
          orb.dataset.moving = "true"
        })
      })

      const onPointerMove = (event: PointerEvent) => {
        const now = performance.now()
        const elapsed = Math.max(16, now - pointer.time)
        const deltaX = event.clientX - pointer.x
        const deltaY = event.clientY - pointer.y
        const speed = Math.hypot(deltaX, deltaY) / elapsed / 1.2

        pointer.x = event.clientX
        pointer.y = event.clientY
        pointer.time = now

        const target = event.target
        const isInteractive =
          target instanceof Element &&
          target.closest("a, button, [role='button']") !== null
        const nextInteractive = String(isInteractive)
        if (orb.dataset.interactive !== nextInteractive) {
          orb.dataset.interactive = nextInteractive
        }

        if (
          mode === "burst" &&
          burstReady &&
          Math.hypot(pointer.x - burstPointer.x, pointer.y - burstPointer.y) >
            motionTokens.orb.respawnDistance
        ) {
          respawnAtPointer()
          return
        }

        if (mode !== "pointer") return

        xTo(pointer.x)
        yTo(pointer.y)
        setDirection(deltaX, deltaY, speed)
        if (hasPointerInput) {
          latestTrailSpeed = Math.min(1, speed)
          lastTrailInputAt = now
          if (!hasTrailSample) {
            trailSampleX = Number(gsap.getProperty(orb, "x"))
            trailSampleY = Number(gsap.getProperty(orb, "y"))
            hasTrailSample = true
          }
          trailGenerating = true
          startTrailTicker()
        } else {
          hasPointerInput = true
        }
        orb.dataset.moving = "true"
        window.clearTimeout(idleTimer)
        idleTimer = window.setTimeout(() => {
          orb.dataset.moving = "false"
          orb.style.setProperty("--orb-fragment-opacity", "0")
        }, motionTokens.orb.idleDelayMs)
      }

      gsap.set(orb, {
        x: pointer.x,
        y: pointer.y,
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 1,
      })
      hideCaptureLine()
      gsap.set(travelledRoute, {
        strokeDasharray: routeLength,
        strokeDashoffset: enhancedJourney ? routeLength : 0,
      })
      if (!enhancedJourney) {
        cards.current.forEach((card) => {
          if (card) setCardPhase(card, "completed", true)
        })
      }
      refreshPathMatrix()

      const projectTrigger = enhancedJourney
        ? ScrollTrigger.create({
            id: "digital-orb-project-journey",
            trigger: journeyElement,
            start: "top 72%",
            end: "bottom 58%",
            invalidateOnRefresh: true,
            onEnter: capture,
            onEnterBack: capture,
            onLeaveBack: releaseToPointer,
            onLeave: (self) => {
              if (self.direction > 0 && self.progress >= 0.995) burst()
            },
            onUpdate: (self) => {
              renderProjectProgress(self.progress)
              if (self.isActive && mode === "pointer") capture()
            },
            onRefresh: () => {
              refreshPathMatrix()
              renderProjectProgress(normalizedProgress)
            },
          })
        : null

      window.addEventListener("pointermove", onPointerMove, { passive: true })
      window.addEventListener("resize", resizeTrailCanvas, { passive: true })

      return () => {
        window.clearTimeout(idleTimer)
        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("resize", resizeTrailCanvas)
        themeObserver.disconnect()
        gsap.ticker.remove(renderPixelTrail)
        trailContext.clearRect(0, 0, window.innerWidth, window.innerHeight)
        captureTimeline?.kill()
        stateTimeline?.kill()
        projectTrigger?.kill()
        gsap.killTweensOf([orb, orbCore, line, ...fragmentElements])
      }
    },
    {
      scope,
      dependencies: [pathData, locale, projectIds.length],
      revertOnUpdate: true,
    }
  )

  return { root, core, captureLine, trailCanvas, fragments }
}
