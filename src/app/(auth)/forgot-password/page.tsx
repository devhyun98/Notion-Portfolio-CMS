import { PageHeader } from "@/components/common/page-header"
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="비밀번호 재설정"
        description="이메일 주소를 입력하면 재설정 링크를 보내드립니다"
      />
      <ForgotPasswordForm />
    </div>
  )
}
