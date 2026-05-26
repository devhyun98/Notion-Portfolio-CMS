import {
  Zap,
  Shield,
  Palette,
  Code2,
  Smartphone,
  Accessibility,
} from "lucide-react"
import { Container } from "@/components/layout/container"

const features = [
  {
    icon: Zap,
    title: "고성능",
    description: "최적화된 번들 사이즈와 빠른 로딩 속도",
  },
  {
    icon: Shield,
    title: "보안",
    description: "보안 모범 사례를 준수한 구축",
  },
  {
    icon: Palette,
    title: "커스터마이징",
    description: "Tailwind CSS로 쉬운 스타일링",
  },
  {
    icon: Code2,
    title: "개발자 경험",
    description: "명확한 구조와 문서",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description: "모든 기기에서 완벽하게 작동",
  },
  {
    icon: Accessibility,
    title: "접근성",
    description: "WCAG 2.1 준수",
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="border-t bg-muted/50 py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              주요 기능
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              프로덕션급 웹 애플리케이션을 위한 모든 것이 포함되어 있습니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="rounded-lg border bg-background p-6"
                >
                  <Icon className="h-8 w-8" />
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
