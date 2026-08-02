export type SupportedLanguage = "en" | "ar"

export type LocalizedText = Readonly<Record<SupportedLanguage, string>>

export type ProjectStatus = "completed" | "in-progress" | "concept"

export type ContactLinkId = "linkedin" | "github" | "website"

export type ContactLink = Readonly<{
  id: ContactLinkId
  url: string
}>

export type DateRange = Readonly<{
  start: string
  end: string | null
  current: boolean
}>

export type MediaAsset = Readonly<{
  src: string
  width: number
  height: number
}>

export type DocumentAsset = Readonly<{
  src: string
  fileName: string
}>

export type PortfolioMediaManifest = Readonly<{
  brand: Readonly<{
    logo: MediaAsset
    wordmark: MediaAsset
    favicon: MediaAsset
    socialPreview: MediaAsset
  }>
  profile: Readonly<{
    avatar: MediaAsset | null
  }>
  projects: Readonly<{
    autonest: Readonly<{ systemMap: MediaAsset }>
    marketplace: Readonly<{ systemMap: MediaAsset }>
    "media-storage": Readonly<{ systemMap: MediaAsset }>
  }>
  documents: Readonly<{
    cv: DocumentAsset | null
  }>
}>

export type PortfolioIdentity = Readonly<{
  name: string
  initials: string
  professionalTitle: LocalizedText
  shortIntroduction: LocalizedText
}>

export type PortfolioHero = Readonly<{
  eyebrow: LocalizedText
  headline: LocalizedText
  description: LocalizedText
  availability: LocalizedText
  stackHighlights: readonly string[]
  proofPoints: readonly LocalizedText[]
}>

export type PortfolioContact = Readonly<{
  email: string
  phone: string
  links: readonly ContactLink[]
  headline: LocalizedText
  introduction: LocalizedText
  workTypes: readonly LocalizedText[]
}>

export type CvMetadata = Readonly<{
  available: boolean
  filePath: string | null
  fileName: string | null
}>

export type AboutPrinciple = Readonly<{
  title: LocalizedText
  description: LocalizedText
}>

export type PortfolioAbout = Readonly<{
  introduction: LocalizedText
  paragraphs: readonly LocalizedText[]
  currentFocus: LocalizedText
  principles: readonly AboutPrinciple[]
}>

export type PortfolioService = Readonly<{
  id: string
  title: LocalizedText
  description: LocalizedText
}>

export type PortfolioSkillGroup = Readonly<{
  id: string
  title: LocalizedText
  description: LocalizedText
  skills: readonly string[]
}>

export type PortfolioExperience = Readonly<{
  id: string
  role: LocalizedText
  organization: LocalizedText
  engagement: "freelance"
  period: DateRange
  description: LocalizedText
  responsibilities: readonly LocalizedText[]
}>

export type PortfolioEducation = Readonly<{
  id: string
  credential: LocalizedText
  institution: LocalizedText
  period: DateRange
  description: LocalizedText
}>

export type EngineeringProcessStep = Readonly<{
  id: string
  number: string
  title: LocalizedText
  description: LocalizedText
}>

export type ProjectImage = MediaAsset &
  Readonly<{
    kind: "system-map" | "interface" | "architecture"
    alt: LocalizedText
    caption: LocalizedText
  }>

export type ProjectDecision = Readonly<{
  title: LocalizedText
  context: LocalizedText
  decision: LocalizedText
  alternatives: LocalizedText
  tradeOff: LocalizedText
}>

export type ProjectLinks = Readonly<{
  repository?: string
  live?: string
}>

export type PortfolioProject = Readonly<{
  slug: string
  status: ProjectStatus
  featured: boolean
  year: number
  order: number
  title: LocalizedText
  descriptor: LocalizedText
  summary: LocalizedText
  context: LocalizedText
  problem: LocalizedText
  scope: LocalizedText
  solution: LocalizedText
  role: LocalizedText
  responsibilities: readonly LocalizedText[]
  interfaceWork: LocalizedText
  responsiveBehavior: LocalizedText
  architecture: LocalizedText
  decisions: readonly ProjectDecision[]
  tradeOffs: readonly LocalizedText[]
  challenges: readonly LocalizedText[]
  outcomes: readonly LocalizedText[]
  capabilities: readonly LocalizedText[]
  technologies: readonly string[]
  images: readonly ProjectImage[]
  links: ProjectLinks
}>

export type PortfolioSeo = Readonly<{
  siteUrl: string
  siteName: LocalizedText
  defaultTitle: LocalizedText
  description: LocalizedText
  keywords: readonly string[]
}>

export type PortfolioData = Readonly<{
  identity: PortfolioIdentity
  hero: PortfolioHero
  about: PortfolioAbout
  contact: PortfolioContact
  cv: CvMetadata
  services: readonly PortfolioService[]
  skillGroups: readonly PortfolioSkillGroup[]
  experience: readonly PortfolioExperience[]
  education: readonly PortfolioEducation[]
  process: readonly EngineeringProcessStep[]
  projects: readonly PortfolioProject[]
  seo: PortfolioSeo
}>

export type ResolveLocalized<T> = T extends LocalizedText
  ? string
  : T extends readonly (infer Item)[]
    ? readonly ResolveLocalized<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: ResolveLocalized<T[Key]> }
      : T

export type LocalizedPortfolioData = ResolveLocalized<PortfolioData>
export type LocalizedPortfolioProject = ResolveLocalized<PortfolioProject>
export type LocalizedPortfolioService = ResolveLocalized<PortfolioService>
export type LocalizedPortfolioSkillGroup = ResolveLocalized<PortfolioSkillGroup>
export type LocalizedPortfolioExperience = ResolveLocalized<PortfolioExperience>
export type LocalizedPortfolioEducation = ResolveLocalized<PortfolioEducation>
