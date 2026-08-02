import { useRef } from "react"
import { ArrowUpRightIcon, GitForkIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

import { PageContainer } from "@/components/common/page-container"
import { SectionHeading } from "@/components/common/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type {
  LocalizedPortfolioProject,
  SupportedLanguage,
} from "@/content/portfolio.types"
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/gsap"
import { motionQueries } from "@/lib/gsap/motion-preferences"
import { motionTokens } from "@/lib/gsap/motion-tokens"

type SelectedWorkSectionProps = {
  locale: SupportedLanguage
  projects: readonly LocalizedPortfolioProject[]
}

type ProjectVisualState = "interface" | "architecture" | "decision"

const visualStates = [
  "interface",
  "architecture",
  "decision",
] as const satisfies readonly ProjectVisualState[]

function projectAccent(index: number) {
  return (["violet", "teal", "amber"] as const)[index % 3] ?? "violet"
}

function ProjectVisualLayer({
  project,
  projectIndex,
  orderLabel,
  yearLabel,
  state,
}: {
  project: LocalizedPortfolioProject
  projectIndex: number
  orderLabel: string
  yearLabel: string
  state: ProjectVisualState
}) {
  const { t } = useTranslation(["site", "common"])
  const image = project.images[0]
  const decision = project.decisions[0]

  return (
    <div
      data-project-visual={`${projectIndex}-${state}`}
      data-accent={projectAccent(projectIndex)}
      className="project-visual-layer flex flex-col"
      aria-hidden="true"
    >
      <div className="flex h-12 items-center justify-between border-b border-border px-4 font-mono text-[0.65rem] text-muted-foreground">
        <span>
          {orderLabel} / {t(`projectStory.${state}`)}
        </span>
        <span>{yearLabel}</span>
      </div>

      {state === "interface" ? (
        <div className="technical-grid flex flex-1 items-center p-6 sm:p-10">
          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
            <div className="flex h-9 items-center justify-between border-b border-border px-3">
              <div className="flex gap-1.5">
                <span className="size-1.5 rounded-full bg-signal" />
                <span className="size-1.5 rounded-full bg-border" />
                <span className="size-1.5 rounded-full bg-response" />
              </div>
              <span className="font-mono text-[0.58rem] text-muted-foreground">
                {project.slug}
              </span>
            </div>
            <div className="grid gap-8 p-6 sm:grid-cols-[1.2fr_0.8fr] sm:p-8">
              <div className="flex flex-col gap-4">
                <span className="h-1.5 w-12 rounded-full bg-(--project-accent)" />
                <p className="text-2xl font-semibold">{project.title}</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  {project.descriptor}
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="h-8 w-24 rounded-md bg-primary" />
                  <span className="h-8 w-20 rounded-md border border-border" />
                </div>
              </div>
              <div className="grid content-start gap-2">
                {project.capabilities.slice(0, 4).map((capability) => (
                  <div
                    key={capability}
                    className="rounded-md border border-border bg-card p-2.5 text-[0.68rem] text-muted-foreground"
                  >
                    {capability}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {state === "architecture" ? (
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-surface-raised p-4 sm:p-8">
          {image ? (
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
              loading="lazy"
              decoding="async"
              className="relative z-10 h-auto w-full rounded-lg border border-border"
            />
          ) : null}
        </div>
      ) : null}

      {state === "decision" && decision ? (
        <div className="technical-grid flex flex-1 items-center p-7 sm:p-12">
          <div className="mx-auto flex max-w-xl flex-col gap-7 border-s-2 border-(--project-accent) ps-6 sm:ps-9">
            <p className="eyebrow text-muted-foreground">
              {t("projectStory.decision")}
            </p>
            <p className="text-3xl leading-tight font-semibold sm:text-4xl">
              {decision.title}
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              {decision.decision}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[0.65rem]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function SelectedWorkSection({
  locale,
  projects,
}: SelectedWorkSectionProps) {
  const { t } = useTranslation(["site", "common"])
  const rootRef = useRef<HTMLElement>(null)
  const orderFormatter = new Intl.NumberFormat(locale, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
  const yearFormatter = new Intl.NumberFormat(locale, { useGrouping: false })

  useGSAP(
    (_context, contextSafe) => {
      const media = gsap.matchMedia()

      media.add(
        {
          desktop: motionQueries.desktop,
          fullMotion: motionQueries.full,
        },
        (mediaContext) => {
          const { desktop, fullMotion } = mediaContext.conditions as Record<
            string,
            boolean
          >

          if (!desktop || !fullMotion) {
            return
          }

          if (!contextSafe) {
            return
          }

          const steps = gsap.utils.toArray<HTMLElement>("[data-project-step]")
          const visuals = gsap.utils.toArray<HTMLElement>(
            "[data-project-visual]"
          )

          gsap.set(visuals, { autoAlpha: 0, y: motionTokens.distance.small })
          gsap.set(visuals[0], { autoAlpha: 1, y: 0 })

          const activateVisual = contextSafe((visualKey: string) => {
            visuals.forEach((visual) => {
              const isActive = visual.dataset.projectVisual === visualKey

              gsap.to(visual, {
                autoAlpha: isActive ? 1 : 0,
                y: isActive ? 0 : motionTokens.distance.small,
                duration: motionTokens.duration.base,
                ease: motionTokens.ease.enter,
                overwrite: "auto",
              })
            })
          })

          steps.forEach((step) => {
            const visualKey = step.dataset.projectStep

            if (!visualKey) {
              return
            }

            ScrollTrigger.create({
              trigger: step,
              start: "top 58%",
              end: "bottom 42%",
              onEnter: () => activateVisual(visualKey),
              onEnterBack: () => activateVisual(visualKey),
            })
          })
        }
      )

      return () => media.revert()
    },
    {
      scope: rootRef,
      dependencies: [locale],
      revertOnUpdate: true,
    }
  )

  return (
    <section id="work" ref={rootRef} className="section-shell section-rule">
      <PageContainer>
        <SectionHeading
          index={t("sections.work.index")}
          eyebrow={t("sections.work.eyebrow")}
          title={t("sections.work.title")}
          description={t("sections.work.description")}
        />

        <div className="selected-work-grid mt-20 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            {projects.map((project, projectIndex) => {
              const image = project.images[0]
              const decision = project.decisions[0]
              const orderLabel = orderFormatter.format(projectIndex + 1)
              const yearLabel = yearFormatter.format(project.year)

              return (
                <article
                  key={project.slug}
                  data-accent={projectAccent(projectIndex)}
                  className="project-chapter flex flex-col gap-8 border-t border-border py-12 lg:min-h-[120svh] lg:py-16"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-xs text-signal">
                        {t("projectStory.chapter", {
                          number: orderLabel,
                        })}
                      </span>
                      <Badge variant="outline">
                        {t(`common:status.${project.status}`)}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl rtl:tracking-normal">
                        {project.title}
                      </h3>
                      <p className="text-base font-medium text-(--project-accent)">
                        {project.descriptor}
                      </p>
                    </div>
                    <p className="prose-measure">{project.summary}</p>
                    <div className="flex flex-col gap-2 border-s-2 border-s-(--project-accent) ps-4">
                      <p className="eyebrow text-muted-foreground">
                        {t("caseStudy.problem")}
                      </p>
                      <p className="text-sm leading-7 text-muted-foreground">
                        {project.problem}
                      </p>
                    </div>
                    <dl className="grid grid-cols-2 gap-5 border-y border-border py-5 text-sm">
                      <div className="flex flex-col gap-1.5">
                        <dt className="text-muted-foreground">
                          {t("common:labels.role")}
                        </dt>
                        <dd className="font-medium">{project.role}</dd>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <dt className="text-muted-foreground">
                          {t("common:labels.year")}
                        </dt>
                        <dd className="font-medium">{yearLabel}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="project-mobile-visual lg:hidden">
                    {image ? (
                      <figure className="project-stage overflow-hidden">
                        <img
                          src={image.src}
                          width={image.width}
                          height={image.height}
                          alt={image.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-auto w-full"
                        />
                        <figcaption className="border-t border-border p-4 text-sm text-muted-foreground">
                          {image.caption}
                        </figcaption>
                      </figure>
                    ) : null}
                  </div>

                  <div
                    data-project-step={`${projectIndex}-interface`}
                    className="flex flex-col gap-3 lg:min-h-[34svh] lg:justify-center"
                  >
                    <p className="eyebrow text-muted-foreground">
                      {t("projectStory.interface")}
                    </p>
                    <p className="text-base leading-7">
                      {project.interfaceWork}
                    </p>
                  </div>

                  <div
                    data-project-step={`${projectIndex}-architecture`}
                    className="flex flex-col gap-3 border-s border-border ps-5 lg:min-h-[34svh] lg:justify-center"
                  >
                    <p className="eyebrow text-muted-foreground">
                      {t("projectStory.architecture")}
                    </p>
                    <p className="text-base leading-7">
                      {project.architecture}
                    </p>
                  </div>

                  {decision ? (
                    <div
                      data-project-step={`${projectIndex}-decision`}
                      className="flex flex-col gap-3 lg:min-h-[34svh] lg:justify-center"
                    >
                      <p className="eyebrow text-muted-foreground">
                        {t("projectStory.decision")}
                      </p>
                      <p className="text-xl font-semibold">{decision.title}</p>
                      <p className="text-base leading-7 text-muted-foreground">
                        {decision.decision}
                      </p>
                    </div>
                  ) : null}

                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-border px-3 py-1.5 font-mono text-[0.68rem] text-muted-foreground"
                      >
                        <bdi dir="ltr">{technology}</bdi>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="min-h-11 px-4">
                      <Link to={`/${locale}/projects/${project.slug}`}>
                        {t("common:actions.viewCaseStudy")}
                        <ArrowUpRightIcon
                          data-icon="inline-end"
                          aria-hidden="true"
                          className="rtl:-scale-x-100"
                        />
                      </Link>
                    </Button>
                    {project.links.repository ? (
                      <Button
                        asChild
                        variant="outline"
                        className="min-h-11 px-4"
                      >
                        <a
                          href={project.links.repository}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <GitForkIcon
                            data-icon="inline-start"
                            aria-hidden="true"
                          />
                          {t("common:actions.viewRepository")}
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>

          <div className="selected-work-stage hidden lg:col-span-7 lg:block">
            <div className="sticky top-[calc(var(--header-height)+2rem)] h-[calc(100svh-var(--header-height)-4rem)] py-4">
              <div className="project-stage size-full">
                {projects.flatMap((project, projectIndex) =>
                  visualStates.map((state) => (
                    <ProjectVisualLayer
                      key={`${project.slug}-${state}`}
                      project={project}
                      projectIndex={projectIndex}
                      orderLabel={orderFormatter.format(projectIndex + 1)}
                      yearLabel={yearFormatter.format(project.year)}
                      state={state}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
