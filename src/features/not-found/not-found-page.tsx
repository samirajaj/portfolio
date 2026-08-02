import { ArrowLeftIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useOutletContext } from "react-router"

import { DocumentMeta } from "@/components/common/document-meta"
import { PageContainer } from "@/components/common/page-container"
import { Button } from "@/components/ui/button"
import { portfolioMedia } from "@/content/portfolio-media"
import { getLocalizedPortfolio } from "@/content/portfolio.selectors"
import type { LocaleOutletContext } from "@/layouts/locale-layout"

type NotFoundPageProps = {
  variant?: "route" | "project"
}

export function NotFoundPage({ variant = "route" }: NotFoundPageProps) {
  const { t } = useTranslation(["site", "common"])
  const { locale } = useOutletContext<LocaleOutletContext>()
  const portfolio = getLocalizedPortfolio(locale)
  const isProjectNotFound = variant === "project"
  const title = t(
    isProjectNotFound ? "site:notFound.projectTitle" : "site:notFound.title"
  )
  const description = t(
    isProjectNotFound
      ? "site:notFound.projectDescription"
      : "site:notFound.description"
  )
  const destination = isProjectNotFound ? `/${locale}#work` : `/${locale}`
  const action = t(
    isProjectNotFound
      ? "common:actions.exploreProjects"
      : "common:actions.backHome"
  )

  return (
    <>
      <DocumentMeta
        title={`${title} — ${portfolio.seo.siteName}`}
        description={description}
        locale={locale}
        siteUrl={portfolio.seo.siteUrl}
        image={portfolioMedia.brand.socialPreview.src}
        noIndex
      />

      <main
        id="main-content"
        tabIndex={-1}
        className="border-b border-border pt-28 sm:pt-36"
      >
        <PageContainer className="grid min-h-[70svh] items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="flex flex-col items-start gap-7 lg:col-span-7">
            <p className="eyebrow text-signal">{t("site:notFound.eyebrow")}</p>
            <div className="flex flex-col gap-5">
              <h1 className="section-title">{title}</h1>
              <p className="prose-measure">{description}</p>
            </div>
            <Button asChild size="lg" className="min-h-11 px-5">
              <Link to={destination}>
                <ArrowLeftIcon
                  data-icon="inline-start"
                  className="rtl:rotate-180"
                  aria-hidden="true"
                />
                {action}
              </Link>
            </Button>
          </div>

          <div
            className="technical-grid relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl border border-border bg-card lg:col-span-5"
            aria-hidden="true"
          >
            <div className="absolute inset-6 rounded-2xl border border-border" />
            <div className="absolute inset-x-12 top-1/2 h-px bg-border" />
            <div className="absolute inset-y-12 start-1/2 w-px bg-border" />
            <span className="relative font-mono text-7xl font-semibold text-signal sm:text-8xl">
              404
            </span>
          </div>
        </PageContainer>
      </main>
    </>
  )
}
