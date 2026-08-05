import type { SupportedLanguage } from "@/content/portfolio.types"

export function formatMonthYear(value: string, locale: SupportedLanguage) {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T00:00:00Z`))
}

export function formatYear(value: string, locale: SupportedLanguage) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T00:00:00Z`))
}
