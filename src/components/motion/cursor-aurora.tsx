import { useEffect, useRef } from "react"

type Point = { x: number; y: number; life: number }

export function CursorAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const coarse = window.matchMedia("(pointer: coarse)")
    if (reduced.matches || coarse.matches) return

    const context = canvas.getContext("2d")
    if (!context) return

    let frame = 0
    let visible = true
    const pointer = { x: -100, y: -100 }
    let target = { ...pointer }
    let points: Point[] = []
    let width = 0
    let height = 0
    let primary = ""
    let response = ""

    const readColors = () => {
      const rootStyle = getComputedStyle(document.documentElement)
      primary = rootStyle.getPropertyValue("--primary").trim()
      response = rootStyle.getPropertyValue("--response").trim()
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      readColors()
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top }
      const attractors = host.querySelectorAll<HTMLElement>(
        "[data-aurora-attract]"
      )
      let nearest: { x: number; y: number; distance: number } | null = null
      for (const element of attractors) {
        const bounds = element.getBoundingClientRect()
        const x = bounds.left + bounds.width / 2 - rect.left
        const y = bounds.top + bounds.height / 2 - rect.top
        const distance = Math.hypot(target.x - x, target.y - y)
        if (distance < 150 && (!nearest || distance < nearest.distance)) {
          nearest = { x, y, distance }
        }
      }
      if (nearest) {
        const pull = 0.14 * (1 - nearest.distance / 150)
        target.x += (nearest.x - target.x) * pull
        target.y += (nearest.y - target.y) * pull
      }
    }

    const draw = () => {
      if (!visible || document.hidden) {
        frame = requestAnimationFrame(draw)
        return
      }
      pointer.x += (target.x - pointer.x) * 0.2
      pointer.y += (target.y - pointer.y) * 0.2
      points.push({ ...pointer, life: 1 })
      points = points
        .map((point) => ({ ...point, life: point.life - 0.035 }))
        .filter((point) => point.life > 0)
        .slice(-30)

      context.clearRect(0, 0, width, height)
      if (points.length > 2) {
        const protectedArea = host
          .querySelector<HTMLElement>("[data-aurora-protect]")
          ?.getBoundingClientRect()
        const hostRect = host.getBoundingClientRect()
        const behindCopy = protectedArea
          ? pointer.x >= protectedArea.left - hostRect.left &&
            pointer.x <= protectedArea.right - hostRect.left &&
            pointer.y >= protectedArea.top - hostRect.top &&
            pointer.y <= protectedArea.bottom - hostRect.top
          : false

        context.globalAlpha = behindCopy ? 0.13 : 0.42
        context.lineCap = "round"
        context.lineJoin = "round"
        context.strokeStyle = primary
        context.lineWidth = 2
        context.beginPath()
        points.forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y)
          else context.lineTo(point.x, point.y)
        })
        context.stroke()

        context.globalAlpha = behindCopy ? 0.07 : 0.24
        context.strokeStyle = response
        context.lineWidth = 7
        context.stroke()

        const head = points.at(-1)
        if (head) {
          context.globalAlpha = behindCopy ? 0.2 : 0.8
          context.fillStyle = primary
          context.beginPath()
          context.arc(head.x, head.y, 3.5, 0, Math.PI * 2)
          context.fill()
        }
      }
      context.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false
    })
    const themeObserver = new MutationObserver(readColors)
    resizeObserver.observe(host)
    intersectionObserver.observe(host)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    host.addEventListener("pointermove", onPointerMove)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      host.removeEventListener("pointermove", onPointerMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  )
}
