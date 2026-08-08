import { resolveLocalizedContent } from "./localized-content"
import { portfolioData } from "./portfolio.data"
import type {
  LocalizedPortfolioData,
  ProjectItem,
  SupportedLanguage,
} from "./portfolio.types"

export function getLocalizedPortfolio(
  language: SupportedLanguage
): LocalizedPortfolioData {
  return resolveLocalizedContent(
    {
      ...portfolioData,
      projects: [...portfolioData.projects].sort(
        (first, second) => first.order - second.order
      ),
    },
    language
  )
}

export function resolveProjectImage(project: ProjectItem) {
  return project.media.thumbnail ?? project.media.placeholder
}
