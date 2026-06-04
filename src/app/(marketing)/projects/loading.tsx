import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectsLoading() {
  return (
    <div className="space-y-8">
      {/* 페이지 헤더 스켈레톤 */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-6 w-72" />
      </div>

      {/* 프로젝트 그리드 스켈레톤 (3x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            {/* 이미지 스켈레톤 */}
            <Skeleton className="h-48 w-full rounded-lg" />
            {/* 제목 스켈레톤 */}
            <Skeleton className="h-6 w-full" />
            {/* 설명 스켈레톤 */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            {/* 태그 스켈레톤 */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
