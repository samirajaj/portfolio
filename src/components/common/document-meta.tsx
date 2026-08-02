import { useEffect } from "react"

import type { SupportedLanguage } from "@/content/portfolio.types"
import { replaceLocaleSegment } from "@/routes/locale-routing"

type DocumentMetaProps = {
  title: string
  description: string
  locale: SupportedLanguage
  siteUrl: string
  image?: string
  noIndex?: boolean
}

function upsertMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement("meta")
    const [name, content] = attribute.split("=")
    element.setAttribute(name, content)
    document.head.appendChild(element)
  }

  element.content = value
}

function upsertLink(rel: string, href: string, hrefLang?: string) {
  const hrefLangSelector = hrefLang ? `[hreflang="${hrefLang}"]` : ""
  let element = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]${hrefLangSelector}`
  )

  if (!element) {
    element = document.createElement("link")
    element.rel = rel
    if (hrefLang) {
      element.hreflang = hrefLang
    }
    document.head.appendChild(element)
  }

  element.href = href
}

export function DocumentMeta({
  title,
  description,
  locale,
  siteUrl,
  image,
  noIndex = false,
}: DocumentMetaProps) {
  useEffect(() => {
    const currentPathname = window.location.pathname.replace(/\/+$/, "") || "/"
    const pathname = replaceLocaleSegment(currentPathname, locale)
    const canonicalUrl = new URL(pathname, siteUrl).toString()
    const englishUrl = new URL(
      replaceLocaleSegment(pathname, "en"),
      siteUrl
    ).toString()
    const arabicUrl = new URL(
      replaceLocaleSegment(pathname, "ar"),
      siteUrl
    ).toString()

    document.title = title
    upsertMeta('meta[name="description"]', "name=description", description)
    upsertMeta(
      'meta[name="robots"]',
      "name=robots",
      noIndex ? "noindex, nofollow" : "index, follow"
    )
    upsertMeta('meta[property="og:title"]', "property=og:title", title)
    upsertMeta(
      'meta[property="og:description"]',
      "property=og:description",
      description
    )
    upsertMeta('meta[property="og:url"]', "property=og:url", canonicalUrl)
    upsertMeta(
      'meta[property="og:locale"]',
      "property=og:locale",
      locale === "ar" ? "ar_SY" : "en_US"
    )
    upsertMeta('meta[name="twitter:title"]', "name=twitter:title", title)
    upsertMeta(
      'meta[name="twitter:description"]',
      "name=twitter:description",
      description
    )

    upsertLink("canonical", canonicalUrl)
    upsertLink("alternate", englishUrl, "en")
    upsertLink("alternate", arabicUrl, "ar")
    upsertLink("alternate", englishUrl, "x-default")

    if (image) {
      const absoluteImage = new URL(image, siteUrl).toString()
      upsertMeta(
        'meta[property="og:image"]',
        "property=og:image",
        absoluteImage
      )
      upsertMeta(
        'meta[name="twitter:image"]',
        "name=twitter:image",
        absoluteImage
      )
    }
  }, [description, image, locale, noIndex, siteUrl, title])

  return null
}
