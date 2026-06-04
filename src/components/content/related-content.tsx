'use client'

import { ProjectCard } from '@/components/content/project-card'
import { BlogCard } from '@/components/content/blog-card'

interface RelatedItem {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  slug: string
  featuredImage?: string
}

interface RelatedProjectItem extends RelatedItem {
  readingTime?: never
  category?: never
}

interface RelatedBlogItem extends RelatedItem {
  readingTime: number
  category?: string
}

interface RelatedContentProps<T extends RelatedItem> {
  currentItem: T
  allItems: T[]
  title?: string
  maxItems?: number
  renderCard: (item: T) => React.ReactNode
}

export function RelatedContent<T extends RelatedItem>({
  currentItem,
  allItems,
  title = '관련 콘텐츠',
  maxItems = 3,
  renderCard,
}: RelatedContentProps<T>) {
  // 현재 항목을 제외한 다른 항목들 필터링
  const otherItems = allItems.filter((item) => item.id !== currentItem.id)

  // 같은 태그를 가진 항목 찾기
  const relatedItems = otherItems
    .filter((item) => {
      const commonTags = item.tags.filter((tag) =>
        currentItem.tags.includes(tag)
      )
      return commonTags.length > 0
    })
    .sort((a, b) => {
      // 공통 태그 많은 순서로 정렬
      const aCommonTags = a.tags.filter((tag) =>
        currentItem.tags.includes(tag)
      ).length
      const bCommonTags = b.tags.filter((tag) =>
        currentItem.tags.includes(tag)
      ).length
      return bCommonTags - aCommonTags
    })
    .slice(0, maxItems)

  if (relatedItems.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-foreground/10">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>

      {/* 프로젝트 카드인 경우 */}
      {'readingTime' in relatedItems[0] ? (
        // 블로그 아이템
        <div className="space-y-6">
          {relatedItems.map((item) => renderCard(item))}
        </div>
      ) : (
        // 프로젝트 아이템
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedItems.map((item) => renderCard(item))}
        </div>
      )}
    </section>
  )
}

// 프로젝트 관련 콘텐츠 전용 컴포넌트
export function RelatedProjects({
  currentProject,
  allProjects,
  maxItems = 3,
}: {
  currentProject: RelatedProjectItem
  allProjects: RelatedProjectItem[]
  maxItems?: number
}) {
  return (
    <RelatedContent
      currentItem={currentProject}
      allItems={allProjects}
      title="관련 프로젝트"
      maxItems={maxItems}
      renderCard={(project) => (
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
      )}
    />
  )
}

// 블로그 관련 콘텐츠 전용 컴포넌트
export function RelatedBlogs({
  currentBlog,
  allBlogs,
  maxItems = 3,
}: {
  currentBlog: RelatedBlogItem
  allBlogs: RelatedBlogItem[]
  maxItems?: number
}) {
  return (
    <RelatedContent
      currentItem={currentBlog}
      allItems={allBlogs}
      title="관련 글"
      maxItems={maxItems}
      renderCard={(blog) => (
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
      )}
    />
  )
}
