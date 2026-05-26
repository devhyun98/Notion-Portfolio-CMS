import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function CTA() {
  return (
    <section className="border-t py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="rounded-lg bg-primary px-6 py-12 text-center sm:px-12 lg:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            지금 바로 시작하세요
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            이 스타터킷으로 몇 분 안에 프로덕션급 웹 애플리케이션을
            만들기 시작할 수 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="secondary" render={<Link href="/sign-up" />}>
              무료로 시작
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              render={<Link href="#features" />}
            >
              자세히 알아보기
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
