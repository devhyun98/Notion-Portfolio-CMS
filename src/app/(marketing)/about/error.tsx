'use client'

import { Button } from '@/components/ui/button'

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">페이지를 불러올 수 없습니다</h2>
        <p className="text-muted-foreground">
          죄송합니다. 페이지를 로드하는 중에 오류가 발생했습니다.
        </p>
      </div>
      <Button onClick={reset} size="lg">
        다시 시도
      </Button>
    </div>
  )
}
