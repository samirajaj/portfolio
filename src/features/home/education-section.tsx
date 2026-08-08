import { useRef } from "react"
import { useTranslation } from "react-i18next"

import { PageContainer } from "@/components/common/page-container"
import { SectionHeading } from "@/components/common/section-heading"
import type {
  LocalizedPortfolioData,
  SupportedLanguage,
} from "@/content/portfolio.types"
import { formatYear } from "@/lib/format-date"
import { gsap, useGSAP } from "@/lib/gsap/gsap"

type EducationSectionProps = {
  education: LocalizedPortfolioData["education"]
  locale: SupportedLanguage
}

export function EducationSection({ education, locale }: EducationSectionProps) {
  const { t } = useTranslation("site")
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-education-card]", {
          autoAlpha: 0,
          y: 36,
          rotate: 0.8,
          stagger: 0.14,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        })
      })
      return () => media.revert()
    },
    { scope: root }
  )

  return (
    <section ref={root} id="education" className="section-shell bg-muted/45">
      <PageContainer>
        <SectionHeading
          index="02"
          eyebrow={t("sections.education.eyebrow")}
          title={t("sections.education.title")}
          description={t("sections.education.description")}
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {education.map((item) => (
            <article
              data-education-card
              key={item.id}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-9"
            >
              <div className="flex items-start justify-between gap-6">
                <img
                  src={item.institution.logo.src}
                  alt={item.institution.logo.alt}
                  width={item.institution.logo.width}
                  height={item.institution.logo.height}
                  loading="lazy"
                  className="h-16 w-20 rounded-xl border border-border bg-white object-contain p-2"
                />
                <span className="font-mono text-xs text-muted-foreground">
                  <time dateTime={item.period.start}>
                    {formatYear(item.period.start, locale)}
                  </time>{" "}
                  —{" "}
                  {item.period.end ? (
                    <time dateTime={item.period.end}>
                      {formatYear(item.period.end, locale)}
                    </time>
                  ) : null}
                </span>
              </div>
              <p className="mt-10 text-sm text-primary">
                {item.institution.name}
              </p>
              <h3 className="mt-3 text-2xl font-semibold">{item.degree}</h3>
              <p className="mt-2 text-muted-foreground">{item.field}</p>
              {item.description ? (
                <p className="mt-6 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
              {item.achievements?.map((achievement) => (
                <div
                  key={achievement.title}
                  className="mt-8 border-t border-border pt-7"
                >
                  {achievement.score ? (
                    <p
                      className="font-mono text-4xl font-semibold text-primary"
                      aria-label={t("sections.education.score", {
                        score: achievement.score,
                      })}
                    >
                      <bdi dir="ltr">{achievement.score}</bdi>
                    </p>
                  ) : null}
                  <p className="mt-3 font-semibold">{achievement.title}</p>
                  {achievement.description ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
