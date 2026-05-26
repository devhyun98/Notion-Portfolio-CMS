import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { Container } from "./container"

export function Header() {
  return (
    <header className="border-b bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">StarterKit</span>
          </Link>

          <nav className="hidden gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              홈
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              문서
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-2.5 h-7 text-sm font-medium hover:bg-muted transition-all"
            >
              로그인
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}
