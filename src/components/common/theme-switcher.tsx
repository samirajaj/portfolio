import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useTheme, type Theme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ThemeSwitcherProps = {
  showLabel?: boolean
}

const nextTheme: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
}

const themeIcon = {
  system: MonitorIcon,
  light: SunIcon,
  dark: MoonIcon,
} satisfies Record<Theme, typeof MonitorIcon>

export function ThemeSwitcher({ showLabel = false }: ThemeSwitcherProps) {
  const { t } = useTranslation("common")
  const { theme, setTheme } = useTheme()
  const targetTheme = nextTheme[theme]
  const Icon = themeIcon[theme]
  const accessibleLabel = t("actions.switchTheme", {
    theme: t(`themes.${targetTheme}`),
  })

  return (
    <Button
      type="button"
      variant="ghost"
      size={showLabel ? "default" : "icon"}
      className={cn("min-h-11", showLabel ? "justify-start" : "size-11")}
      onClick={() => setTheme(targetTheme)}
      aria-label={accessibleLabel}
      title={accessibleLabel}
    >
      <Icon data-icon="inline-start" aria-hidden="true" />
      {showLabel ? t(`themes.${theme}`) : null}
    </Button>
  )
}
