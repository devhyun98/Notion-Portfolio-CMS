import { cache } from "react"
import { notion, NOTION_DATABASE_ID, NOTION_CONTENT_TYPES } from "./notion"
import type { NotionItem, ProjectDetail, BlogDetail } from "@/types"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

// 다양한 Notion 속성 타입에서 텍스트 추출
function extractPlainText(property: unknown): string {
  if (!property) return ""

  const prop = property as Record<string, unknown>

  // rich_text 타입
  if (prop.rich_text && Array.isArray(prop.rich_text)) {
    return (prop.rich_text as Array<{ plain_text: string }>).map((rt) => rt.plain_text).join("")
  }

  // title 타입
  if (prop.title && Array.isArray(prop.title)) {
    return (prop.title as Array<{ plain_text: string }>).map((rt) => rt.plain_text).join("")
  }

  // formula 결과
  const formula = prop.formula as Record<string, string> | undefined
  if (formula?.string) {
    return formula.string
  }

  // rollup 결과
  const rollup = prop.rollup as Record<string, string> | undefined
  if (rollup?.string) {
    return rollup.string
  }

  // relation
  if (prop.relation && Array.isArray(prop.relation)) {
    return (prop.relation as Array<{ id: string }>).map((r) => r.id).join(", ")
  }

  return ""
}

// Notion 페이지를 NotionItem으로 변환
function parseNotionPage(page: PageObjectResponse): NotionItem | null {
  try {
    const properties = page.properties as Record<string, unknown>

    // 여러 가능한 속성명 시도 (데이터베이스 구조 유연성)
    const title =
      extractPlainText(properties.title) ||
      extractPlainText(properties["견적서 번호"]) ||
      extractPlainText(properties["클라이언트명"]) ||
      extractPlainText(properties["Name"]) ||
      extractPlainText(properties["Title"]) ||
      ""

    const typeSelect =
      (properties.type as Record<string, { name: string }> | undefined)?.select?.name ||
      (properties["Type"] as Record<string, { name: string }> | undefined)?.select?.name ||
      "project" // 기본값: project

    const descriptionText =
      extractPlainText(properties.description) ||
      extractPlainText(properties["설명"]) ||
      extractPlainText(properties["Description"]) ||
      ""

    const contentText =
      extractPlainText(properties.content) ||
      extractPlainText(properties["내용"]) ||
      extractPlainText(properties["Content"]) ||
      ""

    const tagsSelect: Array<{ name: string }> =
      (properties.tags as Record<string, Array<{ name: string }>> | undefined)?.multi_select ||
      (properties["Tags"] as Record<string, Array<{ name: string }>> | undefined)?.multi_select ||
      (properties["항목"] as Record<string, Array<{ name: string }>> | undefined)?.multi_select ||
      []

    const dateDate =
      (properties.date as Record<string, { start: string }> | undefined)?.date?.start ||
      (properties["발행일"] as Record<string, { start: string }> | undefined)?.date?.start ||
      (properties["Date"] as Record<string, { start: string }> | undefined)?.date?.start ||
      (properties["Created"] as Record<string, string> | undefined)?.created_time ||
      new Date().toISOString()

    const slugText = extractPlainText(properties.slug) ||
      extractPlainText(properties["Slug"]) ||
      ""

    const publishedCheckbox =
      (properties.published as Record<string, boolean> | undefined)?.checkbox ??
      (properties["Published"] as Record<string, boolean> | undefined)?.checkbox ??
      true // 기본값: 공개

    const featuredImageFile =
      (properties.featuredImage as Record<string, Array<{ type: string; file?: { url: string }; external?: { url: string } }>> | undefined)?.files?.[0] ||
      (properties["이미지"] as Record<string, Array<{ type: string; file?: { url: string }; external?: { url: string } }>> | undefined)?.files?.[0] ||
      (properties["Image"] as Record<string, Array<{ type: string; file?: { url: string }; external?: { url: string } }>> | undefined)?.files?.[0]

    const categorySelect =
      (properties.category as Record<string, { name: string }> | undefined)?.select?.name ||
      (properties["Category"] as Record<string, { name: string }> | undefined)?.select?.name

    if (!title) {
      console.debug(`⚠️  제목 없음 - 파싱 스킵`)
      return null
    }

    // 설명 생성: description이 있으면 사용, 없으면 content 첫 150자
    const description =
      descriptionText ||
      contentText.substring(0, 150) ||
      ""

    const content = contentText

    // Slug 생성: 기존 slug 사용 또는 title에서 생성
    const slug = slugText ||
      title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

    // 이미지 URL 추출
    let featuredImage: string | undefined
    if (featuredImageFile?.type === "file") {
      featuredImage = (featuredImageFile.file as Record<string, string> | undefined)?.url
    } else if (featuredImageFile?.type === "external") {
      featuredImage = (featuredImageFile.external as Record<string, string> | undefined)?.url
    }

    return {
      id: page.id,
      title,
      type: typeSelect as "project" | "blog" | "experience",
      description,
      content,
      tags: tagsSelect.map((tag: { name: string }) => tag.name),
      date: dateDate,
      slug: slug,
      published: publishedCheckbox,
      featuredImage,
      category: categorySelect,
    }
  } catch (error) {
    console.error("Notion 페이지 파싱 오류:", error as Error)
    return null
  }
}

