import {
  ArrowDownIcon,
  BriefcaseBusinessIcon,
  DownloadIcon,
  GitForkIcon,
  MailIcon,
  MapPinIcon,
} from "lucide-react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import type { LocalizedPortfolioData } from "@/content/portfolio.types"
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
  const portrait = useRef<HTMLDivElement>(null)

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
            portrait.current,
            { autoAlpha: 0, scale: 0.96, duration: 0.72 },
            "-=0.62"
          )

        if (portrait.current) {
          gsap.to(portrait.current, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          })
        }
      })
      return () => media.revert()
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="hero"
      className="hero-section section-shell min-h-[calc(100svh-3.5rem)]"
    >
      <div className="page-container relative z-10 grid items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col items-start gap-7 lg:col-span-7">
          {availability ? (
            <div
              data-hero-detail
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/75 px-3 py-2 text-sm backdrop-blur"
            >
              <span
                className="size-2 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span>{availability.label}</span>
            </div>
          ) : null}
          <div className="flex flex-col gap-3">
            <p data-hero-detail className="eyebrow text-primary">
              {personal.fullName}
            </p>
            <h1 className="hero-display">
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  {personal.marketingStatement}
                </span>
              </span>
            </h1>
          </div>
          <p
            data-hero-detail
            className="max-w-2xl text-lg leading-8 text-muted-foreground"
          >
            {personal.shortIntroduction}
          </p>
          <div
            data-hero-detail
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPinIcon aria-hidden="true" />
            <span>{personal.location}</span>
          </div>
          <div data-hero-detail className="flex flex-wrap gap-2">
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

        <div className="lg:col-span-5">
          <div
            ref={portrait}
            className="portrait-frame relative mx-auto max-w-md"
          >
            <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-primary/30" />
            <img
              src={personal.avatar.src}
              alt={personal.avatar.alt}
              width={personal.avatar.width}
              height={personal.avatar.height}
              fetchPriority="high"
              className="aspect-square w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/20 bg-background/80 p-4 backdrop-blur">
              <p className="text-sm font-semibold">
                {personal.professionalTitle}
              </p>
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
