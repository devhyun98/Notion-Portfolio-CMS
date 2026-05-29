export type NavItem = {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
  disabled?: boolean
}

export type SiteConfig = {
  name: string
  description: string
  links: {
    github: string
    docs: string
  }
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  description: string
  content: string
  date: string
  category: string
  tags: string[]
  featuredImage?: string
  author?: string
  published: boolean
}

export type BlogMetadata = {
  readingTime: number
  wordCount: number
  updatedAt?: string
}
