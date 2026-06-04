'use client'

import { useState, useCallback, useMemo } from "react"

// 검색 상태 관리 훅
interface UseSearchProps {
  searchableFields?: string[]
}

export function useSearch<T extends Record<string, unknown>>(
  items: T[],
  { searchableFields = ["title", "description"] }: UseSearchProps = {}
) {
  const [searchQuery, setSearchQuery] = useState("")

  // 검색 결과 계산 (메모이제이션)
  const results = useMemo(() => {
    if (!searchQuery.trim()) {
      return items
    }

    const lowerQuery = searchQuery.toLowerCase()

    return items.filter((item) =>
      searchableFields.some((field) => {
        const value = item[field]
        if (!value) return false
        return String(value).toLowerCase().includes(lowerQuery)
      })
    )
  }, [items, searchQuery, searchableFields])

  // 검색 쿼리 변경
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  // 검색 초기화
  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  return {
    searchQuery,
    results,
    handleSearch,
    clearSearch,
    hasResults: results.length > 0,
    resultCount: results.length,
  }
}
