# Notion Portfolio CMS - 개발 로드맵 (ROADMAP)

## 개발 전략

이 로드맵은 **의존성이 적은 것부터 시작**하여 **단계적으로 복잡도를 높이는** 방식으로 구성됩니다. 각 단계는 이전 단계에서 만들어진 기반 위에서 진행되므로, 순서를 지키는 것이 중요합니다.

---

## Phase 1: 프로젝트 초기 설정 (골격 구축) ✅

**상태**: ✅ 완료

### 목표
Next.js 앱의 기본 골격을 완성하고, 나머지 단계에서 필요한 구조와 설정을 준비합니다.

### 포함 사항
- [x] Next.js 프로젝트 기본 구조 (App Router)
- [x] TypeScript 설정
- [x] Tailwind CSS v4 설정
- [x] shadcn/ui 설정 (base-nova 스타일)
- [x] 레이아웃 구조 설정 (route groups: marketing, auth, dashboard)
- [x] 환경 변수 파일 (.env.local)

### 왜 이 순서인가?
모든 개발 작업의 기초가 되므로, **반드시 먼저 완료**되어야 합니다. 기본 설정 없이는 컴포넌트 개발이나 페이지 구현이 불가능합니다.

### 예상 소요 시간
2-3시간 

### 완료 기준
- [x] `npm run dev` 실행 시 localhost:3000 접속 가능
- [x] `npm run build` 성공
- [x] TypeScript 에러 없음

---

## Phase 2: 공통 모듈 및 컴포넌트 개발 ✅

**상태**: ✅ 완료

### 목표
프로젝트 전체에서 재사용할 수 있는 **공통 함수, 훅, 컴포넌트**를 구현합니다. 이 단계에서 만든 것들은 Phase 3, 4의 페이지 개발에서 직접 사용됩니다.

### 포함 사항

#### 2-1. Notion API 클라이언트 구현
- `lib/notion.ts`: Notion API 클라이언트 초기화
- `lib/notion-fetch.ts`: 데이터 fetching 함수
  - `getNotionDatabase()`: 전체 데이터 조회
  - `getNotionItem()`: slug 기반 단일 항목 조회
  - `getNotionItemsByType()`: type 필터링 조회
- 캐싱 전략 구현 (10분~1시간)
- 에러 핸들링

#### 2-2. 타입 정의 (`types/index.ts`)
```typescript
interface NotionItem { ... }
interface ProjectDetail extends NotionItem { ... }
interface BlogDetail extends NotionItem { ... }
interface TocItem { ... }
```

#### 2-3. 공통 UI 컴포넌트 (shadcn/ui)
- Button, Card, Badge, Input, Select
- Tabs, Pagination, Skeleton
- Breadcrumb, Separator
- (shadcn/ui add 명령으로 추가)

#### 2-4. 커스텀 컴포넌트
- **`<ProjectCard>`**: 프로젝트 카드 (제목, 설명, 태그, 이미지)
- **`<BlogCard>`**: 블로그 글 카드 (제목, 날짜, 읽는시간, 미리보기)
- **`<TagBadge>`**: 태그 배지
- **`<MetaInfo>`**: 날짜, 작가, 읽는시간 표시

#### 2-5. 마크다운 렌더러 설정
- `remark` + `rehype` 의존성 추가
- `lib/markdown.ts`: 마크다운 → HTML 변환 함수
- 코드 하이라이팅 (Prism.js 또는 highlight.js)
- 목차 자동 생성 유틸리티

#### 2-6. 유틸리티 함수
- `lib/utils.ts`: 
  - `cn()`: className 병합 (clsx + tailwind-merge)
  - `formatDate()`: 날짜 포맷팅
  - `calculateReadingTime()`: 읽는시간 계산
  - `generateSlug()`: 텍스트 → slug 변환

#### 2-7. 공통 훅
- `hooks/use-search.ts`: 검색 상태 관리
- `hooks/use-filters.ts`: 필터 상태 관리 (쿼리 파라미터 기반)
- `hooks/use-mobile.ts`: 모바일 기기 감지 (기존 구현)

### 왜 이 순서인가?
**Phase 3에서 페이지를 만들 때 이 컴포넌트들이 필요**하므로, 반드시 먼저 준비되어야 합니다. 공통 컴포넌트가 없으면 각 페이지에서 중복된 코드를 작성하게 됩니다.

