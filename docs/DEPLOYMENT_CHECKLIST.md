# Notion Portfolio CMS - Vercel 배포 체크리스트

Vercel에 배포하기 전과 후에 다음 항목들을 확인하세요.

---

## Phase 1: 배포 전 최종 점검 ✅

### 1.1 코드 품질 검증

- [ ] **로컬 빌드 성공**
  ```bash
  npm run build
  ```
  - 빌드 시간: ~1.8초 이내
  - TypeScript 에러 없음
  - `.next/` 디렉토리 생성됨

- [ ] **ESLint 검사 통과**
  ```bash
  npm run lint
  ```
  - 모든 파일 검사 통과 또는 경고만 있음

- [ ] **개발 서버 실행 확인**
  ```bash
  npm run dev
  ```
  - localhost:3000 접속 가능
  - 콘솔 에러 없음
  - 모든 페이지 정상 작동

### 1.2 Git 저장소 준비

- [ ] **변경사항 확인**
  ```bash
  git status
  ```
  - 커밋해야 할 변경사항 없음
  - Untracked 파일 없음

- [ ] **최종 커밋 및 푸시**
  ```bash
  git add .
  git commit -m "chore: Phase 5-2 Vercel 배포 준비 완료"
  git push origin main
  ```

- [ ] **원격 저장소 동기화**
  - GitHub에 모든 커밋이 푸시됨
  - main 브랜치가 최신 상태

### 1.3 환경 설정 검증

