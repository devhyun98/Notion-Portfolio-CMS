'use client'

import { useMemo } from "react"
import Link from "next/link"

// Notion Rich Text를 HTML로 렌더링하는 컴포넌트
interface NotionRendererProps {
  content: string
  className?: string
}

export function NotionRenderer({ content, className }: NotionRendererProps) {
  // 마크다운 스타일 텍스트를 간단한 HTML로 변환
  const htmlContent = useMemo(() => {
    if (!content) return ""

    let html = content
      // 굵은 글씨 (**text**)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // 이탤릭 (*text*)
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // 링크 ([text](url))
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // 인라인 코드 (`code`)
      .replace(/`(.+?)`/g, "<code>$1</code>")
      // 줄 바꿈을 <br>로
      .replace(/\n/g, "<br/>")
      // 제목들 (마크다운 형식)
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")

    return html
  }, [content])

  return (
    <div
      className={`prose prose-sm max-w-none dark:prose-invert ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

// 간단한 텍스트만 렌더링 (Notion API에서 rich_text 처리)
interface SimpleTextRendererProps {
  text: string
  className?: string
}

export function SimpleTextRenderer({ text, className }: SimpleTextRendererProps) {
  return <div className={className}>{text}</div>
}