### 예상 소요 시간
3-4일 (약 24-32시간)

### 완료 기준
- [x] Notion API 클라이언트가 정상 작동 (테스트 콘솔로 데이터 확인)
- [x] 모든 타입 정의 완료
- [x] ProjectCard, BlogCard 컴포넌트 Storybook 또는 개별 테스트
- [x] 마크다운 렌더링 테스트 완료 (코드 블록, 제목 등)
- [x] 유틸리티 함수 단위 테스트 (날짜, slug 생성 등)

---

## Phase 3: 핵심 기능 개발 (페이지 구현) ✅

**상태**: ✅ 완료

### 목표
**MVP의 핵심 페이지**를 구현합니다. 이 단계가 완료되면 기본 포트폴리오 사이트로 동작합니다.

### 포함 사항

#### 3-1. 프로젝트 페이지 (2-3일) ✅
- **`/projects`** (프로젝트 목록)
  - ✅ ProjectCard 그리드 레이아웃 (2-3 컬럼)
  - ✅ 전체 프로젝트 조회
  - ✅ 기본 스타일링
  - ✅ Skeleton 로딩 UI

- **`/projects/[slug]`** (프로젝트 상세)
  - ✅ 제목, 날짜, 태그, 대표 이미지 표시
  - ✅ Notion Rich Text 콘텐츠 렌더링
  - ✅ 기술 스택 배지
  - ✅ generateStaticParams 설정 (정적 생성)
  - ✅ 브레드크럼 네비게이션

#### 3-2. 블로그 페이지 (3-4일) ✅
- **`/blog`** (블로그 목록)
  - ✅ BlogCard 리스트 레이아웃
  - ✅ 전체 글 조회
  - ✅ 각 글 미리보기 (읽는시간 포함)
  - ✅ Skeleton 로딩 UI

- **`/blog/[slug]`** (블로그 글 상세)
  - ✅ 제목, 작성일, 수정일, 읽는시간 표시
  - ✅ 마크다운 콘텐츠 렌더링 + prose 스타일
  - ✅ 코드 하이라이팅
  - ✅ 목차 자동 생성 및 사이드바
  - ✅ generateStaticParams 설정
  - ✅ 브레드크럼 네비게이션

#### 3-3. 홈 페이지 (2-3일) ✅
- **`/`** (메인 페이지)
  - ✅ Hero 섹션 (이름, 직책, 한 줄 소개)
  - ✅ 최신 프로젝트 4개 (카드 그리드)
  - ✅ 최신 블로그 글 3개 (리스트)
  - ✅ CTA 섹션 (프로젝트 더 보기, 블로그 더 보기)
  - ✅ 완전 반응형 레이아웃

#### 3-4. 레이아웃 및 네비게이션 (1-2일) ✅
- ✅ 공통 Header 구현
  - ✅ 로고, 네비게이션 메뉴
  - ✅ 테마 토글 (next-themes 활용, Sun/Moon 아이콘)
  - ✅ 모바일 Sheet 메뉴 (768px 기준)
  - ✅ 활성 링크 하이라이팅
- ✅ 공통 Footer 구현
  - ✅ 저작권 정보
  - ✅ 소셜 링크 텍스트 표시
- ✅ Container 래퍼 컴포넌트 (max-w-7xl)
- ✅ 반응형 모바일 네비게이션

### 왜 이 순서인가?
**이 3개 페이지가 포트폴리오 사이트의 핵심**이므로, 이 단계가 완료되면 이미 완성된 사이트처럼 보입니다. 검색과 필터링은 "nice to have"이지만, 프로젝트/블로그 페이지는 "must have"입니다.

### 예상 소요 시간
7-10일 (약 56-80시간) → **실제 소요: 약 8시간** ⚡

### 완료 기준
- [x] 모든 페이지에서 Notion 데이터가 정상 표시됨
- [x] 마크다운 콘텐츠가 올바르게 렌더링됨
- [x] 모바일/태블릿/데스크톱에서 반응형으로 동작
- [x] `npm run build` 성공
- [x] TypeScript 에러 없음
- [x] 모든 라우트 정상 생성 (/ /projects /projects/[slug] /blog /blog/[slug])

---

## Phase 4: 추가 기능 개발

**상태**: ⏳ 진행 예정

