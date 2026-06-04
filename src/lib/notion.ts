import { Client as NotionClient } from "@notionhq/client"

// Notion API 클라이언트 초기화
const apiKey = process.env.NOTION_API_KEY
if (!apiKey) {
  console.warn('⚠️ NOTION_API_KEY 환경변수가 설정되지 않았습니다.')
}

export const notion = new NotionClient({
  auth: apiKey,
})

// 환경 변수 검증
export function validateNotionEnv() {
  const errors: string[] = []

  if (!process.env.NOTION_API_KEY) {
    errors.push("NOTION_API_KEY 환경 변수가 설정되지 않았습니다")
  }

  if (!process.env.NOTION_DATABASE_ID) {
    errors.push("NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다")
  }

  if (errors.length > 0) {
    throw new Error(`Notion 설정 오류:\n${errors.join("\n")}`)
  }
}

// 재사용 가능한 상수
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || ""
export const NOTION_CONTENT_TYPES = {
  PROJECT: "project",
  BLOG: "blog",
  EXPERIENCE: "experience",
} as const

// 캐시 설정
export const CACHE_CONFIG = {
  ISR_REVALIDATE: 3600, // 1시간
  API_REVALIDATE: 300, // 5분
} as const
