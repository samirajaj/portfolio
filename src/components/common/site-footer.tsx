import { ArrowUpIcon } from "lucide-react"
import { useTranslation } from "react-i18next"

import type {
  LocalizedPortfolioData,
  SupportedLanguage,
} from "@/content/portfolio.types"

type SiteFooterProps = {
  locale: SupportedLanguage
  personal: LocalizedPortfolioData["personal"]
  socialLinks: LocalizedPortfolioData["socialLinks"]
}

export function SiteFooter({ locale, personal, socialLinks }: SiteFooterProps) {
  const { t } = useTranslation(["site", "common"])
  const year = new Intl.NumberFormat(locale, { useGrouping: false }).format(
    new Date().getFullYear()
  )

  return (
    <footer className="border-t border-border bg-card">
      <div className="page-container flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{personal.fullName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("site:footer.copyright", { year })}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a href={socialLinks.github.href} target="_blank" rel="noreferrer">
            {t("common:labels.github")}
          </a>
          <a href={socialLinks.linkedin.href} target="_blank" rel="noreferrer">
            {t("common:labels.linkedin")}
          </a>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2">
            {t("common:actions.backToTop")}
            <ArrowUpIcon aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
