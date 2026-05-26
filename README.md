# Notion Portfolio CMS

Notion API를 활용하여 개발자 포트폴리오, 프로젝트, 블로그 콘텐츠를 쉽게 관리하고 웹에 자동으로 반영되는 개인 포트폴리오 사이트입니다.

## 🎯 프로젝트 소개

이 프로젝트는 Notion을 CMS로 활용하여 다음의 장점을 제공합니다:

- **직관적인 콘텐츠 관리**: 개발자가 아닌 사람도 Notion에서 쉽게 콘텐츠 추가/수정 가능
- **자동 웹 반영**: Notion 데이터베이스의 변경사항이 웹사이트에 자동으로 반영
- **별도 관리자 페이지 불필요**: Notion 인터페이스를 그대로 활용
- **SEO 최적화**: Next.js 기반의 정적 생성 및 메타데이터 최적화
- **반응형 디자인**: 모든 기기에서 최적의 경험 제공

## 📋 기술 스택

| 분야 | 기술 |
|------|------|
| Frontend Framework | Next.js 16, React 19, TypeScript 5 |
| CMS | Notion API |
| Styling | Tailwind CSS v4, shadcn/ui |
| Icons | Lucide React |
| Forms | react-hook-form, Zod |
| Theme | next-themes (다크모드) |
| Notifications | Sonner (Toast) |
| Deployment | Vercel |

## 🚀 주요 기능

### 1. 프로젝트 관리
- Notion 데이터베이스 기반 프로젝트 목록 및 상세 페이지
- 기술 스택 태그별 필터링
- 프로젝트별 메타데이터 (제목, 설명, 이미지, 링크)

### 2. 블로그 시스템
- Notion 마크다운 콘텐츠 자동 렌더링
- 블로그 목차 (Table of Contents) 자동 생성
- 읽는시간(Reading Time) 자동 계산
- 코드 하이라이팅 지원

### 3. 포트폴리오 페이지
- About 페이지 (자기소개, 경력, 기술 스택)
- Resume 페이지 (선택사항)

### 4. 검색 및 필터링
- 태그 기반 필터링
- 전체 텍스트 검색
- URL 기반 상태 저장 (쿼리 파라미터)

### 5. SEO 및 성능
- 동적 메타데이터 생성
- Open Graph, Twitter Card 지원
- 구조화된 데이터 (Schema.org JSON-LD)
- 정적 생성 및 증분 정적 재생성 (ISR)
- 이미지 최적화

## 📁 디렉토리 구조

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # 마케팅 페이지 그룹
│   │   ├── layout.tsx
│   │   ├── page.tsx              # 홈 페이지
│   │   ├── projects/
│   │   │   ├── page.tsx          # 프로젝트 리스트
│   │   │   └── [slug]/page.tsx   # 프로젝트 상세
│   │   ├── blog/
│   │   │   ├── page.tsx          # 블로그 리스트
│   │   │   └── [slug]/page.tsx   # 블로그 상세
│   │   └── about/page.tsx        # About 페이지
│   ├── layout.tsx                # 루트 레이아웃 (ThemeProvider 등)
│   └── globals.css               # 전역 스타일
├── components/
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── layout/                   # Header, Footer 등
│   ├── sections/                 # Hero, Features 등
│   ├── forms/                    # 폼 컴포넌트
│   └── common/                   # ThemeToggle 등
├── lib/
│   ├── notion.ts                 # Notion API 클라이언트
│   ├── utils.ts                  # cn() 유틸리티
│   ├── config.ts                 # 사이트 설정
│   └── validations.ts            # Zod 스키마
├── types/
│   └── index.ts                  # TypeScript 타입 정의
├── hooks/
│   └── use-mobile.ts             # 모바일 감지 훅
└── docs/
    └── PRD.md                    # 프로젝트 요구사항 문서
```

## ⚙️ Notion 데이터베이스 구조

Notion에서 다음과 같이 데이터베이스를 설정하세요:

| 속성 | 타입 | 설명 |
|------|------|------|
| title | Title | 프로젝트/글 제목 |
| type | Select | project \| blog \| experience |
| description | Rich Text | 요약 설명 |
| content | Rich Text | 상세 내용 |
| tags | Multi-select | 기술 스택 태그 |
| date | Date | 작성일 |
| slug | Rich Text | URL slug (고유값) |
| published | Checkbox | 공개 여부 |
| featuredImage | File | 대표 이미지 |

## 🛠️ 개발 가이드

### 필수 환경 설정

1. **Node.js**: LTS 버전 (18+) 설치
2. **Notion API Key**: [Notion Developers](https://www.notion.so/my-integrations)에서 발급
3. **.env.local 파일 생성**:
   ```env
   NEXT_PUBLIC_NOTION_API_KEY=your_notion_api_key
   NEXT_PUBLIC_NOTION_DATABASE_ID=your_notion_database_id
   ```

### 로컬 개발 서버 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:3000)
npm run dev

# 코드 품질 검사
npm run lint

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 커밋 메시지 규칙

```
<type>: <subject>

<body>
```

**type**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**예시**:
```
feat: Notion API 연동 및 프로젝트 목록 페이지 구현

- Notion API 클라이언트 구현 (lib/notion.ts)
- 프로젝트 리스트 페이지 작성
- 프로젝트 카드 컴포넌트 개발
```

## 📚 개발 문서

자세한 프로젝트 요구사항, 아키텍처, 타임라인은 [PRD 문서](./docs/PRD.md)를 참고하세요.

### 주요 개발 가이드라인

- **들여쓰기**: 스페이스 4칸
- **네이밍**: 변수/함수는 camelCase, 파일명은 kebab-case
- **코드 주석**: 한국어 (WHY를 중심으로만 작성)
- **스타일**: `cn()` 함수로 className 병합
- **폼 검증**: react-hook-form + Zod 조합 필수

## 🌐 배포 (Vercel)

### 배포 단계

1. GitHub에 저장소 푸시
2. [Vercel Dashboard](https://vercel.com) 접속
3. "New Project" → GitHub 저장소 연결
4. 환경 변수 설정:
   - `NEXT_PUBLIC_NOTION_API_KEY`
   - `NEXT_PUBLIC_NOTION_DATABASE_ID`
5. Deploy 클릭

### 자동 배포
- **Preview**: PR 생성 시 자동으로 미리보기 배포
- **Production**: main 브랜치 푸시 시 자동 배포

## 📊 성능 목표

| 지표 | 목표 |
|------|------|
| Largest Contentful Paint (LCP) | < 2.5초 |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Lighthouse Score | 90점 이상 |

## 🔒 보안

- **환경 변수**: `.env.local` 파일은 `.gitignore`에 등록되어 있음 (커밋 금지)
- **API Key**: Notion API Key는 환경 변수로만 관리
- **민감 정보**: 로그에서 PII 마스킹 처리

## 📝 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.

## 🤝 기여 가이드

1. 이 저장소를 Fork합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: amazing feature'`)
4. 브랜치에 Push합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📧 연락처

- 이메일: devhyun98@gmail.com
- GitHub: [GitHub 프로필]
- Blog: [포트폴리오 사이트]

## 📖 참고 자료

- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PRD 문서](./docs/PRD.md)

---

**프로젝트 시작일**: 2026-05-26
