import type { LucideIcon } from "lucide-react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type ContactLinkVariant = "ledger" | "compact" | "footer"

type ContactLinkProps = {
  href: string
  label: string
  value?: string
  accessibleLabel: string
  icon: LucideIcon
  variant: ContactLinkVariant
  external?: boolean
  className?: string
}

const variantClasses: Record<ContactLinkVariant, string> = {
  ledger:
    "min-h-28 flex-col items-start justify-between border-e border-b border-border p-5 sm:min-h-32 lg:min-h-36 lg:p-6",
  compact:
    "min-h-11 rounded-lg border border-border bg-background px-3 text-foreground hover:border-primary/60 hover:bg-muted",
  footer: "min-h-11 text-muted-foreground hover:text-foreground",
}

export function ContactLink({
  href,
  label,
  value,
  accessibleLabel,
  icon: Icon,
  variant,
  external = false,
  className,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      aria-label={accessibleLabel}
      className={cn(
        "contact-link group flex min-w-0 gap-3 font-medium",
        variantClasses[variant],
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
    >
      <span className="flex w-full min-w-0 items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2 text-sm">
          <Icon aria-hidden="true" />
          {label}
        </span>
        {external ? (
          <ArrowUpRightIcon
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5"
          />
        ) : null}
      </span>
      {value ? (
        <bdi
          dir="ltr"
          className="block w-full min-w-0 text-sm break-all text-muted-foreground group-hover:text-foreground"
        >
          {value}
        </bdi>
      ) : null}
    </a>
  )
}
