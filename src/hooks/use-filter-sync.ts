'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * URL 쿼리 파라미터와 필터 상태를 동기화하는 훅
 * 페이지 새로고침 후에도 필터 상태가 유지됩니다
 */
export function useFilterSync(
  filters: {
    search?: string
    tags?: string[]
    category?: string
  },
  onUpdate: (filters: { search?: string; tags?: string[]; category?: string }) => void
) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL에서 필터 읽기 (초기 로드)
  useEffect(() => {
    const search = searchParams.get('search') || ''
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const category = searchParams.get('category') || ''

    // URL에서 읽은 값이 현재 필터와 다르면 업데이트
    const needsUpdate =
      (search && search !== filters.search) ||
      (tags.length > 0 && JSON.stringify(tags) !== JSON.stringify(filters.tags)) ||
      (category && category !== filters.category)

    if (needsUpdate) {
      onUpdate({
        search: search || undefined,
        tags: tags.length > 0 ? tags : undefined,
        category: category || undefined,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // 필터 변경 시 URL 업데이트
  useEffect(() => {
    const queryParams = new URLSearchParams()

    if (filters.search) {
      queryParams.set('search', filters.search)
    }
    if (filters.tags && filters.tags.length > 0) {
      queryParams.set('tags', filters.tags.join(','))
    }
    if (filters.category) {
      queryParams.set('category', filters.category)
    }

    const newUrl = queryParams.toString() ? `?${queryParams.toString()}` : ''
    router.push(newUrl, { scroll: false })
  }, [filters, router])
}
