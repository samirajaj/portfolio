import type { ReactNode } from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitForkIcon,
  MailIcon,
  MinusIcon,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useLoaderData, useOutletContext } from "react-router"

import { DocumentMeta } from "@/components/common/document-meta"
import { PageContainer } from "@/components/common/page-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  getLocalizedPortfolio,
  getLocalizedProject,
  getLocalizedProjectNavigation,
} from "@/content/portfolio.selectors"
import type { LocalizedPortfolioProject } from "@/content/portfolio.types"
import type { LocaleOutletContext } from "@/layouts/locale-layout"
import { getEmailHref } from "@/lib/contact-links"
import { projectLoader } from "@/routes/project-loader"

type NarrativeSectionProps = {
  id: string
  title: string
  children: ReactNode
  className?: string
}

function NarrativeSection({
  id,
  title,
  children,
  className,
}: NarrativeSectionProps) {
  return (
    <section className={className} aria-labelledby={id}>
      <h2
        id={id}
        className="scroll-mt-28 text-3xl font-semibold tracking-tight text-balance rtl:tracking-normal"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

type EvidenceListProps = {
  items: readonly string[]
}

function EvidenceList({ items }: EvidenceListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-muted-foreground">
          <MinusIcon
            className="mt-1 size-4 shrink-0 text-response"
            aria-hidden="true"
          />
          <span className="leading-7">{item}</span>
        </li>
      ))}
    </ul>
  )
}

type ProjectNavigationLinkProps = {
  project: LocalizedPortfolioProject
  locale: LocaleOutletContext["locale"]
  label: string
  direction: "previous" | "next"
}

function ProjectNavigationLink({
  project,
  locale,
  label,
  direction,
}: ProjectNavigationLinkProps) {
  const isPrevious = direction === "previous"
  const Icon = isPrevious ? ArrowLeftIcon : ArrowRightIcon

  return (
    <Link
      to={`/${locale}/projects/${project.slug}`}
      className="group flex min-h-32 min-w-0 flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-5 transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-primary/60 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
    >
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        {isPrevious ? (
          <Icon className="rtl:rotate-180" aria-hidden="true" />
        ) : null}
        {label}
        {!isPrevious ? (
          <Icon className="rtl:rotate-180" aria-hidden="true" />
        ) : null}
      </span>
      <span className="text-xl font-semibold break-words text-foreground">
        {project.title}
      </span>
    </Link>
  )
}

export function ProjectPage() {
  const { t } = useTranslation(["site", "common", "contact"])
  const { project: sourceProject } = useLoaderData<typeof projectLoader>()
  const { locale } = useOutletContext<LocaleOutletContext>()
  const project = getLocalizedProject(sourceProject, locale)
  const navigation = getLocalizedProjectNavigation(project.slug, locale)
  const portfolio = getLocalizedPortfolio(locale)
  const formattedYear = new Intl.NumberFormat(locale, {
    useGrouping: false,
  }).format(project.year)
  const formattedOrder = new Intl.NumberFormat(locale, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }).format(project.order)
  const decisionNumberFormatter = new Intl.NumberFormat(locale, {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
  const socialImage = project.images[0]?.src
  const externalLinkLabel = t("common:a11y.externalLink")

  return (
    <>
      <DocumentMeta
        title={`${project.title} — ${portfolio.seo.siteName}`}
        description={project.summary}
        locale={locale}
        siteUrl={portfolio.seo.siteUrl}
        image={socialImage}
      />

      <main id="main-content" tabIndex={-1}>
        <article>
          <header className="technical-grid border-b border-border pt-28 sm:pt-36">
            <PageContainer className="flex flex-col gap-12 py-14 lg:py-20">
              <Button
                asChild
                variant="ghost"
                className="min-h-11 self-start px-3"
              >
                <Link to={`/${locale}#work`}>
                  <ArrowLeftIcon
                    data-icon="inline-start"
                    className="rtl:rotate-180"
                    aria-hidden="true"
                  />
                  {t("site:caseStudy.back")}
                </Link>
              </Button>

              <div className="grid items-end gap-10 lg:grid-cols-12">
                <div className="flex flex-col gap-7 lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">
                      {t(`common:status.${project.status}`)}
                    </Badge>
                    <p className="eyebrow text-muted-foreground">
                      {t("site:projectStory.chapter", {
                        number: formattedOrder,
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className="text-lg font-medium text-signal">
                      {project.descriptor}
                    </p>
                    <h1 className="section-title">{project.title}</h1>
                    <p className="prose-measure text-lg">{project.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.links.live ? (
                      <Button asChild size="lg" className="min-h-11 px-5">
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${t("common:actions.viewLiveSite")}. ${externalLinkLabel}`}
                        >
                          {t("common:actions.viewLiveSite")}
                          <ArrowUpRightIcon
                            data-icon="inline-end"
                            aria-hidden="true"
                          />
                        </a>
                      </Button>
                    ) : null}
                    {project.links.repository ? (
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="min-h-11 px-5"
                      >
                        <a
                          href={project.links.repository}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${t("common:actions.viewRepository")}. ${externalLinkLabel}`}
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
                </div>

                <dl className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
                  <div className="flex flex-col gap-2 bg-card p-5">
                    <dt className="eyebrow text-muted-foreground">
                      {t("common:labels.role")}
                    </dt>
                    <dd className="font-medium">{project.role}</dd>
                  </div>
                  <div className="flex flex-col gap-2 bg-card p-5">
                    <dt className="eyebrow text-muted-foreground">
                      {t("common:labels.year")}
                    </dt>
                    <dd className="font-mono font-medium" dir="auto">
                      {formattedYear}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-2 bg-card p-5">
                    <dt className="eyebrow text-muted-foreground">
                      {t("common:labels.status")}
                    </dt>
                    <dd className="font-medium">
                      {t(`common:status.${project.status}`)}
                    </dd>
                  </div>
                </dl>
              </div>
            </PageContainer>
          </header>

          <PageContainer className="flex flex-col gap-24 py-20 lg:gap-32 lg:py-28">
            <NarrativeSection
              id="project-overview"
              title={t("site:caseStudy.overview")}
              className="grid gap-8 lg:grid-cols-12"
            >
              <div className="flex flex-col gap-8 lg:col-span-8 lg:col-start-5">
                <p className="text-2xl leading-relaxed font-medium text-pretty">
                  {project.solution}
                </p>
                <EvidenceList items={project.responsibilities} />
              </div>
            </NarrativeSection>

            <section
              className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-3"
              aria-label={t("site:caseStudy.overview")}
            >
              {[
                ["context", project.context],
                ["problem", project.problem],
                ["scope", project.scope],
              ].map(([key, content]) => (
                <article
                  key={key}
                  className="flex flex-col gap-5 bg-card p-6 sm:p-8"
                >
                  <h2 className="text-2xl font-semibold tracking-tight rtl:tracking-normal">
                    {t(`site:caseStudy.${key}`)}
                  </h2>
                  <p className="leading-8 text-muted-foreground">{content}</p>
                </article>
              ))}
            </section>

            <section
              className="grid gap-12 lg:grid-cols-2"
              aria-label={t("site:caseStudy.interface")}
            >
              <NarrativeSection
                id="project-interface"
                title={t("site:caseStudy.interface")}
                className="flex flex-col gap-6 border-s-2 border-s-signal ps-6 sm:ps-8"
              >
                <p className="leading-8 text-muted-foreground">
                  {project.interfaceWork}
                </p>
              </NarrativeSection>
              <NarrativeSection
                id="project-responsive"
                title={t("site:caseStudy.responsive")}
                className="flex flex-col gap-6 border-s-2 border-s-response ps-6 sm:ps-8"
              >
                <p className="leading-8 text-muted-foreground">
                  {project.responsiveBehavior}
                </p>
              </NarrativeSection>
            </section>

            <NarrativeSection
              id="project-architecture"
              title={t("site:caseStudy.architecture")}
              className="technical-grid overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 lg:p-14"
            >
              <div className="mt-8 grid gap-12 lg:grid-cols-12">
                <p className="text-xl leading-9 text-pretty lg:col-span-7">
                  {project.architecture}
                </p>
                <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9">
                  <h3 className="eyebrow text-muted-foreground">
                    {t("common:labels.technologies")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Badge
                        key={technology}
                        variant="outline"
                        dir="ltr"
                        translate="no"
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </NarrativeSection>

            <NarrativeSection
              id="project-decisions"
              title={t("site:caseStudy.decisions")}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col">
                {project.decisions.map((decision, index) => (
                  <div key={decision.title}>
                    {index > 0 ? <Separator className="my-10" /> : null}
                    <article className="grid gap-8 lg:grid-cols-12">
                      <div className="flex items-start gap-4 lg:col-span-4">
                        <span
                          className="font-mono text-sm text-signal"
                          aria-hidden="true"
                        >
                          {decisionNumberFormatter.format(index + 1)}
                        </span>
                        <h3 className="text-2xl font-semibold">
                          {decision.title}
                        </h3>
                      </div>
                      <dl className="grid gap-7 sm:grid-cols-2 lg:col-span-8">
                        {[
                          ["decisionContext", decision.context],
                          ["alternatives", decision.alternatives],
                          ["selectedApproach", decision.decision],
                          ["tradeoff", decision.tradeOff],
                        ].map(([key, content]) => (
                          <div key={key} className="flex flex-col gap-2">
                            <dt className="eyebrow text-muted-foreground">
                              {t(`site:caseStudy.${key}`)}
                            </dt>
                            <dd className="leading-7 text-pretty">{content}</dd>
                          </div>
                        ))}
                      </dl>
                    </article>
                  </div>
                ))}
              </div>
            </NarrativeSection>

            <section
              className="grid gap-12 lg:grid-cols-3"
              aria-label={t("site:caseStudy.delivered")}
            >
              <NarrativeSection
                id="project-tradeoffs"
                title={t("site:caseStudy.tradeoff")}
                className="flex flex-col gap-6"
              >
                <EvidenceList items={project.tradeOffs} />
              </NarrativeSection>
              <NarrativeSection
                id="project-challenges"
                title={t("site:caseStudy.challenges")}
                className="flex flex-col gap-6"
              >
                <EvidenceList items={project.challenges} />
              </NarrativeSection>
              <NarrativeSection
                id="project-delivered"
                title={t("site:caseStudy.delivered")}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-wrap gap-2">
                  {project.capabilities.map((capability) => (
                    <Badge key={capability} variant="secondary">
                      {capability}
                    </Badge>
                  ))}
                </div>
                <EvidenceList items={project.outcomes} />
              </NarrativeSection>
            </section>

            {project.images.length > 0 ? (
              <NarrativeSection
                id="project-gallery"
                title={t("site:caseStudy.gallery")}
                className="flex flex-col gap-8"
              >
                <p className="prose-measure">
                  {t("site:caseStudy.galleryNote")}
                </p>
                <div className="grid gap-8">
                  {project.images.map((image) => (
                    <figure
                      key={image.src}
                      className="overflow-hidden rounded-3xl border border-border bg-card"
                    >
                      <img
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full"
                      />
                      <figcaption className="border-t border-border px-5 py-4 text-sm text-muted-foreground sm:px-6">
                        {image.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </NarrativeSection>
            ) : null}

            {navigation?.previous || navigation?.next ? (
              <NarrativeSection
                id="project-navigation"
                title={t("site:caseStudy.navigation")}
                className="flex flex-col gap-8"
              >
                <nav
                  className="grid gap-4 sm:grid-cols-2"
                  aria-labelledby="project-navigation"
                >
                  {navigation.previous ? (
                    <ProjectNavigationLink
                      project={navigation.previous}
                      locale={locale}
                      label={t("common:actions.previousProject")}
                      direction="previous"
                    />
                  ) : (
                    <span aria-hidden="true" />
                  )}
                  {navigation.next ? (
                    <ProjectNavigationLink
                      project={navigation.next}
                      locale={locale}
                      label={t("common:actions.nextProject")}
                      direction="next"
                    />
                  ) : null}
                </nav>
              </NarrativeSection>
            ) : null}
          </PageContainer>

          <section
            className="contact-panel"
            aria-labelledby="project-contact-title"
          >
            <PageContainer className="relative grid gap-8 py-16 lg:grid-cols-12 lg:items-end lg:py-20">
              <div className="flex flex-col gap-4 lg:col-span-8">
                <p className="eyebrow opacity-70">
                  {t("site:sections.contact.eyebrow")}
                </p>
                <h2
                  id="project-contact-title"
                  className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl rtl:tracking-normal"
                >
                  {t("site:caseStudy.discuss")}
                </h2>
                <p className="max-w-2xl leading-7 opacity-75">
                  {portfolio.contact.introduction}
                </p>
              </div>
              <div className="lg:col-span-3 lg:col-start-10 lg:justify-self-end">
                <Button asChild size="lg" className="min-h-11 px-5">
                  <a href={getEmailHref(portfolio.contact.email)}>
                    <MailIcon data-icon="inline-start" aria-hidden="true" />
                    {t("common:actions.sendEmail")}
                  </a>
                </Button>
              </div>
            </PageContainer>
          </section>
        </article>
      </main>
    </>
  )
}
