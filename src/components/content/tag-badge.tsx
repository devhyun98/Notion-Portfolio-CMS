import { cn } from "@/lib/utils"

// 태그 배지 컴포넌트
interface TagBadgeProps {
  tag: string
  href?: string
  variant?: "default" | "secondary" | "outline"
  className?: string
  onClick?: () => void
}

export function TagBadge({
  tag,
  href,
  variant = "default",
  className,
  onClick,
}: TagBadgeProps) {
  const baseStyles = cn(
    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
      "border border-input bg-background hover:bg-accent": variant === "outline",
    },
    className
  )

  const content = (
    <span className={baseStyles} onClick={onClick}>
      #{tag}
    </span>
  )

  if (href) {
    return (
      <a href={href} className="no-underline">
        {content}
      </a>
    )
  }

  return content
}
