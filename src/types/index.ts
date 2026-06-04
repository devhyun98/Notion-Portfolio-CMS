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
  [key: string]: unknown
}

export interface BlogDetail extends NotionItem {
  type: "blog"
  readingTime: number
  updatedAt?: string
  tableOfContents: TocItem[]
  [key: string]: unknown
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
    [key: string]: unknown
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

// ==========================================
// 프로젝트 포트폴리오 & 클라이언트 관리 타입
// ==========================================

// 클라이언트 정보
export interface Client {
  id: string
  name: string // 클라이언트명
  email?: string
  phone?: string
  company?: string
  address?: string
  createdAt: string
  updatedAt: string
}

// 라인 항목 (견적서/청구서에 포함되는 항목)
export interface LineItem {
  id: string
  name: string // 항목명
  description?: string
  quantity: number // 수량
  unitPrice: number // 단가 (원)
  amount: number // 금액 (수량 × 단가)
  category?: string // 카테고리 (예: 디자인, 개발, 컨설팅)
}

// 견적서 (Quote/Project Quote)
export interface ProjectQuote {
  id: string
  quoteNumber: string // 견적서 번호 (예: PJT-2026-001)
  clientId: string // 클라이언트 ID
  clientName: string // 클라이언트명
  issueDate: string // 발행일 (ISO 형식)
  validUntil: string // 유효기간 (ISO 형식)
  status: "대기" | "승인" | "거절" | "만료" // 상태
  totalAmount: number // 총 금액 (원)
  lineItems: LineItem[] // 항목 목록
  description?: string // 추가 설명
  notes?: string // 특이사항
  createdAt: string
  updatedAt: string
}

// 청구서 (Invoice)
export interface Invoice {
  id: string
  invoiceNumber: string // 청구서 번호 (예: INV-2026-001)
  quoteId: string // 관련 견적서 ID
  clientId: string // 클라이언트 ID
  clientName: string
  issueDate: string // 발행일
  dueDate: string // 납기일
  status: "발행" | "송금 대기" | "부분 결제" | "완납" // 상태
  totalAmount: number // 총 금액
  paidAmount: number // 결제액
  lineItems: LineItem[] // 항목 목록
  paymentTerms?: string // 결제 조건
  notes?: string // 특이사항
  createdAt: string
  updatedAt: string
}

// 결제 기록
export interface PaymentRecord {
  id: string
  invoiceId: string // 청구서 ID
  amount: number // 결제액
  paymentDate: string // 결제일
  paymentMethod: "계좌이체" | "카드" | "현금" | "수표" | "기타"
  reference?: string // 참고사항
  createdAt: string
}

// 프로젝트 포트폴리오 (포트폴리오에 표시되는 프로젝트)
export interface PortfolioProject extends ProjectDetail {
  clientName?: string // 클라이언트명
  projectStatus?: "진행 중" | "완료" | "보류"
  startDate?: string
  endDate?: string
  budget?: number
  quote?: ProjectQuote // 관련 견적서
  invoices?: Invoice[] // 관련 청구서들
  deliverables?: string[] // 결과물 목록
}

// 클라이언트 프로젝트 이력 (한 클라이언트의 모든 프로젝트)
export interface ClientProjectHistory {
  clientId: string
  clientName: string
  totalProjects: number
  totalInvoiced: number // 총 청구액
  totalPaid: number // 총 결제액
  pendingAmount: number // 미결제액
  quotes: ProjectQuote[]
  invoices: Invoice[]
  portfolioProjects: PortfolioProject[]
}

// 대시보드 통계
export interface ProjectStats {
  totalQuotes: number
  pendingQuotes: number
  totalInvoices: number
  paidInvoices: number
  unpaidInvoices: number
  totalInvoiced: number // 총 청구액
  totalPaid: number // 총 결제액
  totalClients: number
  revenue: {
    monthly: Array<{ month: string; amount: number }>
    byCategory: Array<{ category: string; amount: number }>
  }
}

// 필터 및 검색 상태 확장
export interface ProjectFilterState extends FilterState {
  status?: string
  clientId?: string
  dateRange?: {
    startDate: string
    endDate: string
  }
}
