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
