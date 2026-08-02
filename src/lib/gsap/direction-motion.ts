import type { SupportedLanguage } from "@/content/portfolio.types"

export type MotionDirection = "ltr" | "rtl"

export function getMotionDirection(
  language: SupportedLanguage
): MotionDirection {
  return language === "ar" ? "rtl" : "ltr"
}

export function getDirectionMultiplier(direction: MotionDirection) {
  return direction === "rtl" ? -1 : 1
}
