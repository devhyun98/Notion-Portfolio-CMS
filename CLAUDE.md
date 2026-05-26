# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
npm start        # 프로덕션 서버 실행
```

## 기술 스택

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** - 별도 config 파일 없이 `globals.css`에서 `@theme` 블록으로 직접 설정
- **shadcn/ui** (base-nova 스타일) - `components.json`으로 관리, `src/components/ui/`에 위치
- **react-hook-form** + **zod** - 모든 폼의 표준 검증 패턴
- **next-themes** - 클래스 기반 다크모드 (`attribute="class"`)
- **sonner** - Toast 알림 (루트 layout에서 전역 `<Toaster>` 등록)

## 아키텍처

### Route Groups (3구역 레이아웃 분리)

| 그룹 | 경로 | 레이아웃 특징 |
|------|------|--------------|
| `(marketing)` | `/` | Header + Footer, `Container`로 너비 제한 |
| `(auth)` | `/sign-in`, `/sign-up`, `/forgot-password` | 미니멀 헤더 + 세로 중앙정렬, `max-w-sm` 폼 |
| `dashboard` | `/dashboard`, `/dashboard/settings` | SidebarProvider 필수 (`"use client"`) |

루트 `layout.tsx`는 `ThemeProvider` + `TooltipProvider` + `Toaster`를 전역으로 래핑합니다.

### 컴포넌트 구조

- **`src/components/ui/`** - shadcn/ui 원자 컴포넌트 (직접 수정 가능)
- **`src/components/layout/`** - `Header`, `Footer`, `Container` (마케팅 레이아웃용)
- **`src/components/sections/`** - 랜딩 페이지 섹션 (`Hero`, `Features`, `CTA`)
- **`src/components/forms/`** - 인증 폼 (`SignInForm`, `SignUpForm`, `ForgotPasswordForm`)
- **`src/components/common/`** - `ThemeProvider`, `ThemeToggle`, `PageHeader`, `EmptyState`

### 핵심 유틸리티

- **`src/lib/utils.ts`** - `cn()` 함수: `clsx` + `tailwind-merge` 조합, className 처리의 표준
- **`src/lib/config.ts`** - `siteConfig`: 사이트명, 설명 등 메타정보 중앙 관리
- **`src/lib/validations.ts`** - Zod 스키마 3개 (`signInSchema`, `signUpSchema`, `forgotPasswordSchema`) + 인퍼드 타입
- **`src/types/index.ts`** - `NavItem`, `SiteConfig` 공통 타입
- **`src/hooks/use-mobile.ts`** - 768px 기준 모바일 감지, Sidebar의 Sheet 전환에 사용

### 폼 패턴

모든 인증 폼은 동일한 구조를 따릅니다:
```tsx
const form = useForm({ resolver: zodResolver(schema) })
// onSubmit: loading 상태 관리 → toast.success / toast.error (sonner)
```

### 디자인 토큰

`globals.css`의 `@theme inline` 블록에서 CSS 변수를 Tailwind 토큰으로 연결합니다. 색상은 `oklch()` 모델 사용. `:root`와 `.dark`의 변수 값만 변경하면 전체 테마가 전환됩니다. 사이드바 전용 컬러 토큰(`--sidebar-*`)이 별도로 정의되어 있습니다.

## 경로 Alias

`@/*` → `src/*` (tsconfig.json의 paths 설정)