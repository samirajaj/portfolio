import type { Location, LoaderFunctionArgs, Path } from "react-router"
import { replace } from "react-router"

import type { SupportedLanguage } from "@/content/portfolio.types"

export type { SupportedLanguage } from "@/content/portfolio.types"

export const supportedLanguages = [
  "en",
  "ar",
] as const satisfies readonly SupportedLanguage[]
export const defaultLanguage: SupportedLanguage = "en"
export const languageCookieName = "portfolio-language"

const languageCookieMaxAge = 60 * 60 * 24 * 365

export type TextDirection = "ltr" | "rtl"

export type LocaleLoaderData = Readonly<{
  locale: SupportedLanguage
  direction: TextDirection
}>

type LocalizableLocation = Pick<Location, "pathname" | "search" | "hash">

function readCookie(name: string) {
  if (typeof document === "undefined") {
    return null
  }

  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))

  if (!cookie) {
    return null
  }

  try {
    return decodeURIComponent(cookie.slice(name.length + 1))
  } catch {
    return null
  }
}

function getRequestHash(url: URL) {
  if (url.hash) {
    return url.hash
  }

  if (typeof window !== "undefined") {
    return window.location.hash
  }

  return ""
}

function toRedirectTarget(url: URL, locale: SupportedLanguage) {
  return `${replaceLocaleSegment(url.pathname, locale)}${url.search}${getRequestHash(url)}`
}

export function normalizeSupportedLanguage(
  language: string | null | undefined
): SupportedLanguage | null {
  if (!language) {
    return null
  }

  const primaryLanguage = language.trim().toLowerCase().split(/[-_]/, 1)[0]

  return supportedLanguages.includes(primaryLanguage as SupportedLanguage)
    ? (primaryLanguage as SupportedLanguage)
    : null
}

export function getTextDirection(language: SupportedLanguage): TextDirection {
  return language === "ar" ? "rtl" : "ltr"
}

export function resolvePreferredLanguage(): SupportedLanguage {
  const savedLanguage = normalizeSupportedLanguage(
    readCookie(languageCookieName)
  )

  if (savedLanguage) {
    return savedLanguage
  }

  if (typeof navigator !== "undefined") {
    const browserLanguages =
      navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language]

    for (const browserLanguage of browserLanguages) {
      const supportedLanguage = normalizeSupportedLanguage(browserLanguage)

      if (supportedLanguage) {
        return supportedLanguage
      }
    }
  }

  return defaultLanguage
}

export function persistLanguagePreference(language: SupportedLanguage) {
  if (typeof document === "undefined") {
    return
  }

  const secureAttribute =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : ""

  document.cookie = `${languageCookieName}=${encodeURIComponent(language)}; Path=/; Max-Age=${languageCookieMaxAge}; SameSite=Lax${secureAttribute}`
}

export function replaceLocaleSegment(
  pathname: string,
  language: SupportedLanguage
) {
  const normalizedPathname = pathname.startsWith("/")
    ? pathname
    : `/${pathname}`
  const segments = normalizedPathname.split("/")

  segments[1] = language

  return segments.join("/") || `/${language}`
}

export function getLocalizedLocation(
  location: LocalizableLocation,
  language: SupportedLanguage
): Path {
  return {
    pathname: replaceLocaleSegment(location.pathname, language),
    search: location.search,
    hash: location.hash,
  }
}

export function rootLocaleRedirectLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)

  throw replace(toRedirectTarget(url, resolvePreferredLanguage()))
}

export function localeLoader({ params, request }: LoaderFunctionArgs) {
  const requestedLocale = params.locale
  const locale = normalizeSupportedLanguage(requestedLocale)
  const url = new URL(request.url)

  if (!locale) {
    throw replace(toRedirectTarget(url, defaultLanguage))
  }

  if (requestedLocale !== locale) {
    throw replace(toRedirectTarget(url, locale))
  }

  return {
    locale,
    direction: getTextDirection(locale),
  } satisfies LocaleLoaderData
}
