import Link from "next/link"
import { ThemeToggle } from "@/components/common/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            StarterKit
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-4">
          {children}
        </div>
      </main>
    </div>
  )
}
