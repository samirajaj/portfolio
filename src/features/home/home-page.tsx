import { useMemo } from "react"
import { useOutletContext } from "react-router"

import { DocumentMeta } from "@/components/common/document-meta"
import { portfolioMedia } from "@/content/portfolio-media"
import { getLocalizedPortfolio } from "@/content/portfolio.selectors"
import { AboutSection } from "@/features/home/about-section"
import { ApproachSection } from "@/features/home/approach-section"
import { CapabilitiesSection } from "@/features/home/capabilities-section"
import { ContactSection } from "@/features/home/contact-section"
import { HeroSection } from "@/features/home/hero-section"
import { SelectedWorkSection } from "@/features/home/selected-work-section"
import { ServicesSection } from "@/features/home/services-section"
import type { LocaleOutletContext } from "@/layouts/locale-layout"

export function HomePage() {
  const { locale, direction } = useOutletContext<LocaleOutletContext>()
  const portfolio = useMemo(() => getLocalizedPortfolio(locale), [locale])
  const featuredProjects = portfolio.projects.filter(
    (project) => project.featured
  )

  return (
    <main id="main-content" tabIndex={-1}>
      <DocumentMeta
        title={portfolio.seo.defaultTitle}
        description={portfolio.seo.description}
        locale={locale}
        siteUrl={portfolio.seo.siteUrl}
        image={portfolioMedia.brand.socialPreview.src}
      />
      <HeroSection
        locale={locale}
        direction={direction}
        identity={portfolio.identity}
        hero={portfolio.hero}
        contact={portfolio.contact}
        cv={portfolio.cv}
        avatar={portfolioMedia.profile.avatar}
      />
      <SelectedWorkSection locale={locale} projects={featuredProjects} />
      <CapabilitiesSection
        locale={locale}
        groups={portfolio.skillGroups}
        projects={featuredProjects}
      />
      <ServicesSection services={portfolio.services} />
      <ApproachSection steps={portfolio.process} />
      <AboutSection
        about={portfolio.about}
        experience={portfolio.experience}
        education={portfolio.education}
      />
      <ContactSection contact={portfolio.contact} />
    </main>
  )
}
