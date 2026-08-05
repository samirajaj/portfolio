import { useMemo } from "react"
import { useOutletContext } from "react-router"

import { DocumentMeta } from "@/components/common/document-meta"
import { getLocalizedPortfolio } from "@/content/portfolio.selectors"
import { CapabilityStrip } from "@/features/home/capability-strip"
import { ContactSection } from "@/features/home/contact-section"
import { EducationSection } from "@/features/home/education-section"
import { ExperienceSection } from "@/features/home/experience-section"
import { HeroSection } from "@/features/home/hero-section"
import { ProjectsJourney } from "@/features/home/projects-journey"
import type { LocaleOutletContext } from "@/layouts/locale-layout"

export function HomePage() {
  const { locale } = useOutletContext<LocaleOutletContext>()
  const portfolio = useMemo(() => getLocalizedPortfolio(locale), [locale])

  return (
    <main id="main-content" tabIndex={-1}>
      <DocumentMeta
        title={portfolio.seo.title}
        description={portfolio.seo.description}
        locale={locale}
        siteUrl={portfolio.seo.siteUrl}
        image={portfolio.seo.previewImage.src}
      />
      <HeroSection
        personal={portfolio.personal}
        availability={portfolio.availability}
        socialLinks={portfolio.socialLinks}
        resume={portfolio.resume}
      />
      <CapabilityStrip capabilities={portfolio.capabilities} />
      <ExperienceSection experience={portfolio.experience} locale={locale} />
      <EducationSection education={portfolio.education} locale={locale} />
      <ProjectsJourney projects={portfolio.projects} locale={locale} />
      <ContactSection
        personal={portfolio.personal}
        socialLinks={portfolio.socialLinks}
        resume={portfolio.resume}
      />
    </main>
  )
}
