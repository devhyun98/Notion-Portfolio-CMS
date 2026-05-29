# Project Development Guidelines - Notion Portfolio CMS

## 프로젝트 개요

**Notion Portfolio CMS** - Notion API를 활용하여 개발자 포트폴리오, 프로젝트, 블로그 콘텐츠를 관리하는 CMS 기반 웹사이트

- **기술 스택**: Next.js 15 (App Router) + React 19 + TypeScript 5 + Tailwind CSS v4 + shadcn/ui
- **배포**: Vercel
- **핵심 목표**: Notion 데이터 동기화 → 웹사이트 자동 반영

---

## 프로젝트 아키텍처

### Route Groups 레이아웃 구조 (반드시 준수)

| Route Group | 경로 | 레이아웃 특징 | 필수 Provider |
|-------------|------|--------------|--------------|
| `(marketing)` | `/`, `/projects`, `/blog`, `/about` | Header + Footer + Container | - |
| `(auth)` | `/sign-in`, `/sign-up`, `/forgot-password` | 미니멀 헤더 + 세로 중앙정렬 | - |
| `dashboard` | `/dashboard/*` | SidebarProvider + 레이아웃 사이드바 | SidebarProvider (use client) |

**규칙**: 
- 새로운 페이지 추가 시 반드시 해당 Route Group에 배치
- Route Group 밖의 루트 페이지 생성 금지
- Root `layout.tsx`: `<ThemeProvider>`, `<TooltipProvider>`, `<Toaster>` 전역 래핑

### 컴포넌트 디렉토리 구조

```
src/components/
├── ui/              # shadcn/ui 원자 컴포넌트 (base-nova 스타일)
├── layout/          # 레이아웃 컴포넌트 (Header, Footer, Container, Sidebar)
├── sections/        # 랜딩 페이지 섹션 (Hero, Features, CTA)
├── forms/           # 인증 폼 (SignInForm, SignUpForm, ForgotPasswordForm)
├── common/          # 공통 컴포넌트 (ThemeProvider, ThemeToggle, PageHeader, EmptyState)
├── cards/           # 카드 컴포넌트 (ProjectCard, BlogCard)
└── blocks/          # 복합 컴포넌트 (RelatedContent, TagFilter, SearchBox, TableOfContents)
```

**규칙**:
- shadcn/ui 추가 시: `shadcn-ui add <component>` 명령 사용 → `src/components/ui/` 자동 배치
- 기존 컴포넌트 위치 변경 금지
- 새 컴포넌트 추가 시 적절한 디렉토리에 배치

---

## 코딩 표준

### TypeScript 설정

- `strict: true` (반드시 준수)
- 모든 변수/함수 타입 명시 필수
- 경로 별칭 사용: `@/components`, `@/lib`, `@/hooks`, `@/types` (tsconfig.json의 paths 참고)

**금지 사항**:
- `any` 타입 사용 금지 (필요시 `unknown` 사용 후 타입 가드)
- 명시적 타입 선언 없는 변수 금지

### 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수/함수 | camelCase | `isLoading`, `fetchProjects` |
| 컴포넌트 | PascalCase | `ProjectCard`, `BlogCard`, `TagFilter` |
| 상수 | UPPER_SNAKE_CASE | `API_KEY`, `MAX_RETRIES` |
| 파일명 | kebab-case (dir) / PascalCase (component) | `use-search.ts`, `ProjectCard.tsx` |
| 타입/Interface | PascalCase | `NotionItem`, `ProjectDetail` |

### 코드 포맷팅

- **들여쓰기**: 스페이스 4칸 (탭 금지)
- **줄 길이**: 100자 권장, 120자 이상 금지
- **로깅**: `console.log` 금지 → 적절한 로깅 라이브러리 사용 (TBD)
- **주석**: WHY만 명시 (WHAT은 코드 자체로), 한국어 작성
- **화살표 함수**: 반환값이 있을 경우 `=>` 뒤에 명시적 `return` 또는 `{}` 사용

---

## 프레임워크/라이브러리 사용 표준

### shadcn/ui

- **스타일**: `base-nova` 스타일 고정 (변경 금지)
- **관리**: `components.json`에 registry 설정됨
- **추가**: `shadcn-ui add <component>` 명령만 사용
- **위치**: `src/components/ui/` 에 자동 배치
- **커스터마이징**: 원본 컴포넌트 수정 가능 (색상, 크기 등 프로젝트 맞춤화)

### Tailwind CSS v4

- **특징**: 별도 config 파일 없음 (`tailwind.config.ts` 미사용)
- **설정**: `src/globals.css`의 `@theme` 블록에서 직접 정의
- **토큰**:
  - 일반 색상: `:root`에서 `oklch()` 모델 사용
  - 다크모드: `.dark` 클래스에서 변수값만 변경
  - 사이드바: `--sidebar-*` 토큰 별도 정의
