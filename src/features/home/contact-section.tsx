import {
  BriefcaseBusinessIcon,
  DownloadIcon,
  GitForkIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import type { LocalizedPortfolioData } from "@/content/portfolio.types"

type ContactSectionProps = Pick<
  LocalizedPortfolioData,
  "personal" | "socialLinks" | "resume"
>

export function ContactSection({
  personal,
  socialLinks,
  resume,
}: ContactSectionProps) {
  const { t } = useTranslation(["site", "common"])
  return (
    <section id="contact" className="contact-panel section-shell">
      <div className="page-container relative z-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow text-response">
            {t("site:sections.contact.eyebrow")}
          </p>
          <h2 className="mt-6 max-w-[13ch] text-5xl leading-none font-semibold tracking-tight text-balance sm:text-7xl rtl:leading-[1.15]">
            {t("site:sections.contact.title")}
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 opacity-75">
            {t("site:sections.contact.description")}
          </p>
          <a
            href={socialLinks.email.href}
            className="mt-10 block w-fit max-w-full border-b border-current pb-2 text-xl font-medium sm:text-3xl"
          >
            <bdi dir="ltr" className="break-all">
              {personal.email}
            </bdi>
          </a>
        </div>
        <div className="flex flex-col justify-end gap-3 lg:col-span-4">
          <Button asChild variant="secondary" size="lg">
            <a href={socialLinks.email.href}>
              <MailIcon data-icon="inline-start" aria-hidden="true" />
              {t("common:actions.sendEmail")}
            </a>
          </Button>
          {socialLinks.phone ? (
            <Button asChild variant="outline" size="lg">
              <a href={socialLinks.phone.href}>
                <PhoneIcon data-icon="inline-start" aria-hidden="true" />
                <bdi dir="ltr">{personal.phone}</bdi>
              </a>
            </Button>
          ) : null}
          <Button asChild variant="outline" size="lg">
            <a href={resume.file} download={resume.downloadName}>
              <DownloadIcon data-icon="inline-start" aria-hidden="true" />
              {t("common:actions.downloadCv")}
            </a>
          </Button>
          <div className="mt-2 flex gap-2">
            <Button asChild variant="ghost" size="icon-lg">
              <a
                href={socialLinks.github.href}
                target="_blank"
                rel="noreferrer"
                aria-label={socialLinks.github.ariaLabel}
              >
                <GitForkIcon aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon-lg">
              <a
                href={socialLinks.linkedin.href}
                target="_blank"
                rel="noreferrer"
                aria-label={socialLinks.linkedin.ariaLabel}
              >
                <BriefcaseBusinessIcon aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
