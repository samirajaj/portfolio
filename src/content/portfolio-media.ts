import type { PortfolioMediaManifest } from "./portfolio.types"

export const portfolioMedia = {
  brand: {
    logo: {
      src: "/media/brand/logo.svg",
      width: 256,
      height: 256,
    },
    wordmark: {
      src: "/media/brand/wordmark.svg",
      width: 320,
      height: 80,
    },
    favicon: {
      src: "/favicon.svg",
      width: 64,
      height: 64,
    },
    socialPreview: {
      src: "/media/brand/social-preview.svg",
      width: 1200,
      height: 630,
    },
  },
  profile: {
    avatar: null,
  },
  projects: {
    autonest: {
      systemMap: {
        src: "/media/projects/autonest/system-map.svg",
        width: 1600,
        height: 1000,
      },
    },
    marketplace: {
      systemMap: {
        src: "/media/projects/marketplace/system-map.svg",
        width: 1600,
        height: 1000,
      },
    },
    "media-storage": {
      systemMap: {
        src: "/media/projects/media-storage/system-map.svg",
        width: 1600,
        height: 1000,
      },
    },
  },
  documents: {
    cv: null,
  },
} as const satisfies PortfolioMediaManifest
