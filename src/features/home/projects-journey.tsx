import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { PageContainer } from "@/components/common/page-container"
import { SectionHeading } from "@/components/common/section-heading"
import { DigitalOrb } from "@/components/motion/digital-orb/digital-orb"
import type { LocalizedPortfolioData } from "@/content/portfolio.types"
import { ProjectJourneyCard } from "@/features/home/project-journey-card"
import {
  createSerpentinePath,
  type JourneyPoint,
} from "@/features/home/project-journey-utils"
import { useDigitalOrbController } from "@/features/home/use-digital-orb-controller"
import { ScrollTrigger } from "@/lib/gsap/gsap"

type PathLayout = { width: number; height: number; data: string }

type ProjectsJourneyProps = {
  projects: LocalizedPortfolioData["projects"]
  locale: "en" | "ar"
}

function getRelativeCenter(
  element: HTMLElement,
  containerBounds: DOMRect
): JourneyPoint {
  const bounds = element.getBoundingClientRect()
  return {
    x: bounds.left + bounds.width / 2 - containerBounds.left,
    y: bounds.top + bounds.height / 2 - containerBounds.top,
  }
}

export function ProjectsJourney({ projects, locale }: ProjectsJourneyProps) {
  const { t } = useTranslation("site")
  const root = useRef<HTMLElement>(null)
  const journey = useRef<HTMLDivElement>(null)
  const entry = useRef<HTMLSpanElement>(null)
  const terminal = useRef<HTMLDivElement>(null)
  const anchors = useRef<(HTMLSpanElement | null)[]>([])
  const cards = useRef<(HTMLElement | null)[]>([])
  const routePath = useRef<SVGPathElement>(null)
  const progressPath = useRef<SVGPathElement>(null)
  const [layout, setLayout] = useState<PathLayout>({
    width: 1,
    height: 1,
    data: "",
  })

  const measure = useCallback(() => {
    const container = journey.current
    const entryElement = entry.current
    const terminalElement = terminal.current
    if (!container || !entryElement || !terminalElement) return

    const bounds = container.getBoundingClientRect()
    const points = [
      getRelativeCenter(entryElement, bounds),
      ...anchors.current.flatMap((anchor) =>
        anchor ? [getRelativeCenter(anchor, bounds)] : []
      ),
      getRelativeCenter(terminalElement, bounds),
    ]
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
    let active = true
    const scheduleMeasure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        measure()
        ScrollTrigger.refresh()
      })
    }
    const observer = new ResizeObserver(scheduleMeasure)
    observer.observe(container)
    cards.current.forEach((card) => card && observer.observe(card))
    void document.fonts?.ready.then(() => {
      if (active) scheduleMeasure()
    })
    scheduleMeasure()

    return () => {
      active = false
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [locale, measure, projects.length])

  const orbRefs = useDigitalOrbController({
    scope: root,
    journey,
    path: routePath,
    progressPath,
    anchors,
    cards,
    projectIds: projects.map((project) => project.id),
    pathData: layout.data,
    locale,
  })

  return (
    <>
      <DigitalOrb elements={orbRefs} />
      <section
        ref={root}
        id="projects"
        className="section-shell section-rule overflow-hidden"
      >
        <PageContainer>
          <SectionHeading
            index="03"
            eyebrow={t("sections.projects.eyebrow")}
            title={t("sections.projects.title")}
            description={t("sections.projects.description")}
          />

          <div ref={journey} className="projects-journey relative mt-20">
            <span ref={entry} className="journey-entry" aria-hidden="true" />
            <svg
              className="journey-path"
              viewBox={`0 0 ${layout.width} ${layout.height}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={routePath}
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
            </svg>

            <div className="flex flex-col gap-20 pt-16 md:gap-28 md:pt-20">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="journey-row grid md:grid-cols-2"
                >
                  <ProjectJourneyCard
                    project={project}
                    index={index}
                    articleRef={(element) => {
                      cards.current[index] = element
                    }}
                    anchorRef={(element) => {
                      anchors.current[index] = element
                    }}
                    onImageLoad={measure}
                  />
                </div>
              ))}
            </div>

            <div ref={terminal} className="journey-terminal" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  )
}