### 목표
사용자 경험을 향상시키는 **추가 기능**을 구현합니다. Phase 3이 완료된 후, 이 기능들이 없어도 기본 동작하는 사이트에 "편의 기능"을 더합니다.

### 포함 사항

#### 4-1. 검색 및 필터링 (2-3일)
- **`/projects` 검색/필터**
  - 제목 + 설명 텍스트 검색
  - 태그별 필터 사이드바
  - 필터 상태를 URL 쿼리 파라미터로 저장
  
- **`/blog` 검색/필터**
  - 제목 + 설명 텍스트 검색
  - 카테고리/태그 필터
  - 필터 상태 저장

- 컴포넌트: `<SearchBox>`, `<TagFilter>`
- 훅: `use-search.ts`, `use-filters.ts` 완성

#### 4-2. About 페이지 (1-2일)
- **`/about`**
  - 자기소개 텍스트
  - 프로필 사진
  - 경력사항 (학력, 직무 경력)
  - 기술 스택 (카테고리별)
  - 연락처 정보

#### 4-3. 관련 콘텐츠 섹션 (1-2일)
- 프로젝트/블로그 상세 페이지 하단에
  - 같은 태그를 가진 다른 항목 3-4개 표시
  - `<RelatedContent>` 컴포넌트

#### 4-4. 태그 페이지 (1일, 선택사항)
- **`/tags/[tag]`**
  - 특정 태그의 모든 프로젝트 + 블로그 글
  - 태그별 아카이브 페이지

#### 4-5. Resume 페이지 (1일, 선택사항)
- **`/resume`**
  - 이력서 HTML 또는 PDF 표시
  - PDF 다운로드 링크

#### 4-6. 블로그 목차 (Table of Contents) (1-2일)
- 마크다운 헤딩 기반 자동 생성
- 사이드바 또는 상단에 고정
- 클릭하면 해당 섹션으로 스크롤
- `<TableOfContents>` 컴포넌트

### 왜 이 순서인가?
**Phase 3의 기본 기능이 완성된 후** 이 기능들을 추가하면, 기존 코드를 건드리지 않고 새 기능을 독립적으로 개발할 수 있습니다. 검색과 필터는 많은 사용자가 원하는 기능이므로 우선순위가 높습니다.

### 예상 소요 시간
5-7일 (약 40-56시간)

### 완료 기준
- [ ] 검색 기능이 정확한 결과 반환
- [ ] 필터 적용 시 URL이 변경되고, URL 직접 접근 시 필터 상태 복원
- [ ] About 페이지에 모든 정보 표시
- [ ] 관련 콘텐츠 추천이 올바르게 작동
- [ ] 목차가 자동으로 생성되고 스크롤 추적
- [ ] 모든 새 페이지가 반응형으로 동작

---

## Phase 5: 최적화 및 배포

**상태**: ⏳ 진행 예정

### 목표
프로덕션 배포를 위해 **성능, SEO, 보안**을 최적화하고 Vercel에 배포합니다.

### 포함 사항

#### 5-1. SEO 최적화 (2-3일)
- **동적 메타데이터 생성**
  - 각 페이지에서 `generateMetadata()` 구현
  - Open Graph (og:title, og:description, og:image)
  - Twitter Card (twitter:card, twitter:image)
  - Canonical URL

- **Sitemap 자동 생성**
  - `public/sitemap.xml` 생성 (또는 `app/sitemap.ts`)
  - 모든 프로젝트, 블로그, 정적 페이지 포함

- **robots.txt**
  - SEO 크롤러 가이드라인 설정

- **구조화된 데이터** (Schema.org JSON-LD)
  - BlogPosting (블로그)
  - SoftwareApplication (프로젝트)
  - Person (자기소개)

#### 5-2. 성능 최적화 (2-3일)
- **이미지 최적화**
  - Next.js `<Image>` 컴포넌트 활용
  - lazy loading, 자동 포맷 변환 (webp)
  - 썸네일 생성

- **번들 최적화**
  - 불필요한 의존성 제거
  - dynamic import (마크다운 렌더러 등)
  - 코드 분할 확인

- **캐싱 전략**
  - HTTP 캐시 헤더 설정
  - Notion API 응답 캐싱 강화
  - ISR (Incremental Static Regeneration) revalidate 시간 설정

