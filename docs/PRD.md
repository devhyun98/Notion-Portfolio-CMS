# Notion Portfolio CMS - PRD (Product Requirements Document)

## 1. 프로젝트 개요

### 1.1 프로젝트명
**Notion Portfolio CMS**

### 1.2 목적
Notion을 CMS로 활용하여 개발자 포트폴리오, 프로젝트, 블로그 콘텐츠를 쉽게 관리하고 웹에 자동으로 반영되는 개인 포트폴리오 사이트 구축

### 1.3 CMS 선택 이유
- Notion API를 활용하여 개발자가 아닌 사람도 직관적으로 콘텐츠를 관리할 수 있음
- 별도의 관리자 페이지(Admin Dashboard) 없이 Notion에서 직접 콘텐츠 업데이트 가능
- 마크다운 지원으로 풍부한 콘텐츠 표현 가능
- 데이터베이스와 릴레이션 기능으로 유연한 콘텐츠 구조 설계 가능

---

## 2. 주요 기능

### 2.1 Notion 데이터베이스 기반 콘텐츠 관리
- Notion API를 통해 실시간 데이터 동기화
- 프로젝트, 블로그, 경험(Experience) 콘텐츠 타입 지원
- 타입별 자동 필터링 및 표시

### 2.2 프로젝트 목록 및 상세 페이지
- 프로젝트 리스트 페이지 (`/projects`)
- 개별 프로젝트 상세 페이지 (`/projects/[slug]`)
- 프로젝트 메타데이터: 제목, 설명, 기술 스택 태그, 작성일, 이미지

### 2.3 블로그 글 목록 및 상세 페이지
- 블로그 리스트 페이지 (`/blog`)
- 개별 블로그 글 상세 페이지 (`/blog/[slug]`)
- Notion Rich Text 콘텐츠를 마크다운으로 렌더링
- 작성일, 수정일, 읽는시간(Reading Time) 표시

### 2.4 About / Resume 페이지
- Notion 기반 자기소개 콘텐츠 또는 정적 데이터 연동
- 경력, 기술 스택, 교육 정보 표시
- PDF Resume 다운로드 링크 (선택사항)

### 2.5 태그 기반 필터링 및 검색
- 프로젝트/블로그 글을 기술 스택 또는 카테고리 태그로 필터링
- 검색 기능을 통한 콘텐츠 검색
- URL 기반 필터 상태 저장 (쿼리 파라미터)

### 2.6 반응형 UI 및 SEO 최적화
- 모바일, 태블릿, 데스크톱 모든 기기에 대응하는 반응형 디자인
- Open Graph, Twitter Card 메타데이터 설정
- 동적 페이지별 SEO 최적화 (`metadata`, `generateMetadata`)
- 구조화된 데이터 (Schema.org JSON-LD) 마크업
- Sitemap 및 robots.txt 생성

---

## 3. 기술 스택

| 분야 | 기술 | 버전 |
|------|------|------|
| **Frontend Framework** | Next.js | 15 (App Router) |
| **UI Library** | React | 19 |
| **Language** | TypeScript | 5 |
| **CMS / Data** | Notion API | v1 |
| **Styling** | Tailwind CSS | v4 |
| **UI Components** | shadcn/ui | base-nova |
| **Icons** | Lucide React | - |
| **Deployment** | Vercel | - |
| **Package Manager** | npm | - |

### 3.1 개발 환경
- **Node.js**: LTS 버전 (18+)
- **ESLint**: 코드 품질 검사
- **TypeScript**: 타입 안정성 보장

---

## 4. Notion 데이터베이스 구조

### 4.1 메인 데이터베이스: "Portfolio" 또는 "Contents"

