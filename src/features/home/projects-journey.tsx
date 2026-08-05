import { ExternalLinkIcon, GitForkIcon } from "lucide-react"
import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { PageContainer } from "@/components/common/page-container"
import { ProjectImage } from "@/components/common/project-image"
import { SectionHeading } from "@/components/common/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { LocalizedPortfolioData } from "@/content/portfolio.types"
import { gsap, useGSAP } from "@/lib/gsap/gsap"

type Point = { x: number; y: number }
type PathLayout = { width: number; height: number; data: string }

function createSerpentinePath(points: readonly Point[]) {
  if (points.length === 0) return ""
  return points.slice(1).reduce(
    (path, point, index) => {
      const previous = points[index]
      if (!previous) return path
      const middleY = (previous.y + point.y) / 2
      return `${path} C ${previous.x} ${middleY}, ${point.x} ${middleY}, ${point.x} ${point.y}`
    },
    `M ${points[0]?.x ?? 0} ${points[0]?.y ?? 0}`
  )
}

type ProjectsJourneyProps = {
  projects: LocalizedPortfolioData["projects"]
  locale: "en" | "ar"
}

export function ProjectsJourney({ projects, locale }: ProjectsJourneyProps) {
  const { t } = useTranslation(["site", "common"])
  const root = useRef<HTMLElement>(null)
  const journey = useRef<HTMLDivElement>(null)
  const anchors = useRef<(HTMLSpanElement | null)[]>([])
  const cards = useRef<(HTMLElement | null)[]>([])
  const progressPath = useRef<SVGPathElement>(null)
  const energyNode = useRef<SVGGElement>(null)
  const terminal = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<PathLayout>({
    width: 1,
    height: 1,
    data: "",
  })

  const measure = useCallback(() => {
    const container = journey.current
    if (!container) return
    const bounds = container.getBoundingClientRect()
    const points = anchors.current.flatMap((anchor) => {
      if (!anchor) return []
      const rect = anchor.getBoundingClientRect()
      return [
        {
          x: rect.left + rect.width / 2 - bounds.left,
          y: rect.top + rect.height / 2 - bounds.top,
        },
      ]
    })
    const terminalBounds = terminal.current?.getBoundingClientRect()
    if (terminalBounds) {
      points.push({
        x: terminalBounds.left + terminalBounds.width / 2 - bounds.left,
        y: terminalBounds.top + terminalBounds.height / 2 - bounds.top,
      })
    }
    const next = {
      width: Math.max(1, bounds.width),
      height: Math.max(1, bounds.height),
      data: createSerpentinePath(points),
    }
    setLayout((current) =>
      current.width === next.width &&
      current.height === next.height &&
      current.data === next.data
        ? current
        : next
    )
  }, [])

  useLayoutEffect(() => {
    const container = journey.current
    if (!container) return
    let frame = 0
    const scheduleMeasure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    const observer = new ResizeObserver(scheduleMeasure)
    observer.observe(container)
    cards.current.forEach((card) => card && observer.observe(card))
    void document.fonts?.ready.then(scheduleMeasure)
    scheduleMeasure()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [locale, measure, projects.length])

  useGSAP(
    () => {
      const path = progressPath.current
      const node = energyNode.current
      if (!path || !node || !layout.data) return
      const length = path.getTotalLength()
      const media = gsap.matchMedia()

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 })
        gsap.set(node, { autoAlpha: 0 })
        cards.current.forEach((card) =>
          card?.setAttribute("data-active", "true")
        )
      })

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.set(node, { autoAlpha: 1 })
        cards.current.forEach((card, index) =>
          card?.setAttribute("data-active", String(index === 0))
        )
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: journey.current,
            start: "top 68%",
            end: "bottom 62%",
            scrub: 0.55,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
              const activeIndex = Math.min(
                projects.length - 1,
                Math.floor(progress * projects.length)
              )
              cards.current.forEach((card, index) =>
                card?.setAttribute("data-active", String(index <= activeIndex))
              )
            },
          },
        })
        timeline
          .to(path, { strokeDashoffset: 0, duration: 0.92, ease: "none" }, 0)
          .to(
            node,
            {
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
              duration: 0.92,
              ease: "none",
            },
            0
          )
          .to(
            "[data-energy-fragment]",
            {
              x: (index) => Math.cos((index / 8) * Math.PI * 2) * 34,
              y: (index) => Math.sin((index / 8) * Math.PI * 2) * 34,
              scale: 0.2,
              autoAlpha: 0,
              stagger: 0.006,
              duration: 0.08,
              ease: "power2.out",
            },
            0.92
          )
        return () => timeline.kill()
      })
      return () => media.revert()
    },
    { scope: root, dependencies: [layout.data, projects.length] }
  )

  return (
    <section
      ref={root}
      id="projects"
      className="section-shell section-rule overflow-hidden"
    >
      <PageContainer>
        <SectionHeading
          index="03"
          eyebrow={t("site:sections.projects.eyebrow")}
          title={t("site:sections.projects.title")}
          description={t("site:sections.projects.description")}
        />

        <div ref={journey} className="projects-journey relative mt-20">
          <svg
            className="journey-path"
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={layout.data}
              className="journey-path-base"
              vectorEffect="non-scaling-stroke"
            />
            <path
              ref={progressPath}
              d={layout.data}
              className="journey-path-progress"
              vectorEffect="non-scaling-stroke"
            />
            <g ref={energyNode} className="journey-energy-node-wrap">
              <circle r="7" className="journey-energy-node" />
            </g>
          </svg>

          <div className="flex flex-col gap-20 md:gap-28">
            {projects.map((project, index) => (
              <div key={project.id} className="journey-row grid md:grid-cols-2">
                <article
                  ref={(element) => {
                    cards.current[index] = element
                  }}
                  data-active={index === 0}
                  data-accent={project.accent}
                  className={
                    index % 2 === 0
                      ? "journey-card md:col-start-1"
                      : "journey-card md:col-start-2"
                  }
                >
                  <span
                    ref={(element) => {
                      anchors.current[index] = element
                    }}
                    className={
                      index % 2 === 0
                        ? "journey-anchor journey-anchor-end"
                        : "journey-anchor journey-anchor-start"
                    }
                    aria-hidden="true"
                  />
                  <div className="overflow-hidden rounded-t-[calc(var(--radius)*2)] border-b border-border">
                    <ProjectImage project={project} onLoad={measure} />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium text-primary">
                          {project.category}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold">
                          {project.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground">
                      {project.description}
                    </p>
                    {project.contribution ? (
                      <p className="mt-4 text-sm leading-7">
                        <strong>{t("site:projects.contribution")}: </strong>
                        {project.contribution}
                      </p>
                    ) : null}
                    {project.keyResult ? (
                      <p className="mt-4 font-mono text-sm text-primary">
                        {project.keyResult}
                      </p>
                    ) : null}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map(({ name }) => (
                        <Badge key={name} variant="secondary">
                          {name}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-2">
                      {project.links.demo ? (
                        <Button asChild variant="outline">
                          <a
                            href={project.links.demo.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={project.links.demo.ariaLabel}
                          >
                            <ExternalLinkIcon
                              data-icon="inline-start"
                              aria-hidden="true"
                            />
                            {t("common:actions.liveProject")}
                          </a>
                        </Button>
                      ) : null}
                      {project.links.source ? (
                        <Button asChild variant="outline">
                          <a
                            href={project.links.source.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={project.links.source.ariaLabel}
                          >
                            <GitForkIcon
                              data-icon="inline-start"
                              aria-hidden="true"
                            />
                            {t("common:actions.sourceCode")}
                          </a>
                        </Button>
                      ) : null}
                      {project.visibilityNote ? (
                        <span className="text-xs text-muted-foreground">
                          {project.visibilityNote}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div ref={terminal} className="journey-terminal" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index} data-energy-fragment />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
