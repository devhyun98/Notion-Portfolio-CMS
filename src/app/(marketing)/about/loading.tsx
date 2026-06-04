import { Skeleton } from '@/components/ui/skeleton'

export default function AboutLoading() {
  return (
    <div className="space-y-16">
      {/* 프로필 섹션 */}
      <section className="space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="flex gap-4 flex-wrap">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="space-y-6">
        <Skeleton className="h-10 w-40" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-20" />
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-8 w-16" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 경력사항 섹션 */}
      <section className="space-y-6">
        <Skeleton className="h-10 w-40" />
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="pl-6 pb-6">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