| 속성명 | 타입 | 설명 | 필수 | 예시 |
|--------|------|------|------|------|
| **title** | Title | 프로젝트/글 제목 | ✓ | "Next.js 포트폴리오 사이트" |
| **type** | Select | 콘텐츠 타입 | ✓ | project \| blog \| experience |
| **description** | Rich Text | 요약 설명 (150자 이내) | ✓ | "Notion API 기반 포트폴리오..." |
| **content** | Rich Text | 상세 내용 (마크다운) | ✓ | "## 개요\n프로젝트 상세..." |
| **tags** | Multi-select | 기술/카테고리 태그 | - | Next.js, React, Notion API |
| **date** | Date | 작성일 | ✓ | 2026-05-26 |
| **slug** | Rich Text | URL slug (고유값) | ✓ | "nextjs-portfolio" |
| **published** | Checkbox | 공개 여부 | ✓ | true |
| **featuredImage** | File | 대표 이미지 | - | [이미지 URL] |
| **category** | Select | 카테고리 (선택) | - | Frontend, Backend, DevOps |

### 4.2 데이터베이스 필터 설정
```
- published = true (공개된 글만 표시)
- type = "project" OR "blog" (경험 제외 또는 별도 필터)
```

### 4.3 정렬 순서
- **Projects**: date 역순 (최신순)
- **Blog**: date 역순 (최신순)
- **About/Resume**: 커스텀 순서 또는 date 오름차순

---

## 5. 화면 구성 및 라우팅

### 5.1 라우팅 맵

| 경로 | 설명 | 데이터 소스 | 컴포넌트 |
|------|------|----------|---------|
| `/` | 홈 페이지 (포트폴리오 소개) | Notion 일부 + 정적 | `page.tsx` |
| `/projects` | 프로젝트 리스트 | Notion (type='project') | `projects/page.tsx` |
| `/projects/[slug]` | 프로젝트 상세 | Notion (slug 매칭) | `projects/[slug]/page.tsx` |
| `/blog` | 블로그 리스트 | Notion (type='blog') | `blog/page.tsx` |
| `/blog/[slug]` | 블로그 글 상세 | Notion (slug 매칭) | `blog/[slug]/page.tsx` |
| `/about` | 자기소개 페이지 | Notion 또는 정적 | `about/page.tsx` |
| `/resume` | 이력서 페이지 (선택) | PDF 또는 정적 | `resume/page.tsx` |

### 5.2 레이아웃 구조

```
root layout (ThemeProvider, TooltipProvider, Toaster)
├── (marketing)
│   ├── layout.tsx (Header + Footer)
│   ├── page.tsx (/)
│   ├── projects/
│   │   ├── page.tsx (/projects)
│   │   └── [slug]/page.tsx (/projects/[slug])
│   ├── blog/
│   │   ├── page.tsx (/blog)
│   │   └── [slug]/page.tsx (/blog/[slug])
│   ├── about/page.tsx (/about)
│   └── resume/page.tsx (/resume - optional)
└── (auth) - 미래 확장용 (로그인, 관리자)
```

### 5.3 홈 페이지 (/)
- **섹션 1**: Hero 소개 (이름, 직책, 한 줄 소개)
- **섹션 2**: 최신 프로젝트 3-4개 (카드 형식)
- **섹션 3**: 최신 블로그 글 2-3개 (리스트 형식)
- **섹션 4**: CTA (모든 프로젝트 보기, 블로그 더 보기)
- **Footer**: 소셜 링크, 연락처

### 5.4 프로젝트 리스트 (/projects)
- 전체 프로젝트 리스트 (카드 그리드: 2-3컬럼)
- **필터 사이드바**: 태그별 필터링
- **검색 박스**: 제목 또는 설명으로 검색
- **정렬**: 최신순, 인기순 (조회수 미지원 시 날짜순만)
- 페이지네이션 (12개씩) 또는 무한 스크롤

### 5.5 프로젝트 상세 (/projects/[slug])
- **헤더**: 제목, 날짜, 태그
- **메타 정보**: 대표 이미지, 기술 스택 배지
- **콘텐츠**: Notion Rich Text 렌더링
- **네비게이션**: 이전/다음 프로젝트 링크
- **관련 프로젝트**: 같은 태그를 가진 다른 프로젝트 3-4개

