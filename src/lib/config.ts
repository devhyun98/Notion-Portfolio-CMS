import type { SiteConfig, NavItem } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Notion Portfolio CMS",
  description: "Notion API를 활용한 개발자 포트폴리오 CMS 사이트",
  url: "https://notion-portfolio.example.com",
  ogImage: "https://notion-portfolio.example.com/og.png",
  mailSupport: "devhyun98@gmail.com",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "devhyun98@gmail.com",
  },
}

// 마케팅 영역 네비게이션
export const marketingNavItems: NavItem[] = [
  {
    title: "프로젝트",
    href: "/projects",
    description: "진행한 프로젝트들을 확인하세요",
  },
  {
    title: "블로그",
    href: "/blog",
    description: "최신 글과 개발 이야기",
  },
  {
    title: "소개",
    href: "/about",
    description: "자기소개 및 경력사항",
  },
  {
    title: "이력서",
    href: "/resume",
    description: "개발자 이력서",
  },
]

// 대시보드 네비게이션 (향후 관리자 기능)
export const dashboardNavItems: NavItem[] = [
  {
    title: "대시보드",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "설정",
    href: "/dashboard/settings",
    icon: "Settings",
  },
]

// 페이지네이션 기본값
export const PAGINATION = {
  PROJECTS_PER_PAGE: 12,
  BLOGS_PER_PAGE: 15,
  ITEMS_PER_PAGE: 20,
} as const

// SEO 기본값
export const SEO_DEFAULTS = {
  TITLE_TEMPLATE: "%s | Notion Portfolio CMS",
  DESCRIPTION: "Notion API를 활용한 개발자 포트폴리오",
  KEYWORDS: ["portfolio", "notion", "cms", "developer", "projects", "blog"],
} as const
