import { LanguagesIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router"

import { Button } from "@/components/ui/button"
import type { SupportedLanguage } from "@/content/portfolio.types"
import {
  getLocalizedLocation,
  persistLanguagePreference,
} from "@/routes/locale-routing"

type LanguageSwitcherProps = {
  locale: SupportedLanguage
  onNavigate?: () => void
}

export function LanguageSwitcher({
  locale,
  onNavigate,
}: LanguageSwitcherProps) {
  const { t } = useTranslation("common")
  const location = useLocation()
  const nextLocale: SupportedLanguage = locale === "en" ? "ar" : "en"
  const nextLanguageLabel =
    nextLocale === "ar" ? t("labels.arabic") : t("labels.english")

  return (
    <Button asChild variant="outline" className="min-h-11 px-3">
      <Link
        to={getLocalizedLocation(location, nextLocale)}
        preventScrollReset
        onClick={() => {
          persistLanguagePreference(nextLocale)
          onNavigate?.()
        }}
        lang={nextLocale}
        hrefLang={nextLocale}
        aria-label={t("actions.switchLanguage", {
          language: nextLanguageLabel,
        })}
      >
        <LanguagesIcon data-icon="inline-start" aria-hidden="true" />
        <span>{nextLanguageLabel}</span>
      </Link>
    </Button>
  )
}