### 5.6 블로그 리스트 (/blog)
- 전체 블로그 글 리스트 (보드 형식)
- **필터 사이드바**: 카테고리 또는 태그 필터
- **검색 박스**: 제목, 설명, 태그로 검색
- **정렬**: 최신순, 조회순 (미지원 시 날짜순만)
- 페이지네이션 (15개씩) 또는 무한 스크롤
- 각 글 미리보기: 제목, 작성일, 읽는시간, 첫 100자

### 5.7 블로그 글 상세 (/blog/[slug])
- **헤더**: 제목, 작성일, 수정일, 읽는시간, 작가
- **목차 (ToC)**: 마크다운 헤딩 기반 자동 생성
- **콘텐츠**: 마크다운 렌더링 (코드 하이라이팅 지원)
- **태그**: 글의 모든 태그 표시
- **네비게이션**: 이전/다음 글 링크
- **관련 글**: 같은 태그를 가진 다른 글 3-4개
- **코멘트**: Disqus 또는 Giscus (선택사항)

### 5.8 About 페이지 (/about)
- **자기소개**: 프로필 사진 + 간단한 소개글
- **경력사항**: 학력, 직무 경력, 프로젝트 경험
- **기술 스택**: 주요 기술을 카테고리별로 정렬
  - Languages: JavaScript, TypeScript, Python, ...
  - Frontend: React, Next.js, Tailwind CSS, ...
  - Backend: Node.js, Express, PostgreSQL, ...
  - Tools: Git, Docker, AWS, ...
- **연락처**: 이메일, GitHub, LinkedIn, Twitter 등

### 5.9 Resume 페이지 (/resume) - 선택사항
- 이력서 페이지 또는 PDF 다운로드 링크
- Notion 기반 또는 정적 HTML 마크업

---

## 6. 핵심 컴포넌트 및 유틸리티

### 6.1 컴포넌트 목록

#### UI Components (shadcn/ui)
- `Button`, `Card`, `Badge`, `Input`, `Select`
- `Tabs`, `Pagination`, `Skeleton`
- `Breadcrumb`, `Separator`

#### Custom Components
- **`<ProjectCard>`**: 프로젝트 카드 (제목, 설명, 태그, 이미지)
- **`<BlogCard>`**: 블로그 글 카드 (제목, 날짜, 읽는시간, 미리보기)
- **`<TagFilter>`**: 태그 필터 사이드바
- **`<SearchBox>`**: 검색 입력창
- **`<RelatedContent>`**: 관련 프로젝트/글 섹션
- **`<TableOfContents>`**: 블로그 목차
- **`<CodeBlock>`**: 마크다운 코드 블록 (Syntax Highlighting)
- **`<NotionRenderer>`**: Notion Rich Text → React 컴포넌트 변환

### 6.2 유틸리티 및 훅
- **`lib/notion.ts`**: Notion API 클라이언트 및 fetch 함수
- **`lib/utils.ts`**: `cn()` 클래스 병합 유틸리티
- **`lib/config.ts`**: 사이트 메타정보 (제목, 설명, 저자, SNS 링크)
- **`hooks/use-search.ts`**: 검색 상태 관리
- **`hooks/use-filters.ts`**: 필터 상태 관리
- **`hooks/use-mobile.ts`**: 모바일 기기 감지 (기존 활용)

### 6.3 타입 정의 (`types/index.ts`)
```typescript
interface NotionItem {
  id: string;
  title: string;
  type: 'project' | 'blog' | 'experience';
  description: string;
  content: string; // Rich Text
  tags: string[];
  date: string;
  slug: string;
  published: boolean;
  featuredImage?: string;
  category?: string;
}

interface ProjectDetail extends NotionItem {
  type: 'project';
  techStack: string[];
  demoUrl?: string;
  sourceUrl?: string;
}

interface BlogDetail extends NotionItem {
  type: 'blog';
  readingTime: number;
  updatedAt?: string;
  tableOfContents: TocItem[];
}

interface TocItem {
  level: number;
  title: string;
  id: string;
}
```

