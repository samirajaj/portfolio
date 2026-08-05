import { useEffect, useState } from "react"
import {
  BriefcaseBusinessIcon,
  GitForkIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  XIcon,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

import { LanguageSwitcher } from "@/components/common/language-switcher"
import { ThemeSwitcher } from "@/components/common/theme-switcher"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type {
  LocalizedPortfolioData,
  MediaAsset,
  SupportedLanguage,
} from "@/content/portfolio.types"
import { getEmailHref, getPhoneHref } from "@/lib/contact-links"

type SiteHeaderProps = {
  locale: SupportedLanguage
  direction: "ltr" | "rtl"
  identity: LocalizedPortfolioData["identity"]
  contact: LocalizedPortfolioData["contact"]
  logo: MediaAsset
}

const navItems = ["work", "expertise", "approach", "about", "contact"] as const

export function SiteHeader({
  locale,
  direction,
  identity,
  contact,
  logo,
}: SiteHeaderProps) {
  const { t } = useTranslation(["site", "common"])
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const github = contact.links.find((link) => link.id === "github")
  const linkedin = contact.links.find((link) => link.id === "linkedin")
  const homePath = `/${locale}`

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className="site-header-surface fixed inset-x-0 top-0 z-40 border-b"
      data-scrolled={scrolled}
    >
      <div className="page-container flex h-(--header-height) items-center justify-between gap-4">
        <Link
          to={homePath}
          className="group flex min-h-11 items-center gap-3 font-medium"
          aria-label={identity.name}
        >
          <img
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt=""
            className="size-9"
          />
          <span className="hidden text-sm sm:inline">{identity.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={t("header.mobileTitle")}
        >
          {navItems.map((item) => (
            <Button
              key={item}
              asChild
              variant="ghost"
              className="min-h-11 px-3"
            >
              <Link to={`${homePath}#${item}`}>{t(`nav.${item}`)}</Link>
            </Button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher />
          {linkedin ? (
            <Button asChild variant="ghost" size="icon" className="size-11">
              <a
                href={linkedin.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t("common:actions.openLinkedIn")}
              >
                <BriefcaseBusinessIcon aria-hidden="true" />
              </a>
            </Button>
          ) : null}
          {github ? (
            <Button asChild variant="ghost" size="icon" className="size-11">
              <a
                href={github.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t("common:actions.openGitHub")}
              >
                <GitForkIcon aria-hidden="true" />
              </a>
            </Button>
          ) : null}
          <Button asChild className="min-h-11 px-4">
            <a
              href={getEmailHref(contact.email)}
              aria-label={t("common:actions.sendEmail")}
            >
              <MailIcon data-icon="inline-start" aria-hidden="true" />
              {t("nav.contact")}
            </a>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-11"
                aria-label={t("common:actions.openMenu")}
              >
                <MenuIcon aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={direction === "rtl" ? "left" : "right"}
              showCloseButton={false}
              className="data-[side=left]:w-[min(90vw,24rem)] data-[side=right]:w-[min(90vw,24rem)]"
            >
              <SheetHeader className="border-b border-border pe-14 text-start">
                <SheetTitle>{t("header.mobileTitle")}</SheetTitle>
                <SheetDescription>
                  {t("header.mobileDescription")}
                </SheetDescription>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute end-3 top-3 size-11"
                    aria-label={t("common:actions.closeMenu")}
                  >
                    <XIcon aria-hidden="true" />
                  </Button>
                </SheetClose>
              </SheetHeader>

              <nav
                className="flex flex-col gap-1 px-4"
                aria-label={t("header.mobileTitle")}
              >
                {navItems.map((item, index) => (
                  <SheetClose key={item} asChild>
                    <Link
                      to={`${homePath}#${item}`}
                      className="flex min-h-12 items-center justify-between border-b border-border py-3 text-lg font-medium"
                    >
                      <span>{t(`nav.${item}`)}</span>
                      <span
                        className="font-mono text-xs text-muted-foreground"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
                <LanguageSwitcher
                  locale={locale}
                  onNavigate={() => setMenuOpen(false)}
                />
                <ThemeSwitcher showLabel />
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button asChild className="min-h-11">
                    <a href={getEmailHref(contact.email)}>
                      <MailIcon data-icon="inline-start" aria-hidden="true" />
                      {t("common:labels.email")}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="min-h-11">
                    <a href={getPhoneHref(contact.phone)}>
                      <PhoneIcon data-icon="inline-start" aria-hidden="true" />
                      {t("common:labels.phone")}
                    </a>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {linkedin ? (
                    <Button asChild variant="outline" className="min-h-11">
                      <a
                        href={linkedin.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <BriefcaseBusinessIcon
                          data-icon="inline-start"
                          aria-hidden="true"
                        />
                        {t("common:labels.linkedin")}
                      </a>
                    </Button>
                  ) : null}
                  {github ? (
                    <Button asChild variant="outline" className="min-h-11">
                      <a
                        href={github.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <GitForkIcon
                          data-icon="inline-start"
                          aria-hidden="true"
                        />
                        {t("common:labels.github")}
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
