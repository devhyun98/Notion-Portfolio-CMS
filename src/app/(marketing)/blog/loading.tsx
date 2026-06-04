import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <div className="space-y-8">
      {/* 페이지 헤더 스켈레톤 */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-6 w-72" />
      </div>

      {/* 블로그 카드 리스트 스켈레톤 */}
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-3 pb-6 border-b">
            {/* 카테고리/날짜 스켈레톤 */}
            <div className="flex gap-3">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
            {/* 제목 스켈레톤 */}
            <Skeleton className="h-7 w-full" />
            {/* 설명 스켈레톤 */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            {/* 태그 스켈레톤 */}
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            {/* 읽는시간 스켈레톤 */}
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    </div>
  )
}
