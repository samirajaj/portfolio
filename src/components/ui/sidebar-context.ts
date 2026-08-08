import * as React from "react"

export type SidebarContextValue = {
  state: "expanded" | "collapsed"
  isMobile: boolean
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
}

export const SidebarContext = React.createContext<SidebarContextValue | null>(
  null
)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider")
  return context
}
