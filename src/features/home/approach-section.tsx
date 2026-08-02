import { useTranslation } from "react-i18next"

import { PageContainer } from "@/components/common/page-container"
import { SectionHeading } from "@/components/common/section-heading"
import type { LocalizedPortfolioData } from "@/content/portfolio.types"

type ApproachSectionProps = {
  steps: LocalizedPortfolioData["process"]
}

export function ApproachSection({ steps }: ApproachSectionProps) {
  const { t } = useTranslation("site")

  return (
    <section
      id="approach"
      className="section-shell section-rule overflow-hidden bg-card"
    >
      <PageContainer>
        <SectionHeading
          index={t("sections.approach.index")}
          eyebrow={t("sections.approach.eyebrow")}
          title={t("sections.approach.title")}
          description={t("sections.approach.description")}
        />

        <ol className="relative mt-20 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className="relative flex min-h-64 flex-col justify-between gap-10 bg-background p-6 lg:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-signal">
                  {step.number}
                </span>
                {index < steps.length - 1 ? (
                  <span
                    className="h-px w-12 bg-gradient-to-r from-signal to-response rtl:bg-gradient-to-l"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </PageContainer>
    </section>
  )
}
