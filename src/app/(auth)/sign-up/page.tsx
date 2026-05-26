import { PageHeader } from "@/components/common/page-header"
import { SignUpForm } from "@/components/forms/sign-up-form"

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="회원가입"
        description="새 계정을 만들세요"
      />
      <SignUpForm />
    </div>
  )
}
