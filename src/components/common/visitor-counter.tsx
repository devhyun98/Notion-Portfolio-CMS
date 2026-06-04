'use client'

import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const date = String(today.getDate()).padStart(2, '0')
    const todayKey = `${year}-${month}-${date}`

    const storageKey = `visitor_${todayKey}`
    const hasVisited = localStorage.getItem(storageKey)

    const registerVisitor = async () => {
      try {
        const visitorId = localStorage.getItem('visitorId') || crypto.randomUUID()

        if (!localStorage.getItem('visitorId')) {
          localStorage.setItem('visitorId', visitorId)
        }

        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId }),
        })

        if (response.ok) {
          const data = await response.json()
          setCount(data.count)
          localStorage.setItem(storageKey, 'true')
        }
      } catch (error) {
        console.error('방문자 등록 오류:', error)
        getVisitorCount()
      } finally {
        setLoading(false)
      }
    }

    const getVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitors', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
          const data = await response.json()
          setCount(data.count)
        }
      } catch (error) {
        console.error('방문자 조회 오류:', error)
      } finally {
        setLoading(false)
      }
    }

    if (hasVisited) {
      getVisitorCount()
    } else {
      registerVisitor()
    }
  }, [])

  if (loading || count === null) {
    return null
  }

  return (
    <div className="flex items-center gap-1 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground transition-colors">
      <Users className="h-4 w-4" />
      <span>Today: {count}</span>
    </div>
  )
}
