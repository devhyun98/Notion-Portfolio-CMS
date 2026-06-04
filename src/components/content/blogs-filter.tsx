'use client'

import { useFilters } from '@/hooks/use-filters'
import { BlogCard } from '@/components/content/blog-card'
import { SearchBox } from '@/components/content/search-box'
import { TagFilter } from '@/components/content/tag-filter'
import { FilterSheet } from '@/components/content/filter-sheet'

export interface FilteredBlog {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  slug: string
  readingTime: number
  category?: string
  [key: string]: unknown
}

interface BlogsFilterProps {
  blogs: FilteredBlog[]
}

export function BlogsFilter({ blogs }: BlogsFilterProps) {
  // 모든 태그 추출
  const allTags = Array.from(
    new Set(blogs.flatMap((blog) => blog.tags))
  ).sort()

  // 필터 훅 사용
  const {
    searchQuery,
    selectedTags,
    results,
    toggleTag,
    setSearch,
    clearFilters,
    isFiltered,
  } = useFilters(blogs, { tags: [], search: '' })

  return (
    <div className="space-y-8">
      {/* 검색 및 필터 섹션 */}
      <div className="space-y-6">
        {/* 필터 헤더 (모바일/데스크톱) */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 md:flex-none">
            <SearchBox
              query={searchQuery}
              onSearchChange={setSearch}
              placeholder="글 검색... (제목, 설명)"
            />
          </div>
          {/* 모바일용 필터 버튼 */}
          <FilterSheet
            allTags={allTags}
            selectedTags={selectedTags}
            searchQuery={searchQuery}
            onTagToggle={toggleTag}
            onSearchChange={setSearch}
            onClear={clearFilters}
            isFiltered={isFiltered}
          />
        </div>

        {/* 데스크톱용 태그 필터 */}
        <div className="hidden md:block">
          <TagFilter
            allTags={allTags}
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            onClear={clearFilters}
          />
        </div>

        {/* 필터 상태 표시 */}
        {isFiltered && (
          <p className="text-sm text-muted-foreground">
            {results.length}개의 글
          </p>
        )}
      </div>

      {/* 블로그 목록 */}
      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map((blog) => (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {isFiltered
              ? '검색 결과가 없습니다.'
              : '아직 등록된 글이 없습니다.'}
          </p>
        </div>
      )}
    </div>
  )
}
