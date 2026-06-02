import { remark } from 'remark'
import remarkHtml from 'remark-html'

// 마크다운 → HTML 변환
export async function markdownToHtml(markdown: string): Promise<string> {
  try {
    const result = await remark()
      .use(remarkHtml)
      .process(markdown)

    return String(result)
  } catch (error) {
    console.error('마크다운 변환 오류:', error)
    return `<p>${markdown}</p>`
  }
}

// 마크다운 → HTML (코드 하이라이팅 포함 - remark 사용)
export async function markdownToHtmlWithHighlight(
  markdown: string
): Promise<string> {
  // remark-html로 충분하며, 클라이언트 측에서 필요시 highlight.js 추가
  return markdownToHtml(markdown)
}

// 마크다운에서 목차 추출
export function extractTableOfContents(
  markdown: string
): { level: number; title: string; id: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: { level: number; title: string; id: string }[] = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const title = match[2]
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    toc.push({ level, title, id })
  }

  return toc
}

// 마크다운 미리보기 (HTML 태그 제거, 텍스트만 추출)
export function extractMarkdownPreview(
  markdown: string,
  length: number = 150
): string {
  // 마크다운 구문 제거
  const text = markdown
    .replace(/^#+\s+/gm, '') // 제목
    .replace(/\*\*(.+?)\*\*/g, '$1') // 굵은 글씨
    .replace(/\*(.+?)\*/g, '$1') // 이탤릭
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // 링크
    .replace(/`(.+?)`/g, '$1') // 인라인 코드
    .replace(/```[\s\S]*?```/g, '') // 코드 블록
    .replace(/\n/g, ' ') // 줄 바꿈을 공백으로
    .trim()

  // 길이 제한
  if (text.length > length) {
    return text.substring(0, length) + '...'
  }

  return text
}

// 마크다운 유효성 검증
export function isValidMarkdown(markdown: string): boolean {
  return Boolean(markdown && markdown.trim().length > 0)
}

// 마크다운을 일반 텍스트로 변환
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/^#+\s+/gm, '') // 제목
    .replace(/\*\*(.+?)\*\*/g, '$1') // 굵은 글씨
    .replace(/\*(.+?)\*/g, '$1') // 이탤릭
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // 링크
    .replace(/`(.+?)`/g, '$1') // 인라인 코드
    .replace(/```[\s\S]*?```/g, '') // 코드 블록
    .replace(/^\s*[-*+]\s+/gm, '') // 리스트
    .replace(/^\s*\d+\.\s+/gm, '') // 번호 리스트
    .trim()
}
