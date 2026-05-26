"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/common/page-header"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      toast.success("설정이 저장되었습니다.")
    } catch (error) {
      toast.error("설정 저장에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-8">
      <div className="space-y-8">
        <PageHeader
          title="설정"
          description="계정 및 환경 설정을 관리하세요"
        />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>프로필</CardTitle>
              <CardDescription>
                기본 프로필 정보를 관리하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="홍길동" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" type="email" placeholder="example@example.com" />
              </div>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "저장 중..." : "저장"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>알림</CardTitle>
              <CardDescription>
                알림 설정을 관리하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>이메일 알림</Label>
                  <p className="text-sm text-muted-foreground">
                    중요한 업데이트를 이메일로 받으세요
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle("emailNotifications")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>푸시 알림</Label>
                  <p className="text-sm text-muted-foreground">
                    브라우저 푸시 알림을 활성화하세요
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle("pushNotifications")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>마케팅 이메일</Label>
                  <p className="text-sm text-muted-foreground">
                    새로운 기능과 업데이트 소식을 받으세요
                  </p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={() => handleToggle("marketingEmails")}
                />
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading ? "저장 중..." : "저장"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">위험한 작업</CardTitle>
              <CardDescription>
                계정 관련 위험한 작업을 수행할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive">계정 삭제</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
