import { ArrowUpRightIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

import { PageContainer } from "@/components/common/page-container"
import { SectionHeading } from "@/components/common/section-heading"
import type {
  LocalizedPortfolioProject,
  LocalizedPortfolioSkillGroup,
  SupportedLanguage,
} from "@/content/portfolio.types"

type CapabilitiesSectionProps = {
  locale: SupportedLanguage
  groups: readonly LocalizedPortfolioSkillGroup[]
  projects: readonly LocalizedPortfolioProject[]
}

export function CapabilitiesSection({
  locale,
  groups,
  projects,
}: CapabilitiesSectionProps) {
  const { t } = useTranslation("site")

  return (
    <section id="expertise" className="section-shell section-rule bg-card">
      <PageContainer>
        <SectionHeading
          index={t("sections.expertise.index")}
          eyebrow={t("sections.expertise.eyebrow")}
          title={t("sections.expertise.title")}
          description={t("sections.expertise.description")}
        />

        <div className="mt-20">
          {groups.map((group, index) => (
            <article key={group.id} className="capability-band">
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold">{group.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {group.description}
                  </p>
                </div>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex min-h-12 items-center border-b border-border px-1 font-mono text-sm"
                  >
                    <span className="me-3 size-1.5 rounded-full bg-response" />
                    <bdi dir="ltr">{skill}</bdi>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-6 border-t border-border pt-8 lg:grid-cols-[0.7fr_1.3fr]">
          <p className="eyebrow text-muted-foreground">
            {t("projectStory.evidence")}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.slug}
                to={`/${locale}/projects/${project.slug}`}
                className="contact-link group flex min-h-28 flex-col justify-between rounded-lg border border-border bg-background p-4 hover:border-primary/60"
              >
                <span className="text-sm font-semibold">{project.title}</span>
                <span className="flex items-end justify-between gap-3 text-xs text-muted-foreground">
                  <span>{project.descriptor}</span>
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="shrink-0 rtl:-scale-x-100"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