// 데이터베이스에서 모든 항목 조회 (캐시됨)
export const getNotionDatabase = cache(async () => {
  try {
    // 환경 변수 검증
    if (!NOTION_DATABASE_ID) {
      console.error('❌ 설정 오류: NOTION_DATABASE_ID가 설정되지 않았습니다.')
      console.error('💡 해결: .env.local 파일에 NOTION_DATABASE_ID를 설정하세요.')
      return []
    }

    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      // 필터와 정렬은 데이터베이스 구조에 따라 다르므로 제거
      // 클라이언트에서 JavaScript로 처리
    })

    console.log(`📊 Notion API 응답: 총 ${response.results.length}개 항목`)

    if (response.results.length > 0) {
      const first = response.results[0] as PageObjectResponse
      console.log('📝 첫 번째 항목의 속성과 타입:')
      if (first.properties) {
        Object.keys(first.properties).forEach(key => {
          const prop = first.properties[key] as unknown
          const type = (prop as Record<string, unknown>)?.type || 'unknown'
          let value = '(empty)'
          try {
            const propRecord = prop as Record<string, unknown>
            if (propRecord.rich_text && Array.isArray(propRecord.rich_text)) {
              value = (propRecord.rich_text as Array<{ plain_text: string }>).map((rt) => rt.plain_text).join("")
            } else if (propRecord.title && Array.isArray(propRecord.title)) {
              value = (propRecord.title as Array<{ plain_text: string }>).map((rt) => rt.plain_text).join("")
            } else if ((propRecord.select as Record<string, unknown>)?.name) {
              value = (propRecord.select as Record<string, string>).name
            } else if ((propRecord.date as Record<string, string>)?.start) {
              value = (propRecord.date as Record<string, string>).start
            }
          } catch {
            value = '(extraction error)'
          }
          const preview = value.substring(0, 30) || '(empty)'
          console.log(`   - [${type}] ${key}: "${preview}"`)
        })
      }
    }

    const items = response.results
      .map((page) => parseNotionPage(page as PageObjectResponse))
      .filter((item): item is NotionItem => item !== null)

    console.log(`✅ 파싱된 항목: ${items.length}개`)
    if (items.length > 0) {
      items.forEach((item, idx) => {
        console.log(`   [${idx + 1}] ${item.title} (type: ${item.type})`)
      })
    }

    return items
  } catch (error: unknown) {
    const err = error as Record<string, unknown> | null
    if (err?.code === 'object_not_found') {
      console.error('❌ Notion 데이터베이스 오류:')
      console.error(`   데이터베이스 ID를 찾을 수 없습니다: ${NOTION_DATABASE_ID}`)
      console.error('💡 해결 방법:')
      console.error('   1. Notion에서 데이터베이스가 존재하는지 확인')
      console.error('   2. 통합 "notion-cms-project"이 데이터베이스와 공유되었는지 확인')
      console.error('   3. 데이터베이스 ID가 올바른지 확인 (https://www.notion.so/[DATABASE_ID])')
    } else {
      console.error('❌ Notion API 오류:', err instanceof Error ? err.message : String(error))
    }
    return []
  }
})

