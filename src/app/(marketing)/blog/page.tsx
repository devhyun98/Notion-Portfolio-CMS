import { BlogsFilter } from '@/components/content/blogs-filter'
import { getBlogs } from '@/lib/notion-fetch'

export const metadata = {
  title: '블로그 | Notion Portfolio',
  description: '개발 관련 글과 경험을 공유합니다.',
}

export default async function BlogPage() {
  const blogs = await getBlogs()

  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">블로그</h1>
        <p className="text-lg text-muted-foreground">
          개발 관련 글과 경험을 공유합니다.
        </p>
      </div>

      {/* 검색 및 필터링 */}
      <BlogsFilter blogs={blogs} />
    </div>
  )
}
