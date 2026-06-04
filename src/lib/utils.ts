import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// className 병합 (clsx + tailwind-merge)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 날짜 포맷팅 (예: "2025-06-02" -> "2025년 6월 2일")
export function formatDate(date: string | Date): string {
  const d = new Date(date)

  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// 간단한 날짜 포맷 (예: "2025-06-02" -> "6월 2, 2025")
export function formatDateShort(date: string | Date): string {
  const d = new Date(date)

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// 읽는 시간 계산 (한국어 기준: 분당 300글자)
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 300
  const wordCount = text.length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return Math.max(1, readingTime)
}

// 텍스트 → slug 변환
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

// 텍스트 줄이기 (ellipsis)
export function truncate(
  text: string,
  length: number = 150,
  suffix: string = "..."
): string {
  if (text.length <= length) {
    return text
  }
  return text.slice(0, length).trim() + suffix
}

// 첫 번째 문단 추출
export function getFirstParagraph(text: string): string {
  const paragraphs = text.split("\n\n")
  return paragraphs[0] || ""
}

// URL 유효성 검증
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// 배열 중복 제거
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

// 배열 분할
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }

  return chunks
}

// 숫자 포맷팅 (예: 1000 -> "1,000")
export function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR")
}

// 시간 범위 포맷팅
export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatDate(startDate)

  if (!endDate) {
    return `${start}~현재`
  }

  const end = formatDate(endDate)
  return `${start} ~ ${end}`
}

// 마크다운 링크 추출
export function extractLinks(text: string): { url: string; title: string }[] {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const links: { url: string; title: string }[] = []
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    links.push({
      title: match[1],
      url: match[2],
    })
  }

  return links
}

// 마크다운 제목 추출 (h1-h6)
export function extractHeadings(
  text: string
): { level: number; title: string; id: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: { level: number; title: string; id: string }[] = []
  let match

  while ((match = headingRegex.exec(text)) !== null) {
    const level = match[1].length
    const title = match[2]
    const id = generateSlug(title)

    headings.push({ level, title, id })
  }

  return headings
}

// 시간 차이 계산 (예: "2 days ago")
export function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (seconds < 60) {
    return "방금 전"
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes}분 전`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours}시간 전`
  }

  const days = Math.floor(hours / 24)
  if (days < 30) {
    return `${days}일 전`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months}개월 전`
  }

  const years = Math.floor(months / 12)
  return `${years}년 전`
}

// 색상 코드 유효성 검증
export function isValidColor(color: string): boolean {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  const rgbRegex = /^rgb\(\d+,\s*\d+,\s*\d+\)$/

  return hexRegex.test(color) || rgbRegex.test(color)
}

// 페이지 네이션 계산
export function getPaginationPages(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
) {
  const pages: (number | string)[] = []
  const halfWindow = Math.floor(maxVisible / 2)

  let start = Math.max(1, currentPage - halfWindow)
  const end = Math.min(totalPages, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  if (start > 1) {
    pages.push(1)
    if (start > 2) {
      pages.push("...")
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push("...")
    }
    pages.push(totalPages)
  }

  return pages
}