---

## 7. MVP (Minimum Viable Product) 범위

### 7.1 필수 기능 (Phase 1)
- [x] Next.js 프로젝트 기본 구조 설정
- [ ] Notion API 연동 및 데이터 fetching 구조 구현
- [ ] 프로젝트 리스트 페이지 (`/projects`)
- [ ] 프로젝트 상세 페이지 (`/projects/[slug]`)
- [ ] 블로그 리스트 페이지 (`/blog`)
- [ ] 블로그 상세 페이지 (`/blog/[slug]`) + 마크다운 렌더링
- [ ] 홈 페이지 기본 레이아웃 (최신 프로젝트/글 표시)
- [ ] 태그 기반 필터링 (선택사항)
- [ ] 반응형 UI (Tailwind + shadcn/ui)
- [ ] 기본 SEO 설정 (metadata, Open Graph)

### 7.2 Phase 2 (추가 기능)
- [ ] 전체 텍스트 검색 기능
- [ ] About / Resume 페이지
- [ ] 블로그 목차 (Table of Contents)
- [ ] 관련 콘텐츠 제안
- [ ] 태그 페이지 (`/tags/[tag]`)
- [ ] 댓글 기능 (Giscus, Disqus)
- [ ] 뷰 카운팅 (선택사항)

### 7.3 향후 확장 (Phase 3)
- [ ] 관리자 대시보드 (콘텐츠 통계)
- [ ] 뉴스레터 구독 (이메일 수집)
- [ ] 다국어 지원 (i18n)
- [ ] 다크모드 전환 (기존: next-themes)
- [ ] 성능 최적화 (ISR, 캐싱 전략)

---

## 8. 데이터 흐름 아키텍처

```
┌─────────────────┐
│  Notion API     │
│  Database       │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│  Next.js API Route  │
│  (Server Actions)   │
│  lib/notion.ts      │
└────────┬────────────┘
         │
         ▼
┌──────────────────────────┐
│  Static Generation (ISR) │
│  generateStaticParams()  │
│  revalidatePath()        │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  React Components        │
│  (Client + Server)       │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Rendered HTML           │
│  (Browser)               │
└──────────────────────────┘
```

### 8.1 Fetching 전략
- **정적 생성 (SSG)**: 프로젝트, 블로그 상세 페이지 (`generateStaticParams`)
- **증분 정적 재생성 (ISR)**: 콘텐츠 변경 시 자동 재빌드 (revalidateTag)
- **캐싱**: Notion API 응답 캐싱 (10분~1시간)
- **On-Demand ISR**: 콘텐츠 업데이트 시 webhook 또는 수동 트리거

---

## 9. SEO 및 성능 최적화

### 9.1 SEO 전략
- **페이지별 메타데이터**: `generateMetadata()` 활용
  ```typescript
  export async function generateMetadata({ params }: Props) {
    const post = await getPost(params.slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: [post.featuredImage],
      },
    };
  }
  ```
- **구조화된 데이터**: Schema.org JSON-LD 마크업
  - BlogPosting (블로그), SoftwareApplication (프로젝트)
- **Sitemap**: `sitemap.xml` 자동 생성
- **Robots.txt**: SEO 크롤러 가이드라인
- **메타 태그**: Canonical URL, og:image, twitter:card

### 9.2 성능 최적화
- **이미지 최적화**: Next.js Image 컴포넌트
- **코드 분할**: 동적 import (마크다운 렌더러 등)
- **캐싱 헤더**: CDN 캐싱 (Vercel Edge Network)
- **번들 분석**: 불필요한 의존성 제거
- **Lighthouse 점수 목표**: LCP < 2.5s, FID < 100ms, CLS < 0.1

