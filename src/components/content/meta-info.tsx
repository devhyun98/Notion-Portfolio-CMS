import { formatDate } from "@/lib/utils"
import { Calendar, Clock, User } from "lucide-react"

// 메타 정보 컴포넌트 (날짜, 읽는시간, 작가 등)
interface MetaInfoProps {
  date?: string
  readingTime?: number
  author?: string
  updatedAt?: string
  className?: string
  showIcons?: boolean
}

export function MetaInfo({
  date,
  readingTime,
  author,
  updatedAt,
  className,
  showIcons = true,
}: MetaInfoProps) {
  const metaItems = []

  if (date) {
    metaItems.push({
      icon: showIcons ? Calendar : null,
      label: formatDate(date),
    })
  }

  if (readingTime) {
    metaItems.push({
      icon: showIcons ? Clock : null,
      label: `${readingTime}분 읽음`,
    })
  }

  if (author) {
    metaItems.push({
      icon: showIcons ? User : null,
      label: author,
    })
  }

  if (!metaItems.length) {
    return null
  }

  return (
    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground ${className || ""}`}>
      {metaItems.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {item.icon && <item.icon className="h-4 w-4" />}
          <span>{item.label}</span>
        </div>
      ))}
      {updatedAt && (
        <div className="text-xs text-muted-foreground/70">
          업데이트: {formatDate(updatedAt)}
        </div>
      )}
    </div>
  )
}
