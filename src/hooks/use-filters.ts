'use client'

import { useState, useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

// 필터 상태 관리 훅 (URL 쿼리 파라미터 기반)
interface UseFiltersProps {
  tags?: string[]
  category?: string
  search?: string
}

export function useFilters<T extends Record<string, any>>(
  items: T[],
  {
    tags: initialTags = [],
    category: initialCategory = "",
    search: initialSearch = "",
  }: UseFiltersProps = {}
) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL에서 필터 값 읽기 (기본값 사용)
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || initialTags
  )
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || initialCategory
  )
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("search") || initialSearch
  )

  // 필터링된 결과 계산
  const results = useMemo(() => {
    return items.filter((item) => {
      // 태그 필터링
      if (selectedTags.length > 0) {
        const itemTags = item.tags || []
        const hasMatchingTag = selectedTags.some((tag: string) =>
          itemTags.includes(tag)
        )
        if (!hasMatchingTag) return false
      }

      // 카테고리 필터링
      if (selectedCategory && item.category !== selectedCategory) {
        return false
      }

      // 검색 필터링
      if (searchQuery.trim()) {
        const lowerQuery = searchQuery.toLowerCase()
        const title = String(item.title || "").toLowerCase()
        const description = String(item.description || "").toLowerCase()
        const searchMatch = title.includes(lowerQuery) || description.includes(lowerQuery)
        if (!searchMatch) return false
      }

      return true
    })
  }, [items, selectedTags, selectedCategory, searchQuery])

  // URL 업데이트 및 필터 적용
  const updateFilters = useCallback(
    (params: { tags?: string[]; category?: string; search?: string }) => {
      if (params.tags !== undefined) {
        setSelectedTags(params.tags)
      }
      if (params.category !== undefined) {
        setSelectedCategory(params.category)
      }
      if (params.search !== undefined) {
        setSearchQuery(params.search)
      }

      // URL 업데이트
      const queryParams = new URLSearchParams()
      const newTags = params.tags !== undefined ? params.tags : selectedTags
      const newCategory = params.category !== undefined ? params.category : selectedCategory
      const newSearch = params.search !== undefined ? params.search : searchQuery

      if (newTags.length > 0) {
        queryParams.set("tags", newTags.join(","))
      }
      if (newCategory) {
        queryParams.set("category", newCategory)
      }
      if (newSearch) {
        queryParams.set("search", newSearch)
      }

      const queryString = queryParams.toString()
      const newUrl = queryString ? `?${queryString}` : ""
      router.push(newUrl, { scroll: false })
    },
    [selectedTags, selectedCategory, searchQuery, router]
  )

  // 태그 토글
  const toggleTag = useCallback(
    (tag: string) => {
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
      updateFilters({ tags: newTags })
    },
    [selectedTags, updateFilters]
  )

  // 카테고리 변경
  const setCategory = useCallback(
    (category: string) => {
      updateFilters({ category: category === selectedCategory ? "" : category })
    },
    [selectedCategory, updateFilters]
  )

  // 검색 변경
  const setSearch = useCallback(
    (search: string) => {
      updateFilters({ search })
    },
    [updateFilters]
  )

  // 모든 필터 초기화
  const clearFilters = useCallback(() => {
    setSelectedTags([])
    setSelectedCategory("")
    setSearchQuery("")
    router.push("", { scroll: false })
  }, [router])

  return {
    selectedTags,
    selectedCategory,
    searchQuery,
    results,
    hasResults: results.length > 0,
    resultCount: results.length,
    toggleTag,
    setCategory,
    setSearch,
    clearFilters,
    updateFilters,
    isFiltered: selectedTags.length > 0 || selectedCategory || searchQuery.trim() !== "",
  }
}
