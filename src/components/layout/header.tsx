'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { VisitorCounter } from '@/components/common/visitor-counter'
import { Container } from '@/components/layout/container'
import { siteConfig, marketingNavItems } from '@/lib/config'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // 현재 경로가 활성 링크인지 확인
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <Container className="flex items-center justify-between py-4">
        {/* 로고 */}
        <Link href="/" className="font-bold text-lg md:text-xl">
          {siteConfig.name}
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-8">
          {marketingNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(item.href)
                  ? 'text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* 오른쪽 아이콘들 */}
        <div className="flex items-center gap-2">
          <VisitorCounter />
          <ThemeToggle />

          {/* 모바일 메뉴 */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent hover:text-accent-foreground">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴</span>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="space-y-4 mt-4">
                {marketingNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block text-sm transition-colors ${
                      isActive(item.href)
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
