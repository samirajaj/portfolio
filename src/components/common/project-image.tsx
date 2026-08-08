import { useState } from "react"

import type { LocalizedProject } from "@/content/portfolio.types"

type ProjectImageProps = {
  project: LocalizedProject
  onLoad?: () => void
}

export function ProjectImage({ project, onLoad }: ProjectImageProps) {
  const fallback = project.media.placeholder
  const preferred = project.media.thumbnail ?? fallback
  const [source, setSource] = useState(preferred.src)

  return (
    <img
      src={source}
      alt={source === fallback.src ? fallback.alt : preferred.alt}
      width={preferred.width ?? fallback.width}
      height={preferred.height ?? fallback.height}
      loading="lazy"
      decoding="async"
      className="aspect-[16/9] w-full object-cover"
      onLoad={onLoad}
      onError={() => {
        if (source !== fallback.src) setSource(fallback.src)
      }}
    />
  )
}
