import Link from "next/link"
import { Container } from "./container"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <Container>
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-3">
              <h4 className="font-semibold">제품</h4>
              <nav className="space-y-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  기능
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  가격
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  보안
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">회사</h4>
              <nav className="space-y-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  소개
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  블로그
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  채용
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">리소스</h4>
              <nav className="space-y-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  문서
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  예제
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  커뮤니티
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">법적</h4>
              <nav className="space-y-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  개인정보
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  이용약관
                </Link>
              </nav>
            </div>
          </div>

          <div className="border-t py-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2025 StarterKit. 모든 권리 보유.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
