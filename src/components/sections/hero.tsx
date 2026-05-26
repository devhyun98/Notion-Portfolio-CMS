import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function Hero() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              모던 웹 개발을 위한 완벽한 스타터킷
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Next.js 15, TypeScript, Tailwind CSS, shadcn/ui로 구축된
              프로덕션급 스타터킷. 빠르게 웹 프로젝트를 시작하세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" render={<Link href="/sign-up" />}>
              시작하기
            </Button>
            <Button size="lg" variant="outline" render={<Link href="#features" />}>
              자세히 보기
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