- [ ] **`.env.local` 파일 존재**
  - `NOTION_API_KEY` 설정됨
  - `NOTION_DATABASE_ID` 설정됨
  - `NEXT_PUBLIC_SITE_URL` 설정됨 (임시: http://localhost:3000 가능)

- [ ] **`.env.example` 파일 존재**
  - 모든 환경 변수 문서화됨
  - API Key 값은 포함 안 됨 (보안)

- [ ] **`.gitignore` 확인**
  - `.env.local` 무시됨
  - `.env.*.local` 무시됨
  - `node_modules/` 무시됨

### 1.4 Notion 데이터베이스 검증

- [ ] **Notion 계정 접근 가능**
  - notion.so 로그인 성공
  - 포트폴리오 Database 접근 가능

- [ ] **Database 구조 확인**
  - `title` 속성: Text/Title 타입
  - `type` 속성: Select (project, blog, experience)
  - `content` 속성: Rich Text (마크다운 콘텐츠)
  - `published` 속성: Checkbox
  - `slug` 속성: Rich Text (고유값)
  - `tags` 속성: Multi-select
  - `date` 속성: Date

- [ ] **샘플 데이터 확인**
  - 프로젝트 최소 1개 (published=true)
  - 블로그 글 최소 1개 (published=true)
  - 각 항목에 필수 속성 값 입력됨

- [ ] **Notion API Integration 생성**
  - https://www.notion.so/my-integrations 접속
  - "Create new integration" 클릭
  - Integration 이름: "Notion CMS" 등
  - API Key 복사 및 저장

- [ ] **Database 권한 설정**
  - Notion Database 열기
  - 오른쪽 상단 "share" 클릭
  - "Invite" → Integration 검색
  - 위에서 생성한 Integration 추가

### 1.5 배포 파일 검증

- [ ] **`vercel.json` 존재**
  - buildCommand: "next build"
  - framework: "nextjs"
  - nodeVersion: "20.x"
  - env: NOTION_API_KEY, NOTION_DATABASE_ID, NEXT_PUBLIC_SITE_URL

- [ ] **`.vercelignore` 존재**
  - `.git/` 무시됨
  - `node_modules/` 무시됨
  - `.env.local` 무시됨

- [ ] **`next.config.ts` 최적화됨**
  - Notion API 응답 캐싱 설정
  - 정적 생성 (SSG) 설정
  - 이미지 최적화 설정

### 1.6 SEO 파일 검증

- [ ] **`app/sitemap.ts` 존재**
  - 정적 라우트 포함
  - 동적 라우트 포함
  - priority 설정됨

- [ ] **`app/robots.ts` 존재**
  - User-Agent: * 설정
  - Disallow 규칙 설정
  - Sitemap 참조

- [ ] **각 페이지 `generateMetadata()` 설정**
  - title, description
  - openGraph (og:title, og:description, og:image, og:url)
  - twitter (twitter:card, twitter:image)

### 1.7 성능 및 호환성

- [ ] **Lighthouse 점수 (로컬)**
  ```bash
  # Chrome DevTools → Lighthouse → Analyze page load
  ```
  - Performance: 80점 이상
  - SEO: 90점 이상

- [ ] **반응형 디자인 확인**
  - 모바일 (375px): 정상
  - 태블릿 (768px): 정상
  - 데스크톱 (1440px): 정상

- [ ] **브라우저 호환성**
  - Chrome: 최신
  - Firefox: 최신
  - Safari: 최신
  - Edge: 최신

---

## Phase 2: Vercel 배포 ✅

### 2.1 Vercel 계정 설정

- [ ] **Vercel 계정 생성**
  - https://vercel.com 방문
  - "Sign Up" → "Continue with GitHub"
  - GitHub 로그인 및 인증

- [ ] **GitHub 권한 부여**
  - Vercel이 GitHub 접근 권한 요청
  - "Authorize Vercel" 클릭
  - notion-cms-project 리포지토리 접근 허용

### 2.2 Vercel 프로젝트 생성

- [ ] **프로젝트 import**
  - Vercel 대시보드: "Add New Project"
  - "Import Git Repository" 선택
  - `notion-cms-project` 검색 및 선택
  - "Import" 클릭

- [ ] **프로젝트 기본 설정**
  - Framework Preset: Next.js
  - Build Command: next build (기본값)
  - Output Directory: .next (기본값)
  - Install Command: npm install (기본값)

### 2.3 환경 변수 설정

- [ ] **Settings → Environment Variables 진입**
  - Vercel 프로젝트 페이지
  - "Settings" 탭
  - 왼쪽 메뉴 "Environment Variables"

- [ ] **NOTION_API_KEY 추가**
  - Variable Name: `NOTION_API_KEY`
  - Value: [Notion Integration API Key]
  - Environment: Production, Preview, Development 모두 선택
  - "Save" 클릭

- [ ] **NOTION_DATABASE_ID 추가**
  - Variable Name: `NOTION_DATABASE_ID`
  - Value: [Notion Database ID (32자)]
  - Environment: Production, Preview, Development 모두 선택
  - "Save" 클릭

- [ ] **NEXT_PUBLIC_SITE_URL 추가**
  - Variable Name: `NEXT_PUBLIC_SITE_URL`
  - Value: `https://[project-name].vercel.app` (초기)
  - Environment: Production, Preview 선택
  - "Save" 클릭
  - 참고: 배포 후 정확한 URL로 수정 가능

### 2.4 배포 시작

- [ ] **자동 배포 시작**
  - "Deploy" 클릭
  - 빌드 및 배포 진행 모니터링
  - 예상 시간: 3-5분

- [ ] **빌드 로그 모니터링**
  - Vercel 대시보드에서 실시간 로그 확인
  - 에러 발생 시 로그에서 원인 파악

- [ ] **배포 완료 확인**
  - 상태: "Ready" 또는 "Deployed"
  - 배포 URL 확인 (예: https://notion-cms-project.vercel.app)

### 2.5 배포 후 환경 변수 수정

- [ ] **정확한 배포 URL로 NEXT_PUBLIC_SITE_URL 수정**
  - Vercel 프로젝트 Settings
  - Environment Variables
  - NEXT_PUBLIC_SITE_URL 값을 실제 배포 URL로 변경
  - 예: `https://notion-cms-project.vercel.app`

---

## Phase 3: 배포 후 검증 ✅

### 3.1 기본 접속 확인

- [ ] **배포 URL에서 사이트 접속**
  ```bash
  https://notion-cms-project.vercel.app
  ```
  - 페이지 로드됨
  - 콘솔 에러 없음
  - 레이아웃 정상 표시

### 3.2 핵심 페이지 확인

- [ ] **홈페이지 (`/`)**
  - Hero 섹션 표시됨
  - 최신 프로젝트 3개 표시됨
  - 최신 블로그 글 2개 표시됨
  - CTA 버튼 작동함

- [ ] **프로젝트 목록 (`/projects`)**
  - Notion에서 프로젝트 데이터 로드됨
  - ProjectCard 그리드 표시됨
  - 검색 및 필터 기능 작동함
  - 페이지네이션 정상 작동

- [ ] **프로젝트 상세 (`/projects/[slug]`)**
  - 예: `/projects/nextjs-portfolio`
  - 제목, 날짜, 태그 표시됨
  - 마크다운 콘텐츠 렌더링됨
  - 관련 프로젝트 표시됨

- [ ] **블로그 목록 (`/blog`)**
  - Notion에서 블로그 데이터 로드됨
  - BlogCard 리스트 표시됨
  - 검색 및 필터 기능 작동함
  - 각 글 메타 정보 표시됨

- [ ] **블로그 상세 (`/blog/[slug]`)**
  - 예: `/blog/first-post`
  - 제목, 작성일, 수정일, 읽는시간 표시됨
  - 마크다운 콘텐츠 렌더링됨
  - 목차(ToC) 자동 생성되고 스크롤 추적 작동
  - 관련 글 표시됨

- [ ] **About 페이지 (`/about`)**
  - 자기소개 텍스트 표시됨
  - 경력사항 표시됨
  - 기술 스택 카테고리별 표시됨

- [ ] **Resume 페이지 (`/resume`)**
  - 이력서 정보 표시됨
  - 경력, 교육, 자격증 표시됨

- [ ] **태그 페이지 (`/tags/[tag]`)**
  - 예: `/tags/nextjs`
  - 해당 태그의 프로젝트 표시됨
  - 해당 태그의 블로젝트 글 표시됨

### 3.3 SEO 검증

- [ ] **robots.txt 접속**
  ```bash
  https://notion-cms-project.vercel.app/robots.txt
  ```
  - 파일이 정상 반환됨
  - User-Agent: * 설정됨
  - Sitemap 참조됨

- [ ] **sitemap.xml 접속**
  ```bash
  https://notion-cms-project.vercel.app/sitemap.xml
  ```
  - XML 파일이 정상 반환됨
  - 정적 라우트 포함:
    - /
    - /projects
    - /blog
    - /about
    - /resume
  - 동적 라우트 포함:
    - /projects/[slug] (모든 프로젝트)
    - /blog/[slug] (모든 글)
    - /tags/[tag] (모든 태그)

- [ ] **메타데이터 확인**
  ```bash
  # 홈페이지
  curl -s https://notion-cms-project.vercel.app | grep 'og:title'
  
  # 프로젝트
  curl -s https://notion-cms-project.vercel.app/projects | grep 'og:title'
  ```
  - og:title 태그 포함됨
  - og:description 태그 포함됨
  - og:image 태그 포함됨
  - twitter:card 태그 포함됨

- [ ] **JSON-LD 마크업 확인**
  - 홈페이지: Person 마크업
  - 프로젝트 상세: SoftwareApplication 마크업
  - 블로그 상세: BlogPosting 마크업
  - Chrome DevTools → 페이지 소스 보기에서 `<script type="application/ld+json">` 확인

### 3.4 성능 및 성능 지표

- [ ] **Lighthouse 검사 (배포된 사이트)**
  1. 배포된 URL 접속
  2. Chrome DevTools (F12)
  3. Lighthouse 탭 → "Analyze page load"
  4. 점수 확인:
     - [ ] Performance: 90점 이상
     - [ ] Accessibility: 85점 이상
     - [ ] Best Practices: 85점 이상
     - [ ] SEO: 95점 이상

- [ ] **Core Web Vitals**
  - Vercel Analytics에서 확인
  - Largest Contentful Paint (LCP): < 2.5초
  - Cumulative Layout Shift (CLS): < 0.1
  - Interaction to Next Paint (INP): < 200ms

- [ ] **페이지 로딩 시간**
  - 홈페이지: < 2초
  - 프로젝트 목록: < 2초
  - 프로젝트 상세: < 2초
  - 블로그 목록: < 2초

### 3.5 기능 검증

- [ ] **네비게이션 작동**
  - 헤더 메뉴 링크 모두 정상
  - 모바일 메뉴 정상 작동
  - Footer 링크 모두 정상

- [ ] **검색 기능**
  - 프로젝트 검색 작동
  - 블로그 검색 작동
  - 검색 결과 정확함

- [ ] **필터 기능**
  - 태그 필터 작동
  - 필터 상태가 URL에 반영됨
  - URL 직접 접근 시 필터 복원

- [ ] **페이지네이션**
  - 페이지 링크 작동
  - 다음/이전 버튼 작동
  - 마지막 페이지에서 비활성화

- [ ] **관련 콘텐츠**
  - 프로젝트 상세에서 관련 프로젝트 표시
  - 블로그 상세에서 관련 글 표시
  - 태그 기반으로 정확히 추천됨

- [ ] **다크모드 토글**
  - 헤더의 테마 토글 작동
  - 다크모드 적용됨
  - 라이트모드 전환됨
  - 새로고침 후 선택한 모드 유지

### 3.6 반응형 디자인

- [ ] **모바일 (375px)**
  - 모든 페이지 정상 표시
  - 모바일 메뉴 작동
  - 터치 인터페이스 사용 가능

- [ ] **태블릿 (768px)**
  - 레이아웃 조정됨
  - 사이드바 반응형
  - 그리드 2열로 조정

- [ ] **데스크톱 (1440px)**
  - 풀 너비 레이아웃
  - 사이드바 표시됨
  - 그리드 3열 이상

### 3.7 오류 페이지

- [ ] **404 페이지**
  - 존재하지 않는 경로 접속
  - 예: `/nonexistent-page`
  - 404 오류 페이지 표시됨
  - 홈으로 돌아가기 링크 있음

- [ ] **500 오류**
  - 서버 오류 페이지 존재 (선택사항)

---

## Phase 4: 배포 후 모니터링 ✅

### 4.1 Vercel 대시보드 확인

- [ ] **Deployments 확인**
  - 최신 배포 상태: "Ready" 또는 "Deployed"
  - 빌드 시간: ~ 1-2분
  - 배포 시간: < 30초

- [ ] **Analytics 활성화**
  - Vercel 프로젝트 → Analytics
  - Core Web Vitals 데이터 수집 확인

- [ ] **Serverless Functions 모니터링**
  - Functions 탭에서 API 라우트 확인 (있을 경우)
  - 성능 및 에러 로그 확인

### 4.2 Google Search Console 설정

- [ ] **Google Search Console 가입**
  - https://search.google.com/search-console
  - "속성 추가" → URL 입력
  - 예: `https://notion-cms-project.vercel.app`

- [ ] **소유권 확인**
  - HTML 파일 다운로드 및 업로드
  - 또는 TXT 레코드 추가 (도메인 사용 시)

- [ ] **Sitemap 제출**
  - "Sitemaps" 메뉴
  - sitemap.xml URL 추가
  - 예: `https://notion-cms-project.vercel.app/sitemap.xml`

- [ ] **페이지 색인 상태 확인**
  - "Pages" 메뉴에서 인덱싱된 페이지 확인
  - 에러 및 경고 검토

### 4.3 GitHub 자동 배포 확인

- [ ] **Pull Request 미리보기**
  - 새 브랜치 생성 및 변경사항 커밋
  - GitHub에 PR 생성
  - Vercel이 자동으로 Preview Deployment 생성
  - PR 댓글에서 "Visit Preview" 링크 확인

- [ ] **Main 브랜치 배포**
  - PR Merge
  - Vercel이 자동으로 Production 배포
  - 배포된 사이트에서 변경사항 반영 확인

### 4.4 에러 및 성능 모니터링

- [ ] **Vercel Logs 확인**
  - 실시간 요청 로그 확인
  - 에러 로그 확인
  - 예: 4xx, 5xx 에러

- [ ] **성능 저하 감지**
  - Lighthouse 점수 모니터링
  - Core Web Vitals 추적
  - 성능 저하 시 최적화 계획

---

## Phase 5: 커스텀 도메인 설정 (선택사항) ✅

### 5.1 도메인 준비

- [ ] **도메인 구매**
  - Namecheap, GoDaddy 등에서 도메인 구매
  - 또는 이미 보유한 도메인 사용

- [ ] **도메인 관리 서비스 확인**
  - 도메인 구입처에서 DNS 관리 페이지 접근 가능 확인

### 5.2 Vercel에서 도메인 연결

- [ ] **Vercel 프로젝트 Settings**
  - "Settings" 탭
  - "Domains" 메뉴 선택

- [ ] **도메인 추가**
  - "Add Domain" 클릭
  - 도메인명 입력 (예: `yourname.com`)
  - Vercel이 제시하는 DNS 레코드 지침 확인

### 5.3 DNS 레코드 설정

- [ ] **DNS 관리 페이지 접근**
  - 도메인 구입처 (Namecheap 등)
  - 또는 별도 DNS 서비스 (Cloudflare 등)

- [ ] **Vercel 제시 레코드 추가**
  - Type: A 또는 CNAME
  - Name: @
  - Value: Vercel이 제시한 IP 또는 호스트명
  - TTL: 기본값

- [ ] **www 서브도메인 (선택사항)**
  - Type: CNAME
  - Name: www
  - Value: `[project].vercel.app`

- [ ] **DNS 변경 적용 대기**
  - 예상 시간: 15분 ~ 24시간
  - 도메인 관리 서비스에서 확인 가능

### 5.4 도메인 적용 확인

- [ ] **커스텀 도메인 접속 가능**
  ```bash
  https://yourname.com
  ```
  - SSL 인증서 자동 적용됨 (Vercel)
  - 페이지 정상 로드됨

- [ ] **Redirect 설정**
  - `http://yourname.com` → `https://yourname.com` (자동)
  - `https://www.yourname.com` → `https://yourname.com` (선택사항)

- [ ] **vercel.json에서 도메인 설정**
  - NEXT_PUBLIC_SITE_URL을 커스텀 도메인으로 업데이트
  - Vercel 환경 변수 수정
  - 재배포 (자동 또는 수동)

---

## 최종 확인 체크리스트

### 배포 성공 기준

- [x] Vercel 배포 완료 (상태: Ready)
- [x] 모든 핵심 페이지 접속 가능
- [x] Notion 데이터 정상 로드됨
- [x] 마크다운 콘텐츠 정상 렌더링됨
- [x] 검색 및 필터 기능 작동
- [x] Lighthouse 성능 점수 80점 이상
- [x] SEO 메타데이터 설정됨
- [x] robots.txt, sitemap.xml 생성됨
- [x] 반응형 디자인 정상 작동
- [x] 모바일/데스크톱 모두 정상 표시

### 배포 후 모니터링

- [ ] Vercel Analytics 정기적 확인 (주 1회)
- [ ] Google Search Console 인덱싱 상태 확인 (월 1회)
- [ ] Lighthouse 점수 모니터링 (월 1회)
- [ ] 콘텐츠 업데이트 시 배포 확인 (정기)
- [ ] 에러 로그 모니터링 (정기)

---

**마지막 업데이트**: 2026-06-04  
**상태**: 배포 완료 대기 중
