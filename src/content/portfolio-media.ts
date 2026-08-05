import type { PortfolioMediaManifest } from "./portfolio.types"

export const portfolioMedia = {
  brand: {
    logo: {
      src: "/media/brand/logo.svg",
      width: 1225,
      height: 1225,
    },
    wordmark: {
      src: "/media/brand/logo.svg",
      width: 1225,
      height: 1225,
    },
    favicon: {
      src: "/favicon.svg",
      width: 64,
      height: 64,
    },
    socialPreview: {
      src: "/placeholder.png",
      width: 1672,
      height: 941,
    },
  },
  profile: {
    avatar: {
      src: "/media/brand/avatar.png",
      width: 1254,
      height: 1254,
    },
  },
  projects: {
    placeholder: {
      src: "/placeholder.png",
      width: 1672,
      height: 941,
    },
  },
  organizations: {
    digit: {
      src: "/media/experiences/Digit-logo.jpg",
      width: 843,
      height: 843,
    },
    damascusUniversity: {
      src: "/media/educations/Damascuse-University-logo.jpg",
      width: 422,
      height: 384,
    },
    syrianVirtualUniversity: {
      src: "/media/educations/Syrian-Virtual-University-logo.png",
      width: 317,
      height: 251,
    },
  },
  documents: {
    cv: {
      src: "/media/cv.pdf",
      fileName: "Samir-Ajaj-CV.pdf",
    },
  },
} as const satisfies PortfolioMediaManifest
