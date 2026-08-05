import { useLayoutEffect } from "react"
import { RefreshCwIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router"
import { DirectionProvider } from "radix-ui/direction"

import { DocumentMeta } from "@/components/common/document-meta"
import { PageContainer } from "@/components/common/page-container"
import { Button } from "@/components/ui/button"
import { getLocalizedPortfolio } from "@/content/portfolio.selectors"
import { i18n } from "@/lib/i18n/i18n"
import { SiteLayout } from "@/layouts/site-layout"
import {
  defaultLanguage,
  getTextDirection,
  normalizeSupportedLanguage,
  persistLanguagePreference,
  resolvePreferredLanguage,
} from "@/routes/locale-routing"

export function RouteErrorPage() {
  const { locale: localeParam } = useParams()
  const locale =
    normalizeSupportedLanguage(localeParam) ??
    (typeof window === "undefined"
      ? defaultLanguage
      : resolvePreferredLanguage())
  const direction = getTextDirection(locale)
  const portfolio = getLocalizedPortfolio(locale)
  const { t } = useTranslation(["site", "common"])

  useLayoutEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = direction
    persistLanguagePreference(locale)
    void i18n.changeLanguage(locale)
  }, [direction, locale])

  return (
    <DirectionProvider dir={direction}>
      <SiteLayout locale={locale} direction={direction}>
        <DocumentMeta
          title={`${t("site:error.title")} — ${portfolio.personal.fullName}`}
          description={t("site:error.description")}
          locale={locale}
          siteUrl={portfolio.seo.siteUrl}
          image={portfolio.seo.previewImage.src}
          noIndex
        />
        <main id="main-content" tabIndex={-1}>
          <PageContainer className="flex min-h-[75svh] max-w-4xl flex-col items-start justify-center gap-7 py-16 lg:py-24">
            <p className="eyebrow text-primary">{t("site:error.eyebrow")}</p>
            <div className="flex flex-col gap-5">
              <h1 className="section-title">{t("site:error.title")}</h1>
              <p className="prose-measure">{t("site:error.description")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                size="lg"
                onClick={() => window.location.reload()}
              >
                <RefreshCwIcon data-icon="inline-start" aria-hidden="true" />
                {t("common:actions.reloadPage")}
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={`/${locale}`}>{t("common:actions.backHome")}</Link>
              </Button>
            </div>
          </PageContainer>
        </main>
      </SiteLayout>
    </DirectionProvider>
  )
}