### 9.3 Vercel 배포 설정
- **Preview Deployments**: PR마다 자동 미리보기
- **Production Deployments**: main 브랜치 푸시 시 자동 배포
- **환경 변수**: `NOTION_API_KEY`, `NOTION_DATABASE_ID` (Secrets 관리)

---

## 10. 구현 단계별 타임라인

### Phase 1: MVP (4주)

**Week 1: 프로젝트 세팅 및 Notion API 연동**
- [ ] Next.js 프로젝트 기본 구조 및 라우팅 설정
- [ ] Notion API 클라이언트 구현 (`lib/notion.ts`)
- [ ] 환경 변수 설정 (.env.local)
- [ ] TypeScript 타입 정의 (`types/index.ts`)

**Week 2: 프로젝트 페이지 구현**
- [ ] `/projects` 페이지 (리스트)
- [ ] `/projects/[slug]` 페이지 (상세)
- [ ] ProjectCard 컴포넌트
- [ ] 기본 스타일링 (Tailwind + shadcn/ui)

**Week 3: 블로그 페이지 구현**
- [ ] `/blog` 페이지 (리스트)
- [ ] `/blog/[slug]` 페이지 (상세)
- [ ] 마크다운 렌더러 (remark + rehype)
- [ ] BlogCard 컴포넌트
- [ ] 코드 하이라이팅 (Prism 또는 highlight.js)

**Week 4: 홈 페이지, SEO, 배포**
- [ ] 홈 페이지 (`/`) 구현
- [ ] SEO 메타데이터 설정
- [ ] Vercel 배포
- [ ] 성능 최적화 및 테스트

### Phase 2: 추가 기능 (2주)
- [ ] 검색 기능
- [ ] 태그 필터링
- [ ] About 페이지
- [ ] 관련 콘텐츠 섹션

### Phase 3: 고도화 (진행 중)
- [ ] 댓글 시스템
- [ ] 뉴스레터 구독
- [ ] 다국어 지원
- [ ] 성능 모니터링

---

## 11. 성공 지표 (KPI)

| 지표 | 목표값 | 측정 방법 |
|------|--------|----------|
| 페이지 로딩 속도 (LCP) | < 2.5초 | Lighthouse, Core Web Vitals |
| SEO 점수 | 90점 이상 | Lighthouse SEO 점수 |
| 모바일 반응성 | 모든 뷰포트 대응 | 수동 테스트 + 자동 E2E 테스트 |
| 배포 시간 | < 5분 | Vercel 대시보드 |
| 코드 커버리지 | 60%+ | 자동화 테스트 |

---

## 12. 리스크 및 대응책

| 리스크 | 영향도 | 대응책 |
|--------|--------|--------|
| **Notion API 속도 저하** | 높음 | 캐싱 전략 강화, 데이터 프리페칭 |
| **콘텐츠 마이그레이션** | 중간 | Notion 템플릿 사전 정의 |
| **모바일 UX** | 높음 | 초기부터 반응형 테스트 |
| **SEO 미흡** | 중간 | 메타데이터 자동 생성, 정기 감시 |

---

## 13. 팀 및 책임 분담

| 역할 | 담당자 | 책임 |
|------|--------|------|
| **Full-stack Developer** | (본인) | 전체 개발 및 배포 |
| **Content Manager** | (선택사항) | Notion 콘텐츠 관리 |
| **Designer** | (선택사항) | UI/UX 디자인 가이드 |

---

## 14. 참고 자료 및 외부 링크

- **Notion API 공식 문서**: https://developers.notion.com/
- **Next.js 공식 문서**: https://nextjs.org/docs
- **shadcn/ui**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **마크다운 렌더러**: https://github.com/remarkjs/remark
- **Vercel 배포**: https://vercel.com/

---

**문서 최종 수정일**: 2026-05-26  
**상태**: Draft → Review → Final
