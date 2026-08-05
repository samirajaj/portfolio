import { ArrowLeftIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useOutletContext } from "react-router"

import { DocumentMeta } from "@/components/common/document-meta"
import { PageContainer } from "@/components/common/page-container"
import { Button } from "@/components/ui/button"
import { getLocalizedPortfolio } from "@/content/portfolio.selectors"
import type { LocaleOutletContext } from "@/layouts/locale-layout"

export function NotFoundPage() {
  const { t } = useTranslation(["site", "common"])
  const { locale } = useOutletContext<LocaleOutletContext>()
  const portfolio = getLocalizedPortfolio(locale)
  const title = t("site:notFound.title")
  const description = t("site:notFound.description")

  return (
    <>
      <DocumentMeta
        title={`${title} — ${portfolio.personal.fullName}`}
        description={description}
        locale={locale}
        siteUrl={portfolio.seo.siteUrl}
        image={portfolio.seo.previewImage.src}
        noIndex
      />
      <main id="main-content" tabIndex={-1} className="border-b border-border">
        <PageContainer className="grid min-h-[75svh] items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="flex flex-col items-start gap-7 lg:col-span-7">
            <p className="eyebrow text-primary">{t("site:notFound.eyebrow")}</p>
            <div className="flex flex-col gap-5">
              <h1 className="section-title">{title}</h1>
              <p className="prose-measure">{description}</p>
            </div>
            <Button asChild size="lg">
              <Link to={`/${locale}`}>
                <ArrowLeftIcon
                  data-icon="inline-start"
                  className="rtl:rotate-180"
                  aria-hidden="true"
                />
                {t("common:actions.backHome")}
              </Link>
            </Button>
          </div>
          <div
            className="grid aspect-[4/3] place-items-center rounded-3xl border border-border bg-card lg:col-span-5"
            aria-hidden="true"
          >
            <span className="font-mono text-7xl font-semibold text-primary sm:text-8xl">
              404
            </span>
          </div>
        </PageContainer>
      </main>
    </>
  )
}
