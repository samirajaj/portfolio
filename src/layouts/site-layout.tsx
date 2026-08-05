import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { AppSidebar } from "@/components/common/app-sidebar"
import { SiteFooter } from "@/components/common/site-footer"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
    <SidebarProvider>
      <div id="top" className="contents">
        <a className="skip-link" href="#main-content">
          {t("a11y.skipToContent")}
        </a>
        <AppSidebar
          locale={locale}
          direction={direction}
          personal={portfolio.personal}
        />
        <SidebarInset>
          <div className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-background/90 px-3 backdrop-blur md:hidden">
            <SidebarTrigger label={t("actions.toggleSidebar")} />
            <span className="ms-2 text-sm font-semibold">
              {portfolio.personal.fullName}
            </span>
          </div>
          {children}
          <SiteFooter
            locale={locale}
            personal={portfolio.personal}
            socialLinks={portfolio.socialLinks}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
