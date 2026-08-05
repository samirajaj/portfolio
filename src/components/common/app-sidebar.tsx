import {
  BriefcaseBusinessIcon,
  FolderKanbanIcon,
  GraduationCapIcon,
  HouseIcon,
  MailIcon,
} from "lucide-react"
import { useTranslation } from "react-i18next"

import { LanguageSwitcher } from "@/components/common/language-switcher"
import { ThemeSwitcher } from "@/components/common/theme-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar-context"
import type {
  LocalizedPortfolioData,
  SupportedLanguage,
} from "@/content/portfolio.types"
import { useActiveSection } from "@/hooks/use-active-section"

const sections = [
  { id: "hero", icon: HouseIcon },
  { id: "experience", icon: BriefcaseBusinessIcon },
  { id: "education", icon: GraduationCapIcon },
  { id: "projects", icon: FolderKanbanIcon },
  { id: "contact", icon: MailIcon },
] as const
const sectionIds = sections.map(({ id }) => id)

type AppSidebarProps = {
  locale: SupportedLanguage
  direction: "ltr" | "rtl"
  personal: LocalizedPortfolioData["personal"]
}

export function AppSidebar({ locale, direction, personal }: AppSidebarProps) {
  const { t } = useTranslation(["site", "common"])
  const activeSection = useActiveSection(sectionIds)
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar
      side={direction === "rtl" ? "right" : "left"}
      mobileTitle={t("site:sidebar.title")}
      mobileDescription={t("site:sidebar.description")}
      aria-label={t("site:sidebar.title")}
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <a
          href="#hero"
          className="flex min-h-12 items-center gap-3 rounded-lg p-1 group-data-[collapsible=icon]/sidebar:justify-center"
          onClick={() => isMobile && setOpenMobile(false)}
        >
          <img
            src={personal.logo.src}
            width={personal.logo.width}
            height={personal.logo.height}
            alt={personal.logo.alt}
            className="size-10 shrink-0 rounded-lg object-contain"
          />
          <span className="flex min-w-0 flex-col group-data-[collapsible=icon]/sidebar:sr-only">
            <strong className="truncate text-sm">{personal.fullName}</strong>
            <span className="truncate text-xs text-muted-foreground">
              {t("site:sidebar.portfolio")}
            </span>
          </span>
        </a>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("site:sidebar.navigation")}</SidebarGroupLabel>
          <SidebarMenu>
            {sections.map(({ id, icon: Icon }) => {
              const label = t(`site:nav.${id}`)
              return (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === id}
                    tooltip={label}
                    tooltipSide={direction === "rtl" ? "left" : "right"}
                  >
                    <a
                      href={`#${id}`}
                      aria-current={
                        activeSection === id ? "location" : undefined
                      }
                      onClick={() => isMobile && setOpenMobile(false)}
                    >
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-1 group-data-[collapsible=icon]/sidebar:flex-col group-data-[collapsible=icon]/sidebar:[&_span]:sr-only">
          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher />
        </div>
      </SidebarFooter>
      <SidebarRail label={t("common:actions.toggleSidebar")} />
    </Sidebar>
  )
}
