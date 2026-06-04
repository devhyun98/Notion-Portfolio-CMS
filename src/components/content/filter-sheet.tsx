'use client'

import { useState } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SearchBox } from '@/components/content/search-box'
import { useMobile } from '@/hooks/use-mobile'

interface FilterSheetProps {
  allTags: string[]
  selectedTags: string[]
  searchQuery: string
  onTagToggle: (tag: string) => void
  onSearchChange: (search: string) => void
  onClear: () => void
  isFiltered: boolean | string
}

export function FilterSheet({
  allTags,
  selectedTags,
  searchQuery,
  onTagToggle,
  onSearchChange,
  onClear,
  isFiltered,
}: FilterSheetProps) {
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()

  // 모바일에서만 Sheet 사용
  if (!isMobile) {
    return null
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          필터
          {isFiltered && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-primary text-primary-foreground">
              {selectedTags.length + (searchQuery ? 1 : 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 mb-6">
          <SheetTitle>필터</SheetTitle>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-muted-foreground hover:text-foreground"
            >
              초기화
            </Button>
          )}
        </SheetHeader>

        <div className="space-y-6">
          {/* 검색 박스 */}
          <div>
            <h3 className="text-sm font-semibold mb-2">검색</h3>
            <SearchBox
              query={searchQuery}
              onSearchChange={onSearchChange}
              placeholder="검색어 입력..."
            />
          </div>

          {/* 태그 필터 */}
          {allTags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3">태그</h3>
              <div className="space-y-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagToggle(tag)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
