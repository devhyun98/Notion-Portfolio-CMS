"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="flex h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">문제가 발생했습니다</h2>
        <p className="text-muted-foreground">
          {error.message || "예상치 못한 오류가 발생했습니다."}
        </p>
        <Button onClick={() => reset()}>다시 시도</Button>
      </div>
    </Container>
  )
}
