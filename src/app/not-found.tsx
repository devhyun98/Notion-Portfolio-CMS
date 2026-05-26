import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export default function NotFound() {
  return (
    <Container className="flex h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h2>
        <p className="text-muted-foreground">
          요청하신 페이지가 없거나 삭제되었습니다.
        </p>
        <Button render={<Link href="/" />}>
          홈으로 돌아가기
        </Button>
      </div>
    </Container>
  )
}
