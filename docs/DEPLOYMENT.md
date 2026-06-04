# Notion Portfolio CMS - Vercel 배포 가이드

이 문서는 **Notion Portfolio CMS** 프로젝트를 Vercel에 배포하는 전체 과정을 설명합니다.

---

## 📋 목차

1. [사전 준비](#사전-준비)
2. [Vercel 계정 설정](#vercel-계정-설정)
3. [GitHub 연결](#github-연결)
4. [환경 변수 설정](#환경-변수-설정)
5. [배포 진행](#배포-진행)
6. [커스텀 도메인 설정](#커스텀-도메인-설정)
7. [배포 후 검증](#배포-후-검증)
8. [트러블슈팅](#트러블슈팅)

---

## 사전 준비

배포 전에 다음 사항을 확인하세요:

### 1. 로컬 환경 검증

```bash
# 프로젝트 빌드 성공 확인
npm run build

# ESLint 검사 통과
npm run lint

# 개발 서버 오류 없음 확인
npm run dev
```

### 2. GitHub 레포지토리 준비

```bash
# 모든 변경사항 커밋
git add .
git commit -m "chore: Phase 5-2 배포 준비 완료"

# 원격 저장소에 푸시
git push origin main
```

### 3. Notion Database 확인

- **Database ID 확인**
  - Notion 데이터베이스 URL에서 ID 추출
  - 예: `https://notion.so/[32자 ID]?v=[보기 ID]`

- **API Integration 생성**
  - [Notion API Dashboard](https://www.notion.so/my-integrations)에서 새 integration 생성
  - "Notion API Key" 복사 (나중에 필요)

- **데이터베이스 권한 설정**
  - Notion에서 Database 열기
  - 오른쪽 상단 "share" → "Integration 추가" → 방금 생성한 integration 선택

---

## Vercel 계정 설정

### 1. Vercel 가입

1. [vercel.com](https://vercel.com/)으로 이동
2. **"Sign Up"** 클릭
3. **"Continue with GitHub"** 선택
4. GitHub 계정으로 로그인 및 인증

### 2. Vercel 프로젝트 생성

1. Vercel 대시보드에서 **"Add New Project"** 클릭
2. **"Import Git Repository"** 선택
3. GitHub 레포지토리 목록에서 `notion-cms-project` 검색 및 선택
4. **"Import"** 클릭

---

## GitHub 연결

### 1. Vercel에서 GitHub 권한 설정

- Vercel이 GitHub 레포지토리 접근 권한 요청
- **"Authorize Vercel"** 클릭으로 권한 부여

### 2. 자동 배포 설정

Vercel에서 자동으로 다음과 같이 설정됩니다:

- **Production Branch**: `main`
- **Preview Deployments**: PR마다 자동 배포
- **Build Command**: `next build`
- **Output Directory**: `.next`

---

## 환경 변수 설정

### 1. Vercel 대시보드에서 환경 변수 추가

1. Vercel 프로젝트 페이지 → **"Settings"** 탭
2. 왼쪽 메뉴 → **"Environment Variables"** 선택
3. 다음 환경 변수 추가:

#### NOTION_API_KEY

- **변수명**: `NOTION_API_KEY`
- **값**: [Notion API Dashboard](https://www.notion.so/my-integrations)에서 생성한 API Key
- **Environment**: Production, Preview, Development 모두 선택
- **"Save"** 클릭

#### NOTION_DATABASE_ID

- **변수명**: `NOTION_DATABASE_ID`
- **값**: Notion Database URL에서 추출한 ID (32자)
- **Environment**: Production, Preview, Development 모두 선택
- **"Save"** 클릭

#### NEXT_PUBLIC_SITE_URL

- **변수명**: `NEXT_PUBLIC_SITE_URL`
- **값**: 배포 후 Vercel이 자동 생성하는 URL (예: `https://notion-cms-project.vercel.app`)
- **Environment**: Production, Preview 선택
- **참고**: 초기 배포 후 URL 확인 후 수정 가능

### 2. 환경 변수 우선순위

Vercel은 다음 순서로 환경 변수를 사용합니다:
1. Production Environment
2. Preview Environment
3. Development Environment

---

## 배포 진행

### 1. 첫 번째 배포 (자동)

- GitHub에 푸시하면 Vercel이 자동으로 배포 시작
- Vercel 대시보드에서 빌드 진행 상황 모니터링
- 빌드 완료 후 배포된 URL 확인

### 2. 배포 로그 확인

1. Vercel 프로젝트 대시보드에서 최신 배포 항목 클릭
2. **"Logs"** 탭에서 빌드 및 배포 로그 확인
3. 에러가 있을 경우 로그에서 원인 파악

### 3. Preview Deployments (PR)

PR을 생성하면 Vercel이 자동으로:
- 별도의 미리보기 URL 생성
- PR 댓글에 배포 링크 추가
- 변경사항 검토 후 merge 가능

---

## 커스텀 도메인 설정

### 1. 도메인 구매

- Namecheap, GoDaddy 등에서 도메인 구매
- 또는 이미 보유한 도메인 사용

### 2. Vercel에서 도메인 연결

1. Vercel 프로젝트 → **"Settings"** 탭
2. **"Domains"** 메뉴 선택
3. **"Add Domain"** 클릭
4. 구매한 도메인명 입력 (예: `yourname.com`)
5. Vercel이 제시하는 DNS 레코드 추가 지침 따르기

### 3. DNS 레코드 설정

도메인 관리 서비스(Namecheap 등)에서:

1. DNS 관리 페이지 이동
2. Vercel이 제시한 레코드 추가:
   - Type: `A` 또는 `CNAME`
   - Name: `@` 또는 서브도메인 (예: `www`)
   - Value: Vercel이 제시한 IP 또는 CNAME

3. DNS 변경 적용 대기 (보통 24시간 이내)
4. Vercel에서 자동으로 도메인 확인

### 4. www 서브도메인 설정 (선택사항)

- `www.yourname.com`도 같은 방식으로 추가 가능
- Vercel에서 자동으로 리다이렉트 설정 가능

---

## 배포 후 검증

### 1. 사이트 접속 테스트

```bash
# 배포된 URL 확인
https://notion-cms-project.vercel.app

# 또는 커스텀 도메인
https://yourname.com
```

### 2. 핵심 페이지 확인

- [ ] 홈페이지 (`/`) - 정상 표시
- [ ] 프로젝트 목록 (`/projects`) - Notion 데이터 로드
- [ ] 프로젝트 상세 (`/projects/[slug]`) - 마크다운 렌더링
- [ ] 블로그 목록 (`/blog`) - 글 목록 표시
- [ ] 블로그 상세 (`/blog/[slug]`) - 마크다운 + 목차 표시
- [ ] About (`/about`) - 프로필 정보 표시
- [ ] Resume (`/resume`) - 이력서 표시

### 3. SEO 검증

```bash
# Sitemap 접속
https://yourname.com/sitemap.xml

# robots.txt 접속
https://yourname.com/robots.txt
```

### 4. Lighthouse 성능 검사

1. 배포된 사이트 접속
2. Chrome DevTools 열기 (F12)
3. **"Lighthouse"** 탭
4. **"Analyze page load"** 클릭
5. 다음 점수 확인:
   - **Performance**: 90점 이상 목표
   - **Accessibility**: 90점 이상
   - **Best Practices**: 90점 이상
   - **SEO**: 95점 이상

### 5. 메타데이터 확인

```bash
# 홈페이지 메타 태그
curl -s https://yourname.com | grep -i "og:"

# 특정 페이지
curl -s https://yourname.com/projects | grep -i "og:title"
```

### 6. 모바일 반응성

- 스마트폰, 태블릿에서 접속
- 모든 페이지가 제대로 표시되는지 확인
- 터치 인터페이스 정상 작동 확인

---

## 트러블슈팅

### 빌드 실패

**문제**: Vercel 빌드 실패, `npm run build` 에러

**해결**:
1. 로컬에서 `npm run build` 실행
2. TypeScript 에러 확인 및 수정
3. ESLint 에러 확인 및 수정
4. 변경사항 커밋 및 푸시
5. Vercel이 자동으로 재배포

### 환경 변수 미설정

**문제**: "NOTION_API_KEY is not defined" 에러

**해결**:
1. Vercel 프로젝트 Settings → Environment Variables
2. 모든 필수 변수 확인:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
   - `NEXT_PUBLIC_SITE_URL`
3. 변수 저장 후 재배포

### Notion 데이터 로드 안 됨

**문제**: 프로젝트/블로그 목록이 비어있음

**해결**:
1. Notion Database 권한 확인
   - Database 공유 → Integration 추가됨
2. Notion Database 구조 확인
   - `published` 속성이 `true`인 항목 확인
   - `title`, `type`, `content` 속성 확인
3. API Key 유효성 확인
   - [Notion API Test](https://www.notion.so/api/v1/databases)에서 테스트
4. Database ID 재확인
   - URL에서 올바른 ID 추출

### SEO 메타데이터 미반영

**문제**: og:title, og:description이 표시 안 됨

**해결**:
1. `lib/config.ts`에서 NEXT_PUBLIC_SITE_URL 확인
2. 각 페이지의 `generateMetadata()` 함수 확인
3. 캐시 삭제:
   - 브라우저 캐시 삭제 또는 시크릿 모드 사용
4. Open Graph Debugger로 검증
   - https://developers.facebook.com/tools/debug/og/object/

### 느린 로딩 속도

**문제**: Lighthouse 성능 점수 낮음 (< 80점)

**해결**:
1. 이미지 최적화
   - `next/image` 컴포넌트 사용
   - 크기 지정 (width, height)
2. 동적 import 활용
   - 마크다운 렌더러 등 무거운 모듈
3. Notion API 응답 속도 확인
   - 캐싱 전략 검토
4. Vercel Analytics 확인
   - Core Web Vitals 분석

---

## 지속적인 배포 (CD)

### 자동 배포 워크플로우

```
1. 로컬에서 코드 수정
2. git add/commit/push
3. GitHub에 푸시
4. Vercel이 자동으로 빌드 시작
5. 빌드 성공 시 자동 배포
6. 배포된 사이트에서 변경사항 반영 확인
```

### PR 미리보기 (Preview)

```
1. 새 브랜치에서 기능 개발
2. GitHub PR 생성
3. Vercel이 자동으로 미리보기 URL 생성
4. PR 댓글에서 "Visit Preview" 클릭
5. 변경사항 검토 후 Merge
6. main 브랜치 배포
```

### 배포 롤백 (필요 시)

1. Vercel 대시보드에서 "Deployments" 탭
2. 이전 배포 항목 클릭
3. **"Promote to Production"** 선택
4. 이전 버전으로 롤백 완료

---

## 모니터링 및 분석

### Vercel Analytics

1. Vercel 프로젝트 → **"Analytics"** 탭
2. Core Web Vitals 확인:
   - **Largest Contentful Paint (LCP)**: < 2.5초 목표
   - **First Input Delay (FID)**: < 100ms 목표
   - **Cumulative Layout Shift (CLS)**: < 0.1 목표

### Google Search Console

1. [Google Search Console](https://search.google.com/search-console) 방문
2. 속성 추가 → 커스텀 도메인 추가
3. Sitemap 제출: `https://yourname.com/sitemap.xml`
4. 인덱싱 상태 모니터링

### Google Analytics (선택사항)

1. [Google Analytics](https://analytics.google.com/) 설정
2. 추적 코드 추가 (또는 gtag 설정)
3. 방문자, 페이지 뷰, 사용자 행동 분석

---

## 보안 체크리스트

- [ ] 환경 변수 비공개 처리 (`.env.local`, `.env.*.local` .gitignore)
- [ ] API Key 보안 (Vercel Secrets 사용)
- [ ] HTTPS 자동 설정 (Vercel 기본값)
- [ ] CSP 헤더 설정 (선택사항)
- [ ] CORS 설정 검토
- [ ] 의존성 보안 검사 (`npm audit`)

---

## 다음 단계

배포 후:

1. **모니터링**: Vercel Analytics, Google Search Console 설정
2. **SEO 최적화**: Lighthouse 점수 개선, 구조화된 데이터 검증
3. **콘텐츠 관리**: Notion에서 주기적으로 콘텐츠 업데이트
4. **성능 개선**: Core Web Vitals 모니터링 및 최적화
5. **기능 추가**: Phase 5-2 이상의 추가 기능 구현

---

**문서 버전**: 1.0  
**마지막 업데이트**: 2026-06-04  
**상태**: 배포 준비 완료
