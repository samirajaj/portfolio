import { useRef } from "react"
import {
  ArrowDownIcon,
  BriefcaseBusinessIcon,
  DownloadIcon,
  GitForkIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

import { ContactLink } from "@/components/common/contact-link"
import { PageContainer } from "@/components/common/page-container"
import { Button } from "@/components/ui/button"
import { SystemTraceVisual } from "@/components/visual/system-trace-visual"
import type {
  LocalizedPortfolioData,
  MediaAsset,
  SupportedLanguage,
} from "@/content/portfolio.types"
import { getEmailHref, getPhoneHref } from "@/lib/contact-links"
import { gsap, useGSAP } from "@/lib/gsap/gsap"
import { motionQueries } from "@/lib/gsap/motion-preferences"
import { motionTokens } from "@/lib/gsap/motion-tokens"

type HeroSectionProps = {
  locale: SupportedLanguage
  direction: "ltr" | "rtl"
  identity: LocalizedPortfolioData["identity"]
  hero: LocalizedPortfolioData["hero"]
  contact: LocalizedPortfolioData["contact"]
  cv: LocalizedPortfolioData["cv"]
  avatar: MediaAsset | null
}

export function HeroSection({
  locale,
  direction,
  identity,
  hero,
  contact,
  cv,
  avatar,
}: HeroSectionProps) {
  const { t } = useTranslation(["common", "site"])
  const rootRef = useRef<HTMLElement>(null)
  const linkedin = contact.links.find((link) => link.id === "linkedin")
  const github = contact.links.find((link) => link.id === "github")

  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add(
        {
          reduceMotion: motionQueries.reduced,
          fullMotion: motionQueries.full,
        },
        (context) => {
          const { reduceMotion } = context.conditions as Record<string, boolean>

          if (reduceMotion) {
            gsap.set("[data-hero-reveal]", { autoAlpha: 1, y: 0 })
            return
          }

          gsap
            .timeline({
              defaults: {
                duration: motionTokens.duration.reveal,
                ease: motionTokens.ease.enter,
              },
            })
            .from("[data-hero-eyebrow]", {
              autoAlpha: 0,
              y: motionTokens.distance.small,
            })
            .from(
              "[data-hero-title]",
              { autoAlpha: 0, y: motionTokens.distance.medium },
              "-=0.5"
            )
            .from(
              "[data-hero-support]",
              {
                autoAlpha: 0,
                y: motionTokens.distance.small,
                stagger: motionTokens.stagger.tight,
              },
              "-=0.48"
            )
            .from(
              "[data-hero-visual]",
              {
                autoAlpha: 0,
                y: motionTokens.distance.medium,
                scale: 0.985,
              },
              0.18
            )
            .from(
              "[data-contact-signal]",
              {
                autoAlpha: 0,
                y: motionTokens.distance.small,
                stagger: motionTokens.stagger.tight,
              },
              "-=0.35"
            )
        }
      )

      return () => media.revert()
    },
    { scope: rootRef }
  )

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden pt-[calc(var(--header-height)+clamp(3rem,7vw,7rem))]"
    >
      <div
        className="technical-grid absolute inset-x-0 top-0 -z-10 h-[72%] opacity-45"
        aria-hidden="true"
      />
      <PageContainer>
        <div className="grid items-start gap-12 pb-14 lg:grid-cols-12 lg:gap-8 lg:pb-20">
          <div
            data-hero-reveal
            className="flex min-w-0 flex-col gap-7 lg:col-span-7 lg:pt-8"
          >
            <div
              data-hero-eyebrow
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span className="eyebrow text-signal">{hero.eyebrow}</span>
              <span className="hidden h-px w-12 bg-border sm:block" />
              <span className="text-sm text-muted-foreground">
                {identity.name}
              </span>
            </div>

            <h1 data-hero-title className="hero-display">
              {hero.headline}
            </h1>

            <p data-hero-support className="prose-measure max-w-[58ch]">
              {hero.description}
            </p>

            <div
              data-hero-support
              className="flex flex-wrap items-center gap-3"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-response opacity-55 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-response" />
              </span>
              <span className="text-sm font-medium">{hero.availability}</span>
            </div>

            <div data-hero-support className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-12 px-5">
                <Link to={`/${locale}#work`}>
                  {t("actions.exploreProjects")}
                  <ArrowDownIcon data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-12 px-5"
              >
                <a href={getEmailHref(contact.email)}>
                  <MailIcon data-icon="inline-start" aria-hidden="true" />
                  {t("actions.sendEmail")}
                </a>
              </Button>
              {cv.available && cv.filePath && cv.fileName ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-12 px-5"
                >
                  <a href={cv.filePath} download={cv.fileName}>
                    <DownloadIcon data-icon="inline-start" aria-hidden="true" />
                    {t("actions.downloadCv")}
                  </a>
                </Button>
              ) : null}
              {linkedin ? (
                <Button
                  asChild
                  size="icon-lg"
                  variant="ghost"
                  className="size-12"
                >
                  <a
                    href={linkedin.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={t("actions.openLinkedIn")}
                  >
                    <BriefcaseBusinessIcon aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
              {github ? (
                <Button
                  asChild
                  size="icon-lg"
                  variant="ghost"
                  className="size-12"
                >
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={t("actions.openGitHub")}
                  >
                    <GitForkIcon aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
            </div>

            <div
              data-hero-support
              className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2"
            >
              <div className="flex flex-col gap-3">
                <p className="eyebrow text-muted-foreground">
                  {t("site:hero.stackLabel")}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  {hero.stackHighlights.map((technology) => (
                    <li key={technology}>
                      <bdi dir="ltr">{technology}</bdi>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {hero.proofPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-response" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div data-hero-visual className="min-w-0 lg:col-span-5 lg:pt-2">
            <div className="flex flex-col gap-5">
              {avatar ? (
                <div className="project-stage aspect-square overflow-hidden">
                  <img
                    src={avatar.src}
                    width={avatar.width}
                    height={avatar.height}
                    alt={identity.avatarAlt}
                    fetchPriority="high"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </div>
              ) : null}
              <SystemTraceVisual
                direction={direction}
                label={t("site:hero.systemLabel")}
                description={t("site:hero.systemDescription")}
                flow={{
                  request: t("labels.request"),
                  response: t("labels.response"),
                  interface: t("site:hero.flow.interface"),
                  react: t("site:hero.flow.react"),
                  api: t("site:hero.flow.api"),
                  auth: t("site:hero.flow.auth"),
                  logic: t("site:hero.flow.logic"),
                  database: t("site:hero.flow.database"),
                  verified: t("site:hero.flow.verified"),
                }}
              />
            </div>
          </div>
        </div>

        <div className="ledger-grid grid grid-cols-2 border-s border-t border-border lg:grid-cols-4">
          <div data-contact-signal>
            <ContactLink
              href={getEmailHref(contact.email)}
              label={t("labels.email")}
              value={contact.email}
              accessibleLabel={t("actions.sendEmail")}
              icon={MailIcon}
              variant="ledger"
            />
          </div>
          {linkedin ? (
            <div data-contact-signal>
              <ContactLink
                href={linkedin.url}
                label={t("labels.linkedin")}
                value={linkedin.url}
                accessibleLabel={t("actions.openLinkedIn")}
                icon={BriefcaseBusinessIcon}
                variant="ledger"
                external
              />
            </div>
          ) : null}
          {github ? (
            <div data-contact-signal>
              <ContactLink
                href={github.url}
                label={t("labels.github")}
                value={github.url}
                accessibleLabel={t("actions.openGitHub")}
                icon={GitForkIcon}
                variant="ledger"
                external
              />
            </div>
          ) : null}
          <div data-contact-signal>
            <ContactLink
              href={getPhoneHref(contact.phone)}
              label={t("labels.phone")}
              value={contact.phone}
              accessibleLabel={t("actions.callPhone")}
              icon={PhoneIcon}
              variant="ledger"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
