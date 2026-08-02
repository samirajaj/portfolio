import {
  BriefcaseBusinessIcon,
  GitForkIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react"
import { useTranslation } from "react-i18next"

import { ContactLink } from "@/components/common/contact-link"
import { PageContainer } from "@/components/common/page-container"
import type { LocalizedPortfolioData } from "@/content/portfolio.types"
import { getEmailHref, getPhoneHref } from "@/lib/contact-links"

type ContactSectionProps = {
  contact: LocalizedPortfolioData["contact"]
}

export function ContactSection({ contact }: ContactSectionProps) {
  const { t } = useTranslation(["site", "common", "contact"])
  const linkedin = contact.links.find((link) => link.id === "linkedin")
  const github = contact.links.find((link) => link.id === "github")

  return (
    <section id="contact" className="contact-panel section-shell">
      <PageContainer className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-7 lg:col-span-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-response">
                {t("site:sections.contact.index")}
              </span>
              <p className="eyebrow opacity-70">
                {t("site:sections.contact.eyebrow")}
              </p>
            </div>
            <h2 className="max-w-[14ch] text-5xl leading-[0.98] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl rtl:leading-[1.12] rtl:tracking-normal">
              {contact.headline}
            </h2>
            <p className="max-w-[58ch] text-lg leading-8 opacity-75">
              {contact.introduction}
            </p>
            <a
              href={getEmailHref(contact.email)}
              className="group mt-2 block w-fit max-w-full border-b border-current pb-2 text-2xl font-medium sm:text-4xl"
            >
              <bdi dir="ltr" className="break-all">
                {contact.email}
              </bdi>
            </a>
          </div>

          <div className="flex flex-col gap-7 lg:col-span-4 lg:justify-end">
            <div className="flex flex-col gap-3">
              <p className="eyebrow opacity-60">{t("contact:workLabel")}</p>
              <ul className="flex flex-col gap-2">
                {contact.workTypes.map((workType) => (
                  <li key={workType} className="flex items-start gap-3 text-sm">
                    <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-response" />
                    <span>{workType}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm leading-7 opacity-65">
              {t("contact:responseNote")}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ContactLink
            href={getEmailHref(contact.email)}
            label={t("common:labels.email")}
            accessibleLabel={t("common:actions.sendEmail")}
            icon={MailIcon}
            variant="compact"
          />
          <ContactLink
            href={getPhoneHref(contact.phone)}
            label={t("common:labels.phone")}
            accessibleLabel={t("common:actions.callPhone")}
            icon={PhoneIcon}
            variant="compact"
          />
          {linkedin ? (
            <ContactLink
              href={linkedin.url}
              label={t("common:labels.linkedin")}
              accessibleLabel={t("common:actions.openLinkedIn")}
              icon={BriefcaseBusinessIcon}
              variant="compact"
              external
            />
          ) : null}
          {github ? (
            <ContactLink
              href={github.url}
              label={t("common:labels.github")}
              accessibleLabel={t("common:actions.openGitHub")}
              icon={GitForkIcon}
              variant="compact"
              external
            />
          ) : null}
        </div>
      </PageContainer>
    </section>
  )
}
