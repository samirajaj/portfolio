import {
  ArrowDownIcon,
  BriefcaseBusinessIcon,
  DownloadIcon,
  GitForkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import type { LocalizedPortfolioData } from "@/content/portfolio.types"
import { HeroAvatar } from "@/features/home/hero-avatar"
import { gsap, useGSAP } from "@/lib/gsap/gsap"

type HeroSectionProps = Pick<
  LocalizedPortfolioData,
  "personal" | "availability" | "socialLinks" | "resume"
>

export function HeroSection({
  personal,
  availability,
  socialLinks,
  resume,
}: HeroSectionProps) {
  const { t } = useTranslation(["site", "common"])
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
        timeline
          .from("[data-hero-line]", {
            yPercent: 105,
            duration: 0.72,
            stagger: 0.08,
          })
          .from(
            "[data-hero-detail]",
            { autoAlpha: 0, y: 16, duration: 0.45, stagger: 0.05 },
            "-=0.34"
          )
          .from(
            "[data-hero-avatar]",
            {
              autoAlpha: 0,
              scale: 0.965,
              duration: 0.72,
              ease: "power3.out",
            },
            "-=0.62"
          )
      })
      return () => media.revert()
    },
    { scope: root }
  )

  return (
    <section ref={root} id="hero" className="hero-section section-shell">
      <div className="page-container hero-composition">
        <div className="hero-primary-band">
          <div className="hero-statement">
            <div data-hero-detail className="hero-identity-copy">
              <p className="eyebrow text-primary">{personal.fullName}</p>
              <p>{personal.professionalTitle}</p>
            </div>
            <h1 className="hero-display">
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  {personal.marketingStatement}
                </span>
              </span>
            </h1>
          </div>

          <div data-hero-avatar className="hero-avatar-column">
            <HeroAvatar avatar={personal.avatar} />
          </div>
        </div>

        <div className="hero-supporting-grid">
          <div data-hero-detail className="hero-introduction">
            <p>{personal.shortIntroduction}</p>
            <div className="hero-context-row">
              <span>
                <MapPinIcon aria-hidden="true" />
                {personal.location}
              </span>
              {availability ? (
                <span>
                  <span className="availability-signal" aria-hidden="true" />
                  {availability.label}
                </span>
              ) : null}
            </div>
          </div>

          <div data-hero-detail className="hero-actions">
            <div className="hero-primary-actions">
              <Button asChild size="lg">
                <a href={resume.file} download={resume.downloadName}>
                  <DownloadIcon data-icon="inline-start" aria-hidden="true" />
                  {t("common:actions.downloadCv")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={socialLinks.email.href}>
                  <MailIcon data-icon="inline-start" aria-hidden="true" />
                  {t("common:actions.contactMe")}
                </a>
              </Button>
            </div>
            <div className="hero-social-actions">
              {socialLinks.phone ? (
                <Button asChild variant="ghost" size="icon-lg">
                  <a
                    href={socialLinks.phone.href}
                    aria-label={socialLinks.phone.ariaLabel}
                  >
                    <PhoneIcon aria-hidden="true" />
                  </a>
                </Button>
              ) : null}
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
      </div>
      <a
        href="#experience"
        className="absolute start-1/2 bottom-6 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={t("common:actions.explorePortfolio")}
      >
        <ArrowDownIcon aria-hidden="true" />
      </a>
    </section>
  )
}
