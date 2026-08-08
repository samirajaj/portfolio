import { ArrowRightIcon } from "lucide-react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

import { PageContainer } from "@/components/common/page-container"
import { SectionHeading } from "@/components/common/section-heading"
import type {
  LocalizedPortfolioData,
  SupportedLanguage,
} from "@/content/portfolio.types"
import { formatMonthYear } from "@/lib/format-date"
import { gsap, useGSAP } from "@/lib/gsap/gsap"

type ExperienceSectionProps = {
  experience: LocalizedPortfolioData["experience"]
  locale: SupportedLanguage
}

export function ExperienceSection({
  experience,
  locale,
}: ExperienceSectionProps) {
  const { t } = useTranslation("site")
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-experience-reveal]", {
          autoAlpha: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        })
      })
      return () => media.revert()
    },
    { scope: root }
  )

  return (
    <section ref={root} id="experience" className="section-shell section-rule">
      <PageContainer>
        <SectionHeading
          index="01"
          eyebrow={t("sections.experience.eyebrow")}
          title={t("sections.experience.title")}
          description={t("sections.experience.description")}
        />
        <div className="mt-16 flex flex-col gap-12">
          {experience.map((item) => (
            <article
              key={item.id}
              className="experience-card grid gap-10 rounded-3xl border border-border bg-card p-6 lg:grid-cols-12 lg:p-10"
            >
              <div data-experience-reveal className="lg:col-span-4">
                <img
                  src={item.organization.logo.src}
                  alt={item.organization.logo.alt}
                  width={item.organization.logo.width}
                  height={item.organization.logo.height}
                  loading="lazy"
                  className="size-20 rounded-2xl border border-border object-cover"
                />
                <p className="mt-6 text-sm text-muted-foreground">
                  {item.organization.name}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{item.role}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  <time dateTime={item.period.start}>
                    {formatMonthYear(item.period.start, locale)}
                  </time>{" "}
                  —{" "}
                  {item.period.isCurrent
                    ? t("dates.present")
                    : item.period.end
                      ? formatMonthYear(item.period.end, locale)
                      : null}
                  <span aria-hidden="true"> · </span>
                  {t(`workMode.${item.workMode}`)}
                </p>
              </div>
              <div className="lg:col-span-8">
                <p data-experience-reveal className="text-lg leading-8">
                  {item.summary}
                </p>
                <ul className="mt-7 grid gap-3">
                  {item.highlights.map((highlight) => (
                    <li
                      data-experience-reveal
                      key={highlight}
                      className="flex gap-3 text-sm leading-7 text-muted-foreground"
                    >
                      <span
                        className="mt-3 size-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {item.workflow ? (
                  <div data-experience-reveal className="mt-10">
                    <p className="eyebrow text-muted-foreground">
                      {t("sections.experience.workflow")}
                    </p>
                    <ol className="mt-5 flex flex-wrap items-center gap-2">
                      {item.workflow.steps.map((step, index) => (
                        <li key={step} className="flex items-center gap-2">
                          <span className="rounded-full border border-border bg-background px-3 py-2 text-xs">
                            {step}
                          </span>
                          {index < item.workflow!.steps.length - 1 ? (
                            <ArrowRightIcon
                              className="rtl:rotate-180"
                              aria-hidden="true"
                            />
                          ) : null}
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