// 타입별 항목 조회
export async function getNotionItemsByType(
  type: "project" | "blog" | "experience"
): Promise<NotionItem[]> {
  const allItems = await getNotionDatabase()
  return allItems.filter((item: NotionItem) => item.type === type)
}

// Slug로 단일 항목 조회
export async function getNotionItemBySlug(
  slug: string
): Promise<NotionItem | null> {
  const allItems = await getNotionDatabase()
  return allItems.find((item: NotionItem) => item.slug === slug) || null
}

// 프로젝트 목록 조회
export async function getProjects(): Promise<ProjectDetail[]> {
  const projects = await getNotionItemsByType(NOTION_CONTENT_TYPES.PROJECT)
  return projects as ProjectDetail[]
}

// 특정 프로젝트 조회
export async function getProject(slug: string): Promise<ProjectDetail | null> {
  const project = await getNotionItemBySlug(slug)
  if (project?.type !== NOTION_CONTENT_TYPES.PROJECT) {
    return null
  }
  return project as ProjectDetail
}

// 블로그 글 목록 조회
export async function getBlogs(): Promise<BlogDetail[]> {
  const blogs = await getNotionItemsByType(NOTION_CONTENT_TYPES.BLOG)
  return blogs as BlogDetail[]
}

// 특정 블로그 글 조회
export async function getBlog(slug: string): Promise<BlogDetail | null> {
  const blog = await getNotionItemBySlug(slug)
  if (blog?.type !== NOTION_CONTENT_TYPES.BLOG) {
    return null
  }
  return blog as BlogDetail
}

// 경험(Experience) 목록 조회
export async function getExperiences(): Promise<NotionItem[]> {
  return getNotionItemsByType(NOTION_CONTENT_TYPES.EXPERIENCE)
}

// 태그별 항목 조회
export async function getItemsByTag(tag: string): Promise<NotionItem[]> {
  const allItems = await getNotionDatabase()
  return allItems.filter((item: NotionItem) => item.tags.includes(tag))
}

// 검색 (제목 + 설명 + 태그)
export async function searchItems(query: string): Promise<NotionItem[]> {
  const allItems = await getNotionDatabase()
  const lowerQuery = query.toLowerCase()

  return allItems.filter(
    (item: NotionItem) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
  )
}

// 최신 항목 N개 조회
export async function getRecentItems(count: number): Promise<NotionItem[]> {
  const allItems = await getNotionDatabase()
  // 날짜순으로 정렬 (최신순)
  const sorted = [...allItems].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
  return sorted.slice(0, count)
}

// 모든 고유 태그 조회
export async function getAllTags(): Promise<string[]> {
  const allItems = await getNotionDatabase()
  const tagSet = new Set<string>()

  allItems.forEach((item: NotionItem) => {
    item.tags.forEach((tag: string) => tagSet.add(tag))
  })

  return Array.from(tagSet).sort()
}

// 모든 고유 카테고리 조회
export async function getAllCategories(): Promise<string[]> {
  const allItems = await getNotionDatabase()
  const categorySet = new Set<string>()

  allItems.forEach((item: NotionItem) => {
    if (item.category) {
      categorySet.add(item.category)
    }
  })

  return Array.from(categorySet).sort()
}
