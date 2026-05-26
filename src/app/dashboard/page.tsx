import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/common/page-header"

const stats = [
  { title: "총 사용자", value: "2,540", change: "+12.5%" },
  { title: "활성 세션", value: "342", change: "+3.2%" },
  { title: "일일 활동", value: "1,234", change: "+8.1%" },
  { title: "전환율", value: "3.24%", change: "-0.4%" },
]

export default function DashboardPage() {
  return (
    <Container className="py-8">
      <div className="space-y-8">
        <PageHeader
          title="대시보드"
          description="프로젝트의 주요 지표를 확인하세요"
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} 지난달 대비
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>
              지난 30일간의 활동 기록입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b last:pb-0 last:border-0">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">사용자 활동 #{i}</p>
                    <p className="text-xs text-muted-foreground">
                      {i * 2} 시간 전
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
