import { Client as NotionClient } from "@notionhq/client"
import { warnIfMissingEnv } from "./validate-env"

// 환경 변수 경고 (개발 환경에서만 표시)
warnIfMissingEnv()

// Notion API 클라이언트 초기화
const apiKey = process.env.NOTION_API_KEY
if (!apiKey) {
  console.warn('⚠️ NOTION_API_KEY 환경변수가 설정되지 않았습니다.')
}

export const notion = new NotionClient({
  auth: apiKey,
})

// 디버깅: 클라이언트 객체 검증
if (typeof notion.databases?.query !== 'function') {
  console.error('❌ Notion Client 초기화 실패:', {
    notionType: typeof notion,
    databasesType: typeof notion.databases,
    queryType: typeof notion.databases?.query,
    keys: Object.keys(notion),
  })
}

// 환경 변수 검증 (레거시 함수 - validate-env.ts 사용 권장)
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
