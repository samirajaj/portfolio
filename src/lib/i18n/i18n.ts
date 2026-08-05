import { createInstance, type ResourceKey } from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import {
  languageCookieName,
  normalizeSupportedLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from "@/routes/locale-routing"

export const translationNamespaces = ["common", "site"] as const

type TranslationNamespace = (typeof translationNamespaces)[number]

const resourceModules = import.meta.glob<ResourceKey>("/src/locales/*/*.json", {
  eager: true,
  import: "default",
})

function getNamespaceResource(
  language: SupportedLanguage,
  namespace: TranslationNamespace
) {
  const resourcePath = `/src/locales/${language}/${namespace}.json`
  const resource = resourceModules[resourcePath]

  if (!resource) {
    throw new Error(`Missing i18next resource: ${resourcePath}`)
  }

  return resource
}

const resources = Object.fromEntries(
  supportedLanguages.map((language) => [
    language,
    Object.fromEntries(
      translationNamespaces.map((namespace) => [
        namespace,
        getNamespaceResource(language, namespace),
      ])
    ),
  ])
)

export const i18n = createInstance()

i18n.use(LanguageDetector).use(initReactI18next)

void i18n.init({
  resources,
  supportedLngs: [...supportedLanguages],
  fallbackLng: "en",
  load: "languageOnly",
  cleanCode: true,
  lowerCaseLng: true,
  defaultNS: "common",
  fallbackNS: "common",
  ns: [...translationNamespaces],
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["path", "cookie", "navigator"],
    lookupFromPathIndex: 0,
    lookupCookie: languageCookieName,
    caches: [],
    convertDetectedLanguage: (language) =>
      normalizeSupportedLanguage(language) ?? language.toLowerCase(),
  },
  react: {
    useSuspense: false,
  },
})

export default i18n
