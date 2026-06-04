import type { Metadata } from "next"
import { Providers } from "@/components/common/providers"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Notion Portfolio CMS",
  description: "Notion API를 활용한 개발자 포트폴리오 CMS 사이트",
  keywords: ["portfolio", "notion", "cms", "developer"],
  authors: [{ name: "Developer" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
