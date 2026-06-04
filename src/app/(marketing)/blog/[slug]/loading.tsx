import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <div className="space-y-8">
      {/* 브레드크럼 스켈레톤 */}
      <Skeleton className="h-5 w-64" />

      {/* 뒤로가기 버튼 스켈레톤 */}
      <Skeleton className="h-10 w-32" />

      {/* 헤더 스켈레톤 */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>

      {/* 대표 이미지 스켈레톤 */}
      <Skeleton className="h-80 w-full rounded-lg" />

      {/* 콘텐츠 + 목차 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 메인 콘텐츠 */}
        <div className="lg:col-span-3 space-y-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 w-full ${
                i === 2 || i === 5 || i === 8 ? 'w-3/4' : ''
              }`}
            />
          ))}
        </div>

        {/* 목차 사이드바 */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
              <Skeleton className="h-5 w-16" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
