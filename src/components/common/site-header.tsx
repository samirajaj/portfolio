import { MenuIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { LanguageSwitcher } from "@/components/common/language-switcher"
import { ThemeSwitcher } from "@/components/common/theme-switcher"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type {
  LocalizedPortfolioData,
  SupportedLanguage,
} from "@/content/portfolio.types"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"

const sections = [
  "hero",
  "experience",
  "education",
  "projects",
  "contact",
] as const

type SiteHeaderProps = {
  locale: SupportedLanguage
  direction: "ltr" | "rtl"
  personal: LocalizedPortfolioData["personal"]
}

export function SiteHeader({ locale, direction, personal }: SiteHeaderProps) {
  const { t } = useTranslation(["site", "common"])
  const activeSection = useActiveSection(sections)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrolledState = () => {
      const nextScrolled = window.scrollY > 24
      setIsScrolled((current) =>
        current === nextScrolled ? current : nextScrolled
      )
    }

    updateScrolledState()
    window.addEventListener("scroll", updateScrolledState, { passive: true })
    return () => window.removeEventListener("scroll", updateScrolledState)
  }, [])

  const identity = (
    <a href="#hero" className="site-identity" aria-label={personal.fullName}>
      <img
        src={personal.logo.src}
        width={personal.logo.width}
        height={personal.logo.height}
        alt={personal.logo.alt}
      />
      <span>
        <strong>{personal.fullName}</strong>
        <small>{personal.professionalTitle}</small>
      </span>
    </a>
  )

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <div className="page-container site-header-inner">
        {identity}

        <nav
          className="site-desktop-nav"
          aria-label={t("site:header.navigation")}
        >
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "site-nav-link",
                activeSection === id && "is-active"
              )}
              aria-current={activeSection === id ? "location" : undefined}
            >
              {t(`site:nav.${id}`)}
            </a>
          ))}
        </nav>

        <div className="site-header-controls">
          <div className="site-header-language">
            <LanguageSwitcher locale={locale} />
          </div>
          <ThemeSwitcher />
        </div>

        <div className="site-mobile-menu">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11"
                aria-label={t("common:actions.openMenu")}
              >
                <MenuIcon aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={direction === "rtl" ? "right" : "left"}
              showCloseButton
              closeLabel={t("common:actions.closeMenu")}
              className="mobile-nav-sheet"
            >
              <SheetHeader className="mobile-nav-header">
                <SheetTitle>{t("site:header.mobileTitle")}</SheetTitle>
                <SheetDescription>
                  {t("site:header.mobileDescription")}
                </SheetDescription>
              </SheetHeader>

              <nav
                className="mobile-nav-links"
                aria-label={t("site:header.navigation")}
              >
                {sections.map((id, index) => (
                  <SheetClose key={id} asChild>
                    <a
                      href={`#${id}`}
                      className={cn(
                        "mobile-nav-link",
                        activeSection === id && "is-active"
                      )}
                      aria-current={
                        activeSection === id ? "location" : undefined
                      }
                    >
                      <span aria-hidden="true">0{index + 1}</span>
                      {t(`site:nav.${id}`)}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <SheetFooter className="mobile-nav-footer">
                <LanguageSwitcher locale={locale} />
                <ThemeSwitcher showLabel />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
