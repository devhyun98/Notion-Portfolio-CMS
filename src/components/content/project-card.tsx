import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TagBadge } from "./tag-badge"
import { MetaInfo } from "./meta-info"
import { truncate } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

// 프로젝트 카드 컴포넌트
interface ProjectCardProps {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  slug: string
  featuredImage?: string
  className?: string
}

export function ProjectCard({
  id,
  title,
  description,
  tags,
  date,
  slug,
  featuredImage,
  className,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="no-underline group">
      <Card className={`h-full hover:shadow-lg transition-shadow ${className || ""}`}>
        {/* 프로젝트 이미지 */}
        {featuredImage && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
            <Image
              src={featuredImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}

        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-1">
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </CardTitle>
              <MetaInfo date={date} showIcons={false} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 설명 */}
          <CardDescription className="line-clamp-2">
            {truncate(description, 100)}
          </CardDescription>

          {/* 태그 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <TagBadge key={tag} tag={tag} variant="secondary" />
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{tags.length - 3}개
                </span>
              )}
            </div>
          )}

          {/* 링크 화살표 */}
          <div className="flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
            <span>자세히 보기</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
