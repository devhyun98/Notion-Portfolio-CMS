import Link from 'next/link'
import { Mail } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { siteConfig } from '@/lib/config'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background py-8 md:py-12">
      <Container>
        <div className="space-y-8">
          {/* 소셜 링크 (TODO: 아이콘 추가) */}
          {siteConfig.links && Object.keys(siteConfig.links).length > 0 && (
            <div className="flex justify-center gap-4">
              {Object.entries(siteConfig.links || {}).map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={name}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              ))}
            </div>
          )}

          {/* 저작권 및 설명 */}
          <div className="text-center border-t pt-6">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. {siteConfig.description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Powered by Next.js & Notion API
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
