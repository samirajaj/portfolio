import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { getLocalizedPortfolio } from "@/content/portfolio.selectors"
import type { SupportedLanguage } from "@/content/portfolio.types"

type SiteLayoutProps = {
  locale: SupportedLanguage
  direction: "ltr" | "rtl"
  children: ReactNode
}

export function SiteLayout({ locale, direction, children }: SiteLayoutProps) {
  const { t } = useTranslation("common")
  const portfolio = getLocalizedPortfolio(locale)

  return (
    <div id="top">
      <a className="skip-link" href="#main-content">
        {t("a11y.skipToContent")}
      </a>
      <SiteHeader
        locale={locale}
        direction={direction}
        personal={portfolio.personal}
      />
      {children}
      <SiteFooter
        locale={locale}
        personal={portfolio.personal}
        socialLinks={portfolio.socialLinks}
      />
    </div>
  )
}
