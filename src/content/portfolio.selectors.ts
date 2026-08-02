import { resolveLocalizedContent } from "./localized-content"
import { portfolioData } from "./portfolio.data"
import type {
  ContactLink,
  LocalizedPortfolioData,
  LocalizedPortfolioProject,
  PortfolioProject,
  SupportedLanguage,
} from "./portfolio.types"

export type ProjectNavigation = Readonly<{
  previous: PortfolioProject | null
  next: PortfolioProject | null
}>

export type LocalizedProjectNavigation = Readonly<{
  previous: LocalizedPortfolioProject | null
  next: LocalizedPortfolioProject | null
}>

export type ContactDetails = Readonly<{
  email: Readonly<{
    value: string
    href: string
  }>
  phone: Readonly<{
    value: string
    href: string
  }>
  links: readonly ContactLink[]
}>

const orderedProjects: readonly PortfolioProject[] = Object.freeze(
  [...portfolioData.projects].sort(
    (first, second) => first.order - second.order
  )
)

export function getProjects(): readonly PortfolioProject[] {
  return orderedProjects
}

export function getFeaturedProjects(): readonly PortfolioProject[] {
  return orderedProjects.filter((project) => project.featured)
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return orderedProjects.find((project) => project.slug === slug)
}

export function getProjectNavigation(slug: string): ProjectNavigation | null {
  const projectIndex = orderedProjects.findIndex(
    (project) => project.slug === slug
  )

  if (projectIndex === -1) {
    return null
  }

  return {
    previous:
      projectIndex > 0 ? (orderedProjects[projectIndex - 1] ?? null) : null,
    next:
      projectIndex < orderedProjects.length - 1
        ? (orderedProjects[projectIndex + 1] ?? null)
        : null,
  }
}

export function getLocalizedProject(
  project: PortfolioProject,
  language: SupportedLanguage
): LocalizedPortfolioProject {
  return resolveLocalizedContent(project, language)
}

export function getLocalizedProjects(
  language: SupportedLanguage
): readonly LocalizedPortfolioProject[] {
  return orderedProjects.map((project) =>
    getLocalizedProject(project, language)
  )
}

export function getLocalizedFeaturedProjects(
  language: SupportedLanguage
): readonly LocalizedPortfolioProject[] {
  return getFeaturedProjects().map((project) =>
    getLocalizedProject(project, language)
  )
}

export function getLocalizedProjectBySlug(
  slug: string,
  language: SupportedLanguage
): LocalizedPortfolioProject | undefined {
  const project = getProjectBySlug(slug)

  return project ? getLocalizedProject(project, language) : undefined
}

export function getLocalizedProjectNavigation(
  slug: string,
  language: SupportedLanguage
): LocalizedProjectNavigation | null {
  const navigation = getProjectNavigation(slug)

  if (!navigation) {
    return null
  }

  return {
    previous: navigation.previous
      ? getLocalizedProject(navigation.previous, language)
      : null,
    next: navigation.next
      ? getLocalizedProject(navigation.next, language)
      : null,
  }
}

export function getLocalizedPortfolio(
  language: SupportedLanguage
): LocalizedPortfolioData {
  return resolveLocalizedContent(
    {
      ...portfolioData,
      projects: orderedProjects,
    },
    language
  )
}

export function getContactDetails(): ContactDetails {
  const normalizedPhone = portfolioData.contact.phone.replace(/[^+\d]/g, "")

  return {
    email: {
      value: portfolioData.contact.email,
      href: `mailto:${portfolioData.contact.email}`,
    },
    phone: {
      value: portfolioData.contact.phone,
      href: `tel:${normalizedPhone}`,
    },
    links: portfolioData.contact.links,
  }
}
