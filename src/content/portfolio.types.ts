export type SupportedLanguage = "en" | "ar"

export type LocalizedText = Readonly<Record<SupportedLanguage, string>>

export type AssetReference = Readonly<{
  src: string
  alt: LocalizedText
  width?: number
  height?: number
}>

export type DateRange = Readonly<{
  start: string
  end?: string
  isCurrent?: boolean
}>

export type ExternalLink = Readonly<{
  href: string
  ariaLabel: LocalizedText
}>

export type TechnologyCategory =
  "frontend" | "backend" | "database" | "architecture" | "tooling" | "other"

export type Technology = Readonly<{
  name: string
  category?: TechnologyCategory
}>

export type PersonalProfile = Readonly<{
  fullName: string
  professionalTitle: LocalizedText
  marketingStatement: LocalizedText
  shortIntroduction: LocalizedText
  location: LocalizedText
  email: string
  phone: string
  logo: AssetReference
  avatar: AssetReference
}>

export type Availability = Readonly<{
  status: "available" | "limited" | "unavailable"
  label: LocalizedText
  description?: LocalizedText
}>

export type SocialLinks = Readonly<{
  github: ExternalLink
  linkedin: ExternalLink
  email: ExternalLink
  phone?: ExternalLink
  portfolio?: ExternalLink
}>

export type ResumeAsset = Readonly<{
  file: string
  downloadName: string
}>

export type Capability = Readonly<{
  id: string
  title: LocalizedText
  description: LocalizedText
  icon?: string
}>

export type ExperienceItem = Readonly<{
  id: string
  organization: Readonly<{
    name: string
    logo: AssetReference
    website?: string
  }>
  role: LocalizedText
  employmentType?: LocalizedText
  location: LocalizedText
  workMode?: "remote" | "hybrid" | "onsite"
  period: DateRange
  summary: LocalizedText
  highlights: readonly LocalizedText[]
  workflow?: Readonly<{ steps: readonly LocalizedText[] }>
  relatedProjectId?: string
}>

export type EducationItem = Readonly<{
  id: string
  institution: Readonly<{
    name: LocalizedText
    officialName?: string
    logo: AssetReference
    website?: string
  }>
  degree: LocalizedText
  field: LocalizedText
  period: DateRange
  description?: LocalizedText
  achievements?: readonly Readonly<{
    title: LocalizedText
    description?: LocalizedText
    score?: string
  }>[]
}>

export type ProjectLink = ExternalLink

export type ProjectMedia = Readonly<{
  thumbnail?: AssetReference
  placeholder: AssetReference
}>

export type ProjectItem = Readonly<{
  id: string
  slug: string
  title: LocalizedText
  shortTitle?: LocalizedText
  category: LocalizedText
  description: LocalizedText
  contribution?: LocalizedText
  keyResult?: LocalizedText
  media: ProjectMedia
  technologies: readonly Technology[]
  links: Readonly<{ demo?: ProjectLink; source?: ProjectLink }>
  visibilityNote?: LocalizedText
  accent?: "violet" | "teal" | "amber"
  featured: boolean
  order: number
  relatedExperienceId?: string
}>

export type PortfolioSeo = Readonly<{
  siteUrl: string
  title: LocalizedText
  description: LocalizedText
  previewImage: AssetReference
}>

export type PortfolioData = Readonly<{
  personal: PersonalProfile
  availability?: Availability
  socialLinks: SocialLinks
  resume: ResumeAsset
  capabilities: readonly Capability[]
  experience: readonly ExperienceItem[]
  education: readonly EducationItem[]
  projects: readonly ProjectItem[]
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
export type LocalizedProject = ResolveLocalized<ProjectItem>
