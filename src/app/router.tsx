import { createBrowserRouter } from "react-router"

import { HomePage } from "@/features/home/home-page"
import { NotFoundPage } from "@/features/not-found/not-found-page"
import { RouteErrorPage } from "@/features/not-found/route-error-page"
import { LocaleLayout } from "@/layouts/locale-layout"
import { localeLoader, rootLocaleRedirectLoader } from "@/routes/locale-routing"

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    ErrorBoundary: RouteErrorPage,
    children: [
      {
        id: "root-locale-redirect",
        index: true,
        loader: rootLocaleRedirectLoader,
      },
      {
        id: "locale",
        path: ":locale",
        loader: localeLoader,
        Component: LocaleLayout,
        ErrorBoundary: RouteErrorPage,
        children: [
          {
            id: "home",
            index: true,
            Component: HomePage,
          },
          {
            id: "project",
            path: "projects/:slug",
            lazy: () => import("@/features/projects/project.route"),
          },
          {
            id: "not-found",
            path: "*",
            Component: NotFoundPage,
          },
        ],
      },
    ],
  },
])
