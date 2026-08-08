import { useTranslation } from "react-i18next"

import type { LocalizedPortfolioData } from "@/content/portfolio.types"

type CapabilityStripProps = {
  capabilities: LocalizedPortfolioData["capabilities"]
}

export function CapabilityStrip({ capabilities }: CapabilityStripProps) {
  const { t } = useTranslation("site")

  return (
    <section
      aria-labelledby="capabilities-title"
      className="border-y border-border bg-card"
    >
      <h2 id="capabilities-title" className="sr-only">
        {t("sections.capabilities.title")}
      </h2>
      <div className="page-container grid sm:grid-cols-2 xl:grid-cols-4">
        {capabilities.map((capability, index) => (
          <article
            key={capability.id}
            className="capability-item py-7 sm:px-6 sm:first:ps-0 sm:last:pe-0"
          >
            <span className="font-mono text-xs text-primary" aria-hidden="true">
              0{index + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{capability.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {capability.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
