import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function PageContainer({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("page-container", className)} {...props} />
}
