'use client'

import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

interface SearchBoxProps {
  query: string
  onSearchChange: (query: string) => void
  placeholder?: string
}

export function SearchBox({
  query,
  onSearchChange,
  placeholder = '검색...',
}: SearchBoxProps) {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pr-10"
      />
      {query && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="검색 초기화"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
