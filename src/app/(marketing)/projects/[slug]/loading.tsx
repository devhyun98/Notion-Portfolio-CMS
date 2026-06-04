import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectLoading() {
  return (
    <div className="space-y-8">
      {/* 브레드크럼 스켈레톤 */}
      <Skeleton className="h-5 w-64" />

      {/* 뒤로가기 버튼 스켈레톤 */}
      <Skeleton className="h-10 w-32" />

      {/* 헤더 스켈레톤 */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-full" />
          ))}
        </div>
      </div>

      {/* 대표 이미지 스켈레톤 */}
      <Skeleton className="h-80 w-full rounded-lg" />

      {/* 기술 스택 스켈레톤 */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>
      </div>

      {/* 콘텐츠 스켈레톤 */}
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            className={`h-4 w-full ${i === 2 || i === 5 ? 'w-3/4' : ''}`}
          />
        ))}
      </div>

      {/* 버튼 스켈레톤 */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  )
}
