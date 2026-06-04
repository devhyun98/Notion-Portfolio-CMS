import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ProjectCard } from '@/components/content/project-card'
import { BlogCard } from '@/components/content/blog-card'
import { getProjects, getBlogs } from '@/lib/notion-fetch'
import type { Metadata } from 'next'

// 동적 파라미터 생성 (모든 태그 페이지 정적 생성)
export async function generateStaticParams() {
  const projects = await getProjects()
  const blogs = await getBlogs()

  // 모든 프로젝트와 블로그에서 고유한 태그 추출
  const allTags = new Set<string>()

  projects.forEach((project) => {
    project.tags.forEach((tag) => allTags.add(tag))
  })

  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => allTags.add(tag))
  })

  return Array.from(allTags).map((tag) => ({
    tag,
  }))
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params

  return {
    title: `${tag} 태그 | Notion Portfolio`,
    description: `"${tag}" 태그와 관련된 프로젝트와 블로그 글을 모두 확인하세요.`,
  }
}

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params

  // 모든 프로젝트와 블로그 조회
  const projects = await getProjects()
  const blogs = await getBlogs()

  // 현재 태그를 포함한 아이템 필터링
  const taggedProjects = projects.filter((project) =>
    project.tags.includes(tag)
  )
  const taggedBlogs = blogs.filter((blog) => blog.tags.includes(tag))

  // 해당 태그가 없으면 404 반환
  if (taggedProjects.length === 0 && taggedBlogs.length === 0) {
    notFound()
  }

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
            <BreadcrumbPage>{tag} 태그</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* 페이지 헤더 */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-muted-foreground">태그: </span>
          {tag}
        </h1>
        <p className="text-lg text-muted-foreground">
          {taggedProjects.length + taggedBlogs.length}개의 콘텐츠
          {taggedProjects.length > 0 && ` (프로젝트 ${taggedProjects.length}개`}
          {taggedBlogs.length > 0 && `, 블로그 ${taggedBlogs.length}개`}
          {(taggedProjects.length > 0 || taggedBlogs.length > 0) && ')'}
        </p>
      </div>

      {/* 프로젝트 섹션 */}
      {taggedProjects.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              관련 프로젝트 ({taggedProjects.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taggedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                date={project.date}
                slug={project.slug}
                featuredImage={project.featuredImage}
              />
            ))}
          </div>
        </section>
      )}

      {/* 블로그 섹션 */}
      {taggedBlogs.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              관련 블로그 글 ({taggedBlogs.length})
            </h2>
          </div>
          <div className="space-y-6">
            {taggedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                tags={blog.tags}
                date={blog.date}
                slug={blog.slug}
                readingTime={blog.readingTime}
                category={blog.category}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
