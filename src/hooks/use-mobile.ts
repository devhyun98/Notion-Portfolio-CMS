'use client'

import { useEffect, useState } from "react"

// 모바일 기기 감지 훅 (768px 기준)
export function useMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    // 초기 크기 확인
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // 클라이언트 로드 완료 및 초기 크기 확인
    checkMobile()

    // 리사이즈 이벤트 리스너
    const handleResize = () => {
      checkMobile()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [breakpoint])

  // 서버 렌더링 시에는 false 반환 (클라이언트 로드 전), 로드 후 실제 값 반환
  return isMobile ?? false
}

// 데스크톱 여부 확인 (모바일의 반대)
export function useDesktop(breakpoint: number = 768): boolean {
  const isMobile = useMobile(breakpoint)
  return !isMobile
}

// 미디어 쿼리 훅 (커스텀 중단점 지원)
interface MediaQueryResult {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useMediaQuery(): MediaQueryResult {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryResult | null>(null)

  useEffect(() => {
    const checkMediaQuery = () => {
      setMediaQuery({
        isMobile: window.innerWidth < 640,
        isTablet: window.innerWidth >= 640 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
      })
    }

    checkMediaQuery()

    window.addEventListener("resize", checkMediaQuery)

    return () => {
      window.removeEventListener("resize", checkMediaQuery)
    }
  }, [])

  // 서버 렌더링 또는 로드 전에는 데스크톱 반환
  return mediaQuery ?? {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  }
}
