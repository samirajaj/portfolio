import { data, type LoaderFunctionArgs } from "react-router"

import { getProjectBySlug } from "@/content/portfolio.selectors"
import type { PortfolioProject } from "@/content/portfolio.types"

export const projectNotFoundCode = "PROJECT_NOT_FOUND"

export type ProjectLoaderData = Readonly<{
  project: PortfolioProject
}>

export type ProjectNotFoundData = Readonly<{
  code: typeof projectNotFoundCode
  slug: string
}>

export function projectLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug?.trim() ?? ""
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) {
    throw data<ProjectNotFoundData>(
      {
        code: projectNotFoundCode,
        slug,
      },
      {
        status: 404,
        statusText: "Not Found",
      }
    )
  }

  return { project } satisfies ProjectLoaderData
}
