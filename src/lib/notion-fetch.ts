import { cache } from "react"
import { notion, NOTION_DATABASE_ID, NOTION_CONTENT_TYPES, CACHE_CONFIG } from "./notion"
import type { NotionItem, ProjectDetail, BlogDetail } from "@/types"
import { PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

// Notion 페이지를 NotionItem으로 변환
function parseNotionPage(page: PageObjectResponse): NotionItem | null {
  try {
    const properties = page.properties as Record<string, any>

    // 필수 속성 추출
    const title = properties.title?.title?.[0]?.plain_text || ""
    const typeSelect = properties.type?.select?.name || ""
    const descriptionRichText = properties.description?.rich_text || []
    const contentRichText = properties.content?.rich_text || []
    const tagsSelect = properties.tags?.multi_select || []
    const dateDate = properties.date?.date?.start || new Date().toISOString()
    const slugRichText = properties.slug?.rich_text || []
    const publishedCheckbox = properties.published?.checkbox ?? false
    const featuredImageFile = properties.featuredImage?.files?.[0]
    const categorySelect = properties.category?.select?.name

    if (!title || !typeSelect) {
      return null
    }

    // Rich Text를 plain text로 변환
    const description = descriptionRichText.map((rt: RichTextItemResponse) => rt.plain_text).join("")
    const content = contentRichText.map((rt: RichTextItemResponse) => rt.plain_text).join("")
    const slug = slugRichText.map((rt: RichTextItemResponse) => rt.plain_text).join("")

    // 이미지 URL 추출
    let featuredImage: string | undefined
    if (featuredImageFile?.type === "file") {
      featuredImage = featuredImageFile.file?.url
    } else if (featuredImageFile?.type === "external") {
      featuredImage = featuredImageFile.external?.url
    }

    return {
      id: page.id,
      title,
      type: typeSelect as "project" | "blog" | "experience",
      description,
      content,
      tags: tagsSelect.map((tag: any) => tag.name),
      date: dateDate,
      slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
      published: publishedCheckbox,
      featuredImage,
      category: categorySelect,
    }
  } catch (error) {
    console.error("Notion 페이지 파싱 오류:", error)
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

    const items = response.results
      .map((page: any) => parseNotionPage(page as PageObjectResponse))
      .filter((item: any): item is NotionItem => item !== null)

    return items
  } catch (error: any) {
    if (error.code === 'object_not_found') {
      console.error('❌ Notion 데이터베이스 오류:')
      console.error(`   데이터베이스 ID를 찾을 수 없습니다: ${NOTION_DATABASE_ID}`)
      console.error('💡 해결 방법:')
      console.error('   1. Notion에서 데이터베이스가 존재하는지 확인')
      console.error('   2. 통합 "notion-cms-project"이 데이터베이스와 공유되었는지 확인')
      console.error('   3. 데이터베이스 ID가 올바른지 확인 (https://www.notion.so/[DATABASE_ID])')
    } else {
      console.error('❌ Notion API 오류:', error.message)
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
