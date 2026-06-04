import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { MetaInfo } from '@/components/content/meta-info'
import { TagBadge } from '@/components/content/tag-badge'
import { RelatedBlogs } from '@/components/content/related-content'
import { getBlogs, getBlog } from '@/lib/notion-fetch'
import { markdownToHtml, extractTableOfContents } from '@/lib/markdown'
import type { Metadata } from 'next'

// 동적 파라미터 생성 (정적 생성용)
export async function generateStaticParams() {
  const blogs = await getBlogs()
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

// 동적 메타데이터 생성 (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${blog.title} | Notion Portfolio`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  }
}

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await getBlog(slug)
  const allBlogs = await getBlogs()

  if (!blog) {
    notFound()
  }

  // 마크다운을 HTML로 변환
  const htmlContent = await markdownToHtml(blog.content)
  // 목차 추출
  const toc = extractTableOfContents(blog.content)

  return (
    <div className="space-y-8">
      {/* 브레드크럼 */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">홈</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">블로그</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blog.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 뒤로가기 버튼 */}
      <Link href="/blog">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          블로그 목록
        </Button>
      </Link>

      {/* 헤더 */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">{blog.title}</h1>
        <MetaInfo
          date={blog.date}
          readingTime={blog.readingTime}
          updatedAt={blog.updatedAt}
        />
        {blog.category && (
          <div className="flex gap-2">
            <Badge variant="secondary">{blog.category}</Badge>
          </div>
        )}
      </div>

      {/* 대표 이미지 */}
      {blog.featuredImage && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
          {/* TODO: Next.js Image 컴포넌트로 대체 예정 */}
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 마크다운 콘텐츠 */}
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>

          {/* 태그 */}
          {blog.tags.length > 0 && (
            <div className="space-y-3 pt-6 border-t">
              <p className="text-sm font-semibold">태그</p>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <TagBadge
                    key={tag}
                    tag={tag}
                    href={`/blog?tags=${tag}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 사이드바 (목차) */}
        {toc.length > 0 && (
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <p className="text-sm font-semibold mb-3">목차</p>
                <nav className="space-y-2 text-sm">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-muted-foreground hover:text-foreground transition-colors"
                      style={{
                        paddingLeft: `${(item.level - 1) * 12}px`,
                      }}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* 관련 글 */}
      <RelatedBlogs
        currentBlog={blog}
        allBlogs={allBlogs}
        maxItems={3}
      />
    </div>
  )
}
