import { isRouteErrorResponse, useRouteError } from "react-router"

import { NotFoundPage } from "@/features/not-found/not-found-page"
import { projectNotFoundCode } from "@/routes/project-loader"

function isProjectNotFound(error: unknown) {
  if (!isRouteErrorResponse(error) || error.status !== 404) {
    return false
  }

  if (typeof error.data !== "object" || error.data === null) {
    return false
  }

  return "code" in error.data && error.data.code === projectNotFoundCode
}

export function ProjectRouteErrorBoundary() {
  const error = useRouteError()

  if (isProjectNotFound(error)) {
    return <NotFoundPage variant="project" />
  }

  throw error
}
