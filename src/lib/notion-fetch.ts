import { notion } from './notion'
import type { BlogPost } from '@/types'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

if (!NOTION_DATABASE_ID) {
  throw new Error('NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다.')
}

interface RichTextItem {
  plain_text?: string
}

function extractPlainText(richText: RichTextItem[]): string {
  if (!richText) return ''
  return richText.map((text) => text.plain_text || '').join('')
}

function notionRowToBlogPost(page: PageObjectResponse): BlogPost {
  const properties = page.properties as Record<string, unknown>

  const titleProp = (properties.title as unknown as { title?: RichTextItem[] })?.title?.[0]
  const slugProp = (properties.slug as unknown as { rich_text?: RichTextItem[] })?.rich_text?.[0]
  const descProp = (properties.description as unknown as { rich_text?: RichTextItem[] })?.rich_text?.[0]
  const contentProp = (properties.content as unknown as { rich_text?: RichTextItem[] })?.rich_text
  const dateProp = (properties.date as unknown as { date?: { start?: string } })?.date?.start
  const categoryProp = (properties.category as unknown as { select?: { name?: string } })?.select?.name
  const tagsProp = (properties.tags as unknown as { multi_select?: Array<{ name?: string }> })?.multi_select
  const imageProp = (properties.featuredImage as unknown as { files?: Array<{ file?: { url?: string } }> })?.files?.[0]?.file?.url
  const authorProp = (properties.author as unknown as { rich_text?: RichTextItem[] })?.rich_text?.[0]
  const publishedProp = (properties.published as unknown as { checkbox?: boolean })?.checkbox

  return {
    id: page.id,
    title: titleProp?.plain_text || '',
    slug: slugProp?.plain_text || '',
    description: descProp?.plain_text || '',
    content: extractPlainText(contentProp || []),
    date: dateProp || new Date().toISOString(),
    category: categoryProp || '',
    tags: tagsProp?.map((tag) => tag.name || '') || [],
    featuredImage: imageProp,
    author: authorProp?.plain_text,
    published: publishedProp || false,
  }
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'type',
            select: {
              equals: 'blog',
            },
          },
          {
            property: 'published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'date',
          direction: 'descending',
        },
      ],
    })

    const blogs = response.results.map(notionRowToBlogPost)
    return blogs
  } catch (error) {
    console.error('getBlogs 오류:', error)
    throw error
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    })

    if (response.results.length === 0) {
      return null
    }

    return notionRowToBlogPost(response.results[0])
  } catch (error) {
    console.error(`getBlogBySlug(${slug}) 오류:`, error)
    throw error
  }
}

export async function getBlogsByCategory(
  category: string
): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'category',
            select: {
              equals: category,
            },
          },
          {
            property: 'published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'date',
          direction: 'descending',
        },
      ],
    })

    return response.results.map(notionRowToBlogPost)
  } catch (error) {
    console.error(`getBlogsByCategory(${category}) 오류:`, error)
    throw error
  }
}
