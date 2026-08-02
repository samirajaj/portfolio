import { useEffect, useLayoutEffect, useRef } from "react"
import {
  Outlet,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "react-router"
import { DirectionProvider } from "radix-ui/direction"

import { ScrollTrigger } from "@/lib/gsap/gsap"
import { i18n } from "@/lib/i18n/i18n"
import { SiteLayout } from "@/layouts/site-layout"
import {
  localeLoader,
  persistLanguagePreference,
  type LocaleLoaderData,
} from "@/routes/locale-routing"

export type LocaleOutletContext = LocaleLoaderData

function getHashTarget(hash: string) {
  if (!hash) {
    return null
  }

  const encodedId = hash.slice(1)

  try {
    return document.getElementById(decodeURIComponent(encodedId))
  } catch {
    return document.getElementById(encodedId)
  }
}

export function LocaleLayout() {
  const localeData = useLoaderData<typeof localeLoader>()
  const { locale, direction } = localeData
  const location = useLocation()
  const previousLocation = useRef(`${location.pathname}${location.hash}`)

  useLayoutEffect(() => {
    const documentElement = document.documentElement
    let layoutFrame = 0
    let refreshFrame = 0
    let cancelled = false

    documentElement.lang = locale
    documentElement.dir = direction
    persistLanguagePreference(locale)

    const scheduleRefresh = () => {
      if (cancelled) {
        return
      }

      layoutFrame = window.requestAnimationFrame(() => {
        void document.fonts.ready.then(() => {
          if (cancelled) {
            return
          }

          refreshFrame = window.requestAnimationFrame(() => {
            ScrollTrigger.refresh()
          })
        })
      })
    }

    void i18n.changeLanguage(locale).then(scheduleRefresh, scheduleRefresh)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(layoutFrame)
      window.cancelAnimationFrame(refreshFrame)
    }
  }, [locale, direction])

  useEffect(() => {
    const locationSignature = `${location.pathname}${location.hash}`

    if (previousLocation.current === locationSignature) {
      return
    }

    previousLocation.current = locationSignature
    const focusFrame = window.requestAnimationFrame(() => {
      const hashTarget = getHashTarget(location.hash)
      const focusTarget = hashTarget ?? document.getElementById("main-content")

      if (hashTarget && !hashTarget.hasAttribute("tabindex")) {
        hashTarget.setAttribute("tabindex", "-1")
      }

      focusTarget?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(focusFrame)
  }, [location.hash, location.pathname])

  return (
    <DirectionProvider dir={direction}>
      <SiteLayout locale={locale} direction={direction}>
        <Outlet context={localeData} />
      </SiteLayout>
      <ScrollRestoration />
    </DirectionProvider>
  )
}
