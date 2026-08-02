import {
  ArrowUpIcon,
  BriefcaseBusinessIcon,
  GitForkIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react"
import { useTranslation } from "react-i18next"

import { ContactLink } from "@/components/common/contact-link"
import { LanguageSwitcher } from "@/components/common/language-switcher"
import type {
  LocalizedPortfolioData,
  SupportedLanguage,
} from "@/content/portfolio.types"
import { getEmailHref, getPhoneHref } from "@/lib/contact-links"

type SiteFooterProps = {
  locale: SupportedLanguage
  identity: LocalizedPortfolioData["identity"]
  contact: LocalizedPortfolioData["contact"]
}

export function SiteFooter({ locale, identity, contact }: SiteFooterProps) {
  const { t } = useTranslation(["site", "common"])
  const github = contact.links.find((link) => link.id === "github")
  const linkedin = contact.links.find((link) => link.id === "linkedin")
  const year = new Intl.NumberFormat(locale, { useGrouping: false }).format(
    new Date().getFullYear()
  )

  return (
    <footer className="border-t border-border bg-card">
      <div className="page-container py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-2 lg:col-span-4">
            <p className="text-xl font-semibold">{identity.name}</p>
            <p className="text-sm text-muted-foreground">
              {identity.professionalTitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4 lg:col-span-8">
            <ContactLink
              href={getEmailHref(contact.email)}
              label={t("common:labels.email")}
              accessibleLabel={t("common:actions.sendEmail")}
              icon={MailIcon}
              variant="footer"
            />
            <ContactLink
              href={getPhoneHref(contact.phone)}
              label={t("common:labels.phone")}
              accessibleLabel={t("common:actions.callPhone")}
              icon={PhoneIcon}
              variant="footer"
            />
            {linkedin ? (
              <ContactLink
                href={linkedin.url}
                label={t("common:labels.linkedin")}
                accessibleLabel={t("common:actions.openLinkedIn")}
                icon={BriefcaseBusinessIcon}
                variant="footer"
                external
              />
            ) : null}
            {github ? (
              <ContactLink
                href={github.url}
                label={t("common:labels.github")}
                accessibleLabel={t("common:actions.openGitHub")}
                icon={GitForkIcon}
                variant="footer"
                external
              />
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span>{t("footer.copyright", { year })}</span>
            <span>{t("footer.note")}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <a
              href="#top"
              className="contact-link flex min-h-11 items-center gap-2 rounded-lg px-3 text-foreground"
            >
              {t("common:actions.backToTop")}
              <ArrowUpIcon aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
