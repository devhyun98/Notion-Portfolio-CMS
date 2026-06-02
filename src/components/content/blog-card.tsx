import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TagBadge } from "./tag-badge"
import { MetaInfo } from "./meta-info"
import { truncate } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

// 블로그 카드 컴포넌트
interface BlogCardProps {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  slug: string
  readingTime?: number
  category?: string
  className?: string
}

export function BlogCard({
  id,
  title,
  description,
  tags,
  date,
  slug,
  readingTime,
  category,
  className,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="no-underline group">
      <Card className={`h-full hover:shadow-md transition-shadow ${className || ""}`}>
        <CardHeader className="space-y-3">
          <div className="space-y-2">
            <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </CardTitle>
            <MetaInfo date={date} readingTime={readingTime} showIcons={true} />
          </div>

          {/* 카테고리 */}
          {category && (
            <div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                {category}
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 설명 */}
          <CardDescription className="line-clamp-3">
            {truncate(description, 150)}
          </CardDescription>

          {/* 태그 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 2).map((tag) => (
                <TagBadge key={tag} tag={tag} variant="outline" />
              ))}
              {tags.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* 링크 화살표 */}
          <div className="flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
            <span>읽기</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