- **Lighthouse 점수 개선**
  - LCP < 2.5초 달성
  - FID < 100ms 달성
  - CLS < 0.1 달성
  - SEO 점수 90점 이상

#### 5-3. 환경 변수 및 보안 (1-2일)
- `.env.local` 설정 검증
  - `NOTION_API_KEY` 안전한 저장
  - `NOTION_DATABASE_ID` 설정
- 의존성 보안 검사 (`npm audit`)
- CORS 및 CSP 헤더 설정

#### 5-4. Vercel 배포 (1-2일)
- Vercel 프로젝트 생성 및 연결
- GitHub 레포지토리 연결
- 환경 변수 설정 (Vercel Secrets)
- Preview Deployment 설정 (PR마다 자동 빌드)
- Production Deployment 설정 (main 브랜치 푸시 시 자동 배포)
- 배포 후 성능 모니터링

#### 5-5. 테스트 및 검증 (1-2일)
- 모든 링크 검증
- 모바일/데스크톱 크로스 브라우저 테스트
- Lighthouse 성능 검사
- SEO 메타데이터 검증 (og:tags 확인)
- 콘텐츠 마이그레이션 검증 (Notion → 웹사이트)

### 왜 이 순서인가?
**기능 개발이 완료된 후**, 사용자에게 공개하기 전에 반드시 최적화가 필요합니다. 느린 사이트나 SEO가 부족한 사이트는 사용자 경험을 해치고 검색 순위에 영향을 줍니다.

### 예상 소요 시간
6-8일 (약 48-64시간)

### 완료 기준
- [ ] Lighthouse 점수: 성능 90점 이상, SEO 95점 이상
- [ ] `npm run build` 성공 (빌드 시간 < 60초)
- [ ] Vercel 배포 완료
- [ ] 모든 메타데이터 검증 완료
- [ ] robots.txt, sitemap.xml 정상 생성
- [ ] 프로덕션 URL에서 모든 기능 정상 작동

---

## 전체 타임라인 요약

| Phase | 단계 | 예상 기간 | 실제 소요 | 상태 |
|-------|------|---------|---------|------|
| **Phase 1** | 프로젝트 초기 설정 | 2-3시간 | ~2시간 | ✅ 완료 |
| **Phase 2** | 공통 모듈/컴포넌트 | 3-4일 | ~6시간 | ✅ 완료 |
| **Phase 3** | 핵심 기능 (페이지) | 7-10일 | ~8시간 | ✅ 완료 |
| **Phase 4** | 추가 기능 | 5-7일 | - | ⏳ 진행 예정 |
| **Phase 5** | 최적화 및 배포 | 6-8일 | - | ⏳ 진행 예정 |
| **총 소요 시간** | - | **약 3-4주** | **~16시간** | 진행 중 |

---

## 다음 단계

### ✅ Phase 3 완료! 🎉

**구현된 내용:**
- [x] 모든 페이지 라우팅 완성 (/, /projects, /projects/[slug], /blog, /blog/[slug])
- [x] 레이아웃 컴포넌트 구현 (Header, Footer, Container)
- [x] 테마 토글 완성 (next-themes + Sun/Moon 아이콘)
- [x] 마크다운 렌더링 + 목차 생성
- [x] 동적 메타데이터 (generateMetadata)
- [x] 정적 생성 (generateStaticParams)
- [x] Skeleton 로딩 UI
- [x] 브레드크럼 네비게이션
- [x] `npm run build` 성공 ✅

---

### 📋 Phase 4 시작 준비

다음 단계 (Phase 4)에서 구현할 기능:

1. **검색 및 필터링** (2-3일)
   - 프로젝트/블로그 검색 기능
   - 태그별 필터링
   - 필터 상태 URL 저장

2. **About 페이지** (1-2일)
   - 자기소개 콘텐츠
   - 기술 스택 표시
   - 경력사항

3. **관련 콘텐츠 섹션** (1-2일)
   - 같은 태그의 다른 콘텐츠 추천

4. **추가 페이지** (선택사항)
   - `/tags/[tag]` - 태그별 아카이브
   - `/resume` - 이력서 페이지

---

**마지막 업데이트**: 2026-06-02
**📊 진행 상황**: Phase 1, 2, 3 완료 ✅ | Phase 4, 5 진행 예정
