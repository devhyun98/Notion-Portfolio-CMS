// 공통 타입 정의

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
  description?: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  mailSupport: string
  links: {
    twitter?: string
    github?: string
    linkedin?: string
    email?: string
  }
}

// Notion 기반 콘텐츠 타입
export interface NotionItem {
  id: string
  title: string
  type: "project" | "blog" | "experience"
  description: string
  content: string // Rich Text
  tags: string[]
  date: string // ISO 형식
  slug: string // URL slug (고유값)
  published: boolean
  featuredImage?: string
  category?: string
}

export interface ProjectDetail extends NotionItem {
  type: "project"
  techStack: string[]
  demoUrl?: string
  sourceUrl?: string
}

export interface BlogDetail extends NotionItem {
  type: "blog"
  readingTime: number
  updatedAt?: string
  tableOfContents: TocItem[]
}

export interface ExperienceDetail extends NotionItem {
  type: "experience"
  company?: string
  position?: string
  startDate?: string
  endDate?: string
}

// 목차 아이템
export interface TocItem {
  level: number
  title: string
  id: string
}

// Notion API 응답 타입
export interface NotionDatabaseItem {
  id: string
  created_time: string
  last_edited_time: string
  properties: {
    [key: string]: any
  }
}

// 페이지 Props 타입
export interface PageProps {
  params: Promise<Record<string, string>>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export interface LayoutProps {
  children: React.ReactNode
  params?: Promise<Record<string, string>>
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// 필터링 및 검색 관련
export interface FilterState {
  tags?: string[]
  category?: string
  search?: string
}

// 페이지네이션
export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  items: T[]
  meta: PaginationMeta
}