- **다크모드**: `next-themes` + class 기반 (`attribute="class"`)

**규칙**:
- `globals.css`의 `@theme` 블록 수정 시 `:root`와 `.dark` 모두 동기화
- Tailwind 클래스 사용 시 커스텀 토큰 우선 (하드코딩 색상 금지)

### react-hook-form + zod

- **모든 폼의 표준 패턴**:
  ```tsx
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ... }
  })
  ```
- **검증 스키마**: `src/lib/validations.ts`에 중앙 관리
- **에러 처리**: `form.formState.errors` 사용, toast로 사용자 피드백
- **제출 처리**: `onSubmit` 핸들러에서 loading 상태 관리

### next-themes

- **설정**: root layout에서 `<ThemeProvider>` 래핑
- **다크모드 전환**: class 기반 (`attribute="class"`)
- **토글 컴포넌트**: `<ThemeToggle>` 사용 (기존 구현)
- **저장**: localStorage 자동 관리

### sonner (Toast)

- **전역 설정**: root layout에 `<Toaster>` 등록됨
- **사용 패턴**:
  ```tsx
  import { toast } from 'sonner'
  toast.success('성공 메시지')
  toast.error('에러 메시지')
  ```
- **폼 피드백**: 서버 응답 후 toast로 사용자에게 알림

---

## 핵심 파일 상호작용 규칙

### globals.css 수정 시

- **필수 동기화**: `:root` CSS 변수 변경 시 `.dark` 클래스 값도 동시 변경
- **영향 범위**: 모든 컴포넌트의 색상, 회전, 투명도 설정
- **검증**: `npm run build` 후 Tailwind 클래스 인식 확인

### components.json 수정 시

- **조회**: shadcn/ui registry, alias, components 경로 설정 확인
- **추가 컴포넌트**: `shadcn-ui add` 후 components.json 자동 업데이트
- **삭제**: 컴포넌트 제거 시 components.json에서 항목 삭제 필요

### tsconfig.json paths 수정 시

- **모든 import alias 검증**: 예시 - `@/*` → `src/*`
- **새로운 alias 추가 시**: 프로젝트 전체 파일에서 사용 가능성 검토
- **빌드 테스트**: `npm run build`로 alias 인식 확인

### lib/config.ts 수정 시

- **사이트 메타정보**: `siteConfig` 객체에서 중앙 관리 (제목, 설명, 작가, SNS 링크)
- **모든 페이지**: `generateMetadata()` 에서 참고
- **수정 후**: SEO 메타데이터 갱신 여부 확인

### types/index.ts 수정 시

- **공통 타입**: `NavItem`, `SiteConfig`, `NotionItem` 등 중앙 정의
- **새로운 타입**: Notion 데이터 구조 변경 시 여기서 먼저 추가
- **영향 범위**: API 응답, 컴포넌트 props, 페이지 로직 모두 검토

---

## 새로운 의존성 추가 규칙

**금지 사항** (반드시 회피):
- ❌ CVE(Common Vulnerabilities and Exposures) 미검사 패키지
- ❌ 장기간 업데이트되지 않은 패키지 (1년 이상)
- ❌ 보안 취약점이 방치된 패키지
- ❌ 지원하지 않는 Node.js 버전 요구 패키지 (18+ LTS만 지원)
- ❌ 성숙도가 낮은 패키지 (v0.x, 불안정한 API)

**필수 절차**:
1. npm registry에서 패키지 정보 확인 (`npm view <package>`)
2. GitHub 레포지토리 확인: 최신 commit, issues, security advisories
3. `npm audit` 실행 (자동 CVE 스캔)
4. 프로젝트 기술 스택과의 호환성 검토
5. 공식 문서 확인 (API stability, breaking changes)

---

## AI 의사결정 규칙

### Phase 기반 작업 제약

| Phase | 상태 | 허용 작업 | 금지 작업 |
|-------|------|---------|---------|
| Phase 1 | ✅ 완료 | - | - |
| Phase 2 | ⏳ 대기 | Notion API, 공통 컴포넌트 | 페이지 구현 |
| Phase 3 | ⏳ 대기 | /projects, /blog, / 페이지 | 검색/필터 기능 |
| Phase 4 | ⏳ 대기 | 검색, 필터, About, Resume | 배포, 성능 최적화 |
| Phase 5 | ⏳ 대기 | SEO, 성능 최적화, Vercel 배포 | 기능 추가 |

**규칙**:
- 현재 Phase 완료까지만 작업 진행
- 이전 Phase 미완료 상태에서 후행 Phase 작업 금지
- 특정 Phase를 건너뛰는 작업은 사용자 명시적 요청 시에만 진행

### 파일 수정 시 관련 파일 검토

**작업**: 기존 파일 수정 시 다음 파일들도 함께 검토하고 동기화 필요 여부 판단

