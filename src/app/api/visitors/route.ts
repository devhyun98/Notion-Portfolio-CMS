import { NextRequest, NextResponse } from 'next/server'

const visitorCounts = new Map<string, Set<string>>()

function getTodayKey(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const date = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${date}`
}

export async function GET() {
  const todayKey = getTodayKey()
  const count = visitorCounts.get(todayKey)?.size ?? 0

  return NextResponse.json({ count, today: todayKey })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { visitorId } = body

    if (!visitorId || typeof visitorId !== 'string') {
      return NextResponse.json(
        { error: '유효하지 않은 visitorId' },
        { status: 400 }
      )
    }

    const todayKey = getTodayKey()

    if (!visitorCounts.has(todayKey)) {
      visitorCounts.set(todayKey, new Set())
    }

    visitorCounts.get(todayKey)!.add(visitorId)

    const count = visitorCounts.get(todayKey)!.size

    return NextResponse.json({ count, today: todayKey })
  } catch (error) {
    console.error('방문자 카운팅 오류:', error)
    return NextResponse.json(
      { error: '방문자 카운팅 실패' },
      { status: 500 }
    )
  }
}
