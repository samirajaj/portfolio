type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-8 md:grid-cols-8 lg:grid-cols-12">
      <div className="flex items-start gap-3 md:col-span-2 lg:col-span-3">
        <span className="font-mono text-xs text-signal" aria-hidden="true">
          {index}
        </span>
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      </div>
      <div className="flex flex-col gap-6 md:col-span-6 lg:col-span-8 lg:col-start-5">
        <h2 className="section-title">{title}</h2>
        {description ? <p className="prose-measure">{description}</p> : null}
      </div>
    </div>
  )
}
