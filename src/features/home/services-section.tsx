import { useTranslation } from "react-i18next"

import { PageContainer } from "@/components/common/page-container"
import type { LocalizedPortfolioService } from "@/content/portfolio.types"

type ServicesSectionProps = {
  services: readonly LocalizedPortfolioService[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const { t } = useTranslation("site")

  return (
    <section className="section-shell section-rule">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <p className="eyebrow text-signal">
              {t("sections.services.eyebrow")}
            </p>
            <h2 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl rtl:tracking-normal">
              {t("sections.services.title")}
            </h2>
          </div>

          <ol className="border-t border-border lg:col-span-7 lg:col-start-6">
            {services.map((service, index) => (
              <li
                key={service.id}
                className="grid gap-4 border-b border-border py-7 sm:grid-cols-[3rem_0.9fr_1.1fr] sm:items-start sm:gap-6"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">
                  {service.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </PageContainer>
    </section>
  )
}