- `globals.css` 수정 → `:root`, `.dark` 동기화 확인
- `types/index.ts` 수정 → 관련 컴포넌트, API route 검토
- `lib/config.ts` 수정 → SEO 메타데이터 갱신 필요 여부 확인
- `components.json` 수정 → shadcn/ui 컴포넌트 경로 검토
- Route 추가/삭제 → 네비게이션, sitemap, robots.txt 동기화

### 기술 결정 우선순위

1. **공식 문서 확인 필수**: 모든 기술 결정은 공식 문서 기반 (추측 금지)
2. **프로젝트 기존 패턴 우선**: 새로운 패턴 도입 전에 기존 패턴 재사용 검토
3. **단순성 우선**: 여러 솔루션 중 가장 간단한 것 선택 (과도한 추상화 금지)
4. **MVP 범위 준수**: PRD의 MVP 기능만 구현, 추가 기능은 Phase 4+ 예약

---

## 금지 사항 (Must NOT)

### 코드 관련

❌ **환경 변수 하드코딩**
- `.env.local` 사용 필수 (git 커밋 금지)
- API Key, 데이터베이스 ID는 환경 변수로만 관리

❌ **불안정한 라이브러리 추가**
- LTS 버전만 사용 (v0.x, beta, alpha 금지)
- 유지보수가 중단된 패키지 금지

❌ **기존 경로 구조 변경**
- Route Groups 재구성 금지
- 컴포넌트 디렉토리 임의 변경 금지
- 경로 별칭 추가 변경 금지 (필요시 사용자 협의)

❌ **공식 문서 미확인 기능 사용**
- Next.js, React, TypeScript의 비공식 또는 실험적 기능 금지
- 모든 기능은 공식 문서에서 확인 후 사용

### 개발 프로세스 관련

❌ **단계 건너뛰기**
- Phase 순서 무시 금지
- 이전 단계 미완료 상태에서 후행 단계 작업 금지

❌ **중복 컴포넌트 생성**
- 기존 컴포넌트 재활용 없이 새로운 컴포넌트 생성 금지
- 동일 기능의 중복 구현 금지

❌ **SEO/성능 무시**
- Phase 5 이전: 메타데이터, 이미지 최적화 선택사항
- Phase 5부터: 필수 구현 (LCP < 2.5s, SEO 90점 이상)

---

## 모호한 상황에서의 의사결정

### "어떤 컴포넌트 디렉토리에 배치할까?"

| 상황 | 결정 |
|------|------|
| shadcn/ui 원본 컴포넌트 | `src/components/ui/` |
| Notion 콘텐츠 표시 (ProjectCard, BlogCard) | `src/components/cards/` |
| 필터, 검색 UI | `src/components/blocks/` |
| 레이아웃용 (Header, Footer, Sidebar) | `src/components/layout/` |
| 폼 (SignInForm, ForgotPasswordForm) | `src/components/forms/` |
| 페이지 섹션 (Hero, Features, CTA) | `src/components/sections/` |
| 테마, 모바일 감지 제공자 | `src/components/common/` |

### "이 API 응답을 캐시할까?"

**캐시 전략**:
- Notion API 응답: 10분~1시간 (ISR + revalidatePath 사용)
- 정적 생성: `generateStaticParams` + `generateStaticParams()`
- 동적 경로: On-Demand ISR (webhook 또는 수동 트리거)

### "이 파일은 어디에 위치할까?"

| 파일 타입 | 위치 | 예시 |
|-----------|------|------|
| Notion API 클라이언트 | `src/lib/notion.ts` | - |
| 데이터 fetching 함수 | `src/lib/notion-fetch.ts` | `getProjects()`, `getPost()` |
| 유틸리티 함수 | `src/lib/utils.ts` | `cn()`, `formatDate()`, `calculateReadingTime()` |
| 마크다운 렌더러 | `src/lib/markdown.ts` | `markdownToHtml()` |
| 타입 정의 | `src/types/index.ts` | `NotionItem`, `ProjectDetail` |
| 설정값 | `src/lib/config.ts` | `siteConfig` |
| 검증 스키마 | `src/lib/validations.ts` | `signInSchema`, `signUpSchema` |
| 커스텀 훅 | `src/hooks/use-*.ts` | `use-search.ts`, `use-filters.ts` |

---

## 체크리스트: 새로운 기능 추가 전

- [ ] 현재 Phase 상태 확인 (다음 Phase 작업 아님)
- [ ] 기존 컴포넌트 재사용 가능성 검토
- [ ] 타입 정의 → types/index.ts에서 먼저 정의
- [ ] API 함수 → lib/notion-fetch.ts에서 구현
- [ ] 컴포넌트 → 적절한 디렉토리에 배치
- [ ] TypeScript 컴파일 확인 (`npm run build`)
- [ ] ESLint 검사 (`npm run lint`)
- [ ] 모바일 반응형 테스트
- [ ] SEO 메타데이터 (Phase 5 이후)

---

**문서 수정일**: 2026-05-29  
**상태**: Initial
