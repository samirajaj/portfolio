import { ExternalLinkIcon, GitForkIcon } from "lucide-react"
import type { Ref } from "react"
import { useTranslation } from "react-i18next"

import { ProjectImage } from "@/components/common/project-image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { LocalizedProject } from "@/content/portfolio.types"

type ProjectJourneyCardProps = {
  project: LocalizedProject
  index: number
  articleRef: Ref<HTMLElement>
  anchorRef: Ref<HTMLSpanElement>
  onImageLoad: () => void
}

export function ProjectJourneyCard({
  project,
  index,
  articleRef,
  anchorRef,
  onImageLoad,
}: ProjectJourneyCardProps) {
  const { t } = useTranslation(["site", "common"])

  return (
    <article
      ref={articleRef}
      data-phase="upcoming"
      data-visited="false"
      data-accent={project.accent}
      className={
        index % 2 === 0
          ? "journey-card md:col-start-1"
          : "journey-card md:col-start-2"
      }
    >
      <span
        ref={anchorRef}
        className={
          index % 2 === 0
            ? "journey-anchor journey-anchor-end"
            : "journey-anchor journey-anchor-start"
        }
        aria-hidden="true"
      />
      <span className="project-activation-fragments" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <div className="journey-card-visual overflow-hidden rounded-t-[calc(var(--radius)*2)] border-b border-border">
        <ProjectImage project={project} onLoad={onImageLoad} />
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-primary">
              {project.category}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-balance">
              {project.title}
            </h3>
          </div>
          <span className="project-number font-mono text-xs text-muted-foreground">
            0{index + 1}
          </span>
        </div>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          {project.description}
        </p>
        {project.contribution ? (
          <p className="project-metadata mt-4 text-sm leading-7">
            <strong>{t("site:projects.contribution")}: </strong>
            {project.contribution}
          </p>
        ) : null}
        {project.keyResult ? (
          <p className="project-status mt-4 font-mono text-sm text-primary">
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
                <ExternalLinkIcon data-icon="inline-start" aria-hidden="true" />
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
                <GitForkIcon data-icon="inline-start" aria-hidden="true" />
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
  )
}
