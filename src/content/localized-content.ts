import type {
  LocalizedText,
  ResolveLocalized,
  SupportedLanguage,
} from "./portfolio.types"

export function localizedText(en: string, ar: string): LocalizedText {
  return { en, ar }
}

export function isLocalizedText(value: unknown): value is LocalizedText {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false
  }

  const candidate = value as Record<string, unknown>
  const keys = Object.keys(candidate)

  return (
    keys.length === 2 &&
    keys.every((key) => key === "en" || key === "ar") &&
    typeof candidate.en === "string" &&
    typeof candidate.ar === "string"
  )
}

export function resolveLocalizedText(
  value: LocalizedText,
  language: SupportedLanguage
): string {
  return value[language]
}

export function resolveLocalizedContent<T>(
  value: T,
  language: SupportedLanguage
): ResolveLocalized<T> {
  if (isLocalizedText(value)) {
    return resolveLocalizedText(value, language) as ResolveLocalized<T>
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      resolveLocalizedContent(item, language)
    ) as ResolveLocalized<T>
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        resolveLocalizedContent(item, language),
      ])
    ) as ResolveLocalized<T>
  }

  return value as ResolveLocalized<T>
}
