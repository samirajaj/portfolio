import { useTranslation } from "react-i18next"

import { PageContainer } from "@/components/common/page-container"
import { SectionHeading } from "@/components/common/section-heading"
import type {
  LocalizedPortfolioData,
  LocalizedPortfolioEducation,
  LocalizedPortfolioExperience,
} from "@/content/portfolio.types"

type AboutSectionProps = {
  about: LocalizedPortfolioData["about"]
  experience: readonly LocalizedPortfolioExperience[]
  education: readonly LocalizedPortfolioEducation[]
}

function Period({
  start,
  end,
  current,
  currentLabel,
}: {
  start: string
  end: string | null
  current: boolean
  currentLabel: string
}) {
  return (
    <bdi dir="ltr" className="font-mono text-xs text-muted-foreground">
      {start} — {current ? currentLabel : end}
    </bdi>
  )
}

export function AboutSection({
  about,
  experience,
  education,
}: AboutSectionProps) {
  const { t } = useTranslation(["site", "common"])

  return (
    <section id="about" className="section-shell section-rule">
      <PageContainer>
        <SectionHeading
          index={t("sections.about.index")}
          eyebrow={t("sections.about.eyebrow")}
          title={t("sections.about.title")}
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-2">
            <p className="text-2xl leading-relaxed font-medium sm:text-3xl">
              {about.introduction}
            </p>
            <div className="flex flex-col gap-5">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="prose-measure">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="border-s-2 border-response ps-5">
              <p className="eyebrow mb-3 text-muted-foreground">
                {t("sections.about.focus")}
              </p>
              <p className="leading-7">{about.currentFocus}</p>
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
            <section aria-labelledby="experience-title">
              <h3
                id="experience-title"
                className="eyebrow mb-5 text-muted-foreground"
              >
                {t("sections.about.experience")}
              </h3>
              <div className="flex flex-col gap-5 border-t border-border pt-5">
                {experience.map((item) => (
                  <article key={item.id} className="flex flex-col gap-2">
                    <Period
                      start={item.period.start}
                      end={item.period.end}
                      current={item.period.current}
                      currentLabel={t("common:labels.current")}
                    />
                    <h4 className="font-semibold">{item.role}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.organization}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="education-title">
              <h3
                id="education-title"
                className="eyebrow mb-5 text-muted-foreground"
              >
                {t("sections.about.education")}
              </h3>
              <div className="flex flex-col gap-6 border-t border-border pt-5">
                {education.map((item) => (
                  <article key={item.id} className="flex flex-col gap-2">
                    <Period
                      start={item.period.start}
                      end={item.period.end}
                      current={item.period.current}
                      currentLabel={t("common:labels.current")}
                    />
                    <h4 className="font-semibold">{item.credential}</h4>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.institution}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {about.principles.map((principle, index) => (
            <article
              key={principle.title}
              className="flex min-h-56 flex-col justify-between gap-8 bg-card p-6 lg:p-8"
            >
              <span className="font-mono text-xs text-signal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{principle.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
