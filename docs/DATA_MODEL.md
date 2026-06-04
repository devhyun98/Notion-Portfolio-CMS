# Notion Portfolio CMS - 데이터 모델 설계 문서

## 개요

이 문서는 Notion Portfolio CMS의 데이터 모델 구조를 정의합니다. 포트폴리오, 클라이언트 프로젝트, 견적서, 청구서 등의 복잡한 관계를 관리하기 위한 스키마입니다.

---

## 1. 핵심 엔티티 (Core Entities)

### 1.1 NotionItem (공통 기본 타입)

모든 콘텐츠의 기본 인터페이스:

```typescript
interface NotionItem {
  id: string                    // Notion 페이지 ID
  title: string               // 제목
  type: "project" | "blog" | "experience"
  description: string         // 요약 설명
  content: string            // 상세 내용 (Rich Text)
  tags: string[]             // 태그 배열
  date: string               // 작성일 (ISO 8601)
  slug: string               // URL slug (고유값)
  published: boolean         // 공개 여부
  featuredImage?: string     // 대표 이미지 URL
  category?: string          // 카테고리
}
```

**저장 위치**: `src/types/index.ts`

---

## 2. 포트폴리오 관련 타입

### 2.1 Client (클라이언트)

클라이언트 정보 관리:

```typescript
interface Client {
  id: string              // Notion 페이지 ID
  name: string           // 클라이언트명
  email?: string         // 이메일
  phone?: string         // 전화번호
  company?: string       // 회사명
  address?: string       // 주소
  createdAt: string      // 생성일
  updatedAt: string      // 수정일
}
```

**Notion 데이터베이스**: Clients
**주요 속성**:
- `title`: 클라이언트명
- `Email`: 이메일
- `Phone`: 전화번호
- `Company`: 회사명
- `Address`: 주소

### 2.2 LineItem (라인 항목)

견적서/청구서에 포함되는 개별 항목:

```typescript
interface LineItem {
  id: string             // Notion 페이지 ID
  name: string          // 항목명 (예: "웹사이트 디자인")
  description?: string  // 상세 설명
  quantity: number      // 수량
  unitPrice: number     // 단가 (원)
  amount: number        // 금액 (수량 × 단가)
  category?: string     // 카테고리 (디자인, 개발, 컨설팅)
}
```

**Notion 데이터베이스**: Line Items
**주요 속성**:
- `title`: 항목명
- `Description`: 설명
- `Quantity`: 수량
- `Unit Price`: 단가
- `Amount`: 금액 (롤업/포뮬러)
- `Category`: 카테고리

### 2.3 ProjectQuote (견적서)

클라이언트에게 제시하는 견적서:

```typescript
interface ProjectQuote {
  id: string                    // Notion 페이지 ID
  quoteNumber: string          // 견적서 번호 (예: PJT-2026-001)
  clientId: string             // 클라이언트 ID (관계)
  clientName: string           // 클라이언트명 (롤업)
  issueDate: string            // 발행일
  validUntil: string           // 유효기간
  status: "대기"|"승인"|"거절"|"만료"
  totalAmount: number          // 총 금액 (롤업)
  lineItems: LineItem[]        // 항목 목록 (관계)
  description?: string         // 추가 설명
  notes?: string               // 특이사항
  createdAt: string            // 생성일
  updatedAt: string            // 수정일
}
```

**Notion 데이터베이스**: Quotes
**주요 속성**:
- `title`: 견적서 번호
- `Client`: 클라이언트 (관계)
- `Issue Date`: 발행일
- `Valid Until`: 유효기간
- `Status`: 상태 (Select)
- `Total Amount`: 총 금액 (롤업)
- `Line Items`: 항목 (관계)

**관계**:
```
Client (1) ──── (N) Quote
LineItem (N) ──── (1) Quote
```

### 2.4 Invoice (청구서)

클라이언트에게 청구하는 청구서:

```typescript
interface Invoice {
  id: string                    // Notion 페이지 ID
  invoiceNumber: string        // 청구서 번호 (예: INV-2026-001)
  quoteId: string              // 견적서 ID (관계)
  clientId: string             // 클라이언트 ID (관계)
  clientName: string           // 클라이언트명 (롤업)
  issueDate: string            // 발행일
  dueDate: string              // 납기일
  status: "발행"|"송금 대기"|"부분 결제"|"완납"
  totalAmount: number          // 총 금액 (롤업)
  paidAmount: number           // 결제액 (롤업)
  lineItems: LineItem[]        // 항목 목록 (관계)
  paymentTerms?: string        // 결제 조건
  notes?: string               // 특이사항
  createdAt: string
  updatedAt: string
}
```

**Notion 데이터베이스**: Invoices
**주요 속성**:
- `title`: 청구서 번호
- `Quote`: 견적서 (관계)
- `Client`: 클라이언트 (관계)
- `Issue Date`: 발행일
- `Due Date`: 납기일
- `Status`: 상태
- `Total Amount`: 총 금액 (롤업)
- `Paid Amount`: 결제액 (롤업)
- `Line Items`: 항목 (관계)

**관계**:
```
Quote (1) ──── (N) Invoice
Client (1) ──── (N) Invoice
Payment (N) ──── (1) Invoice
```

### 2.5 PaymentRecord (결제 기록)

청구서에 대한 결제 기록:

```typescript
interface PaymentRecord {
  id: string                           // Notion 페이지 ID
  invoiceId: string                   // 청구서 ID (관계)
  amount: number                      // 결제액
  paymentDate: string                 // 결제일
  paymentMethod: "계좌이체"|"카드"|"현금"|"수표"|"기타"
  reference?: string                  // 참고사항
  createdAt: string                   // 기록 생성일
}
```

**Notion 데이터베이스**: Payments
**주요 속성**:
- `title`: 결제 ID
- `Invoice`: 청구서 (관계)
- `Amount`: 결제액
- `Payment Date`: 결제일
- `Payment Method`: 결제 수단
- `Reference`: 참고사항

### 2.6 PortfolioProject (포트폴리오 프로젝트)

포트폴리오에 표시되는 프로젝트 (NotionItem 확장):

```typescript
interface PortfolioProject extends NotionItem {
  type: "portfolio"
  clientName?: string                 // 클라이언트명
  projectStatus?: "진행 중"|"완료"|"보류"
  startDate?: string                  // 프로젝트 시작일
  endDate?: string                    // 프로젝트 종료일
  budget?: number                     // 예산
  quote?: ProjectQuote                // 관련 견적서
  invoices?: Invoice[]                // 관련 청구서들
  deliverables?: string[]             // 결과물 목록
}
```

---

## 3. 관계도 (Entity Relationship Diagram)

```
┌─────────────┐
│   Client    │
│  (클라이언트)  │
└──────┬──────┘
       │ 1:N
       │
   ┌───┴────────────┐
   │                │
   ▼                ▼
┌──────────┐   ┌──────────┐
│  Quote   │   │ Invoice  │
│(견적서)   │   │(청구서)   │
└──────┬───┘   └────┬─────┘
       │ 1:N        │ 1:N
       │            │
   ┌───┴────────────┴─┐
   │                  │
   ▼                  ▼
┌──────────┐     ┌──────────┐
│LineItem  │     │ Payment  │
│(항목)     │     │(결제기록)  │
└──────────┘     └──────────┘

PortfolioProject
    ├── Client (참조)
    ├── Quote (참조)
    ├── Invoice[] (참조)
    └── LineItem[] (참조)
```

---

## 4. Notion 데이터베이스 설정

### 4.1 필수 데이터베이스 목록

| 데이터베이스 | ID 환경변수 | 목적 |
|------------|-----------|------|
| Clients | NOTION_CLIENTS_DATABASE_ID | 클라이언트 정보 관리 |
| Quotes | NOTION_QUOTES_DATABASE_ID | 견적서 관리 |
| Invoices | NOTION_INVOICES_DATABASE_ID | 청구서 관리 |
| Line Items | NOTION_LINE_ITEMS_DATABASE_ID | 상품/서비스 항목 |
| Payments | NOTION_PAYMENTS_DATABASE_ID | 결제 기록 |
| Portfolio | NOTION_PORTFOLIO_DATABASE_ID | 포트폴리오 프로젝트 |

### 4.2 필터 & 정렬 설정

**Quotes 필터**:
```
Status ≠ "만료" AND published = true
```

**Invoices 필터**:
```
Status ≠ "완납" OR paid_amount < total_amount
```

**정렬 순서**:
- Quotes: Issue Date (DESC)
- Invoices: Due Date (ASC)
- Payments: Payment Date (DESC)

---

## 5. 타입 매핑 가이드

### 5.1 Notion → TypeScript 변환

**파일**: `src/lib/notion-mappers.ts`

**사용 예**:
```typescript
import { mapNotionToQuote, mapNotionToInvoice } from '@/lib/notion-mappers'

// Notion 데이터 → 우리 타입
const quote: ProjectQuote = mapNotionToQuote(notionRow)
const invoice: Invoice = mapNotionToInvoice(notionRow)
```

### 5.2 TypeScript → Notion 변환

```typescript
import { quoteToNotionProperties, invoiceToNotionProperties } from '@/lib/notion-mappers'

// 우리 타입 → Notion 데이터
const properties = quoteToNotionProperties(quote)
const invoiceProps = invoiceToNotionProperties(invoice)

// Notion API로 생성/업데이트
await client.pages.create({
  parent: { database_id: NOTION_DATABASES.QUOTES },
  properties,
})
```

---

## 6. 스키마 정의 파일

### 6.1 주요 파일 구조

```
src/
├── types/
│   └── index.ts              # 모든 타입 정의
├── lib/
│   ├── notion-schema.ts      # Notion 스키마 & 속성 매핑
│   └── notion-mappers.ts     # 타입 변환 함수
└── docs/
    └── DATA_MODEL.md         # 이 문서
```

### 6.2 스키마 정의 접근

```typescript
// 속성명 접근
import { QUOTE_PROPERTIES, CLIENT_PROPERTIES } from '@/lib/notion-schema'

const props = row.properties
const quoteNumber = extractTitle(props[QUOTE_PROPERTIES.QUOTE_NUMBER])

// 데이터베이스 ID 접근
import { NOTION_DATABASES } from '@/lib/notion-schema'

const quoteDb = NOTION_DATABASES.QUOTES
```

---

## 7. 데이터 검증

### 7.1 검증 함수

**파일**: `src/lib/notion-schema.ts`

```typescript
import { validateDatabaseIds, validateDatabaseRow } from '@/lib/notion-schema'

// 환경 변수 검증
const { valid, missing } = validateDatabaseIds()
if (!valid) {
  throw new Error(`Missing database IDs: ${missing.join(', ')}`)
}

// 데이터 행 검증
const { valid: rowValid, errors } = validateDatabaseRow(row, [
  QUOTE_PROPERTIES.QUOTE_NUMBER,
  QUOTE_PROPERTIES.CLIENT,
])
```

---

## 8. 계산 필드 (Calculated Fields)

### 8.1 롤업 (Rollup) 필드

**QuoteTotal**:
- 수식: `sum(prop("Amount"))`
- 위치: Quote.Total Amount
- 설명: 모든 라인 항목의 금액 합

**InvoicePaidPercentage**:
- 수식: `(prop("Paid Amount") / prop("Total Amount")) * 100`
- 위치: Invoice에 추가
- 설명: 결제율 (%)

### 8.2 포뮬러 필드

**QuoteStatus Color**:
```javascript
if(prop("Status") == "승인", "green", 
   if(prop("Status") == "대기", "yellow", 
      if(prop("Status") == "거절", "red", "gray")))
```

---

## 9. 실행 흐름 예시

### 9.1 견적서 생성 흐름

```
1. Client 선택
2. LineItem[] 추가
3. Quote 생성
   - quoteNumber 자동 생성 (포뮬러)
   - totalAmount 자동 계산 (롤업)
   - status = "대기"
4. 클라이언트에 전송
```

### 9.2 청구서 생성 흐름

```
1. Quote 선택 (또는 새로 생성)
2. LineItem[] 복사 또는 수정
3. Invoice 생성
   - invoiceNumber 자동 생성
   - 청구 금액 입력
4. 클라이언트에 청구
5. Payment 기록 (결제 시)
   - status 자동 업데이트
```

---

## 10. 마이그레이션 가이드

### 10.1 기존 포트폴리오 → 새 모델

```typescript
// 1. 기존 portfolio 데이터 읽기
const oldProjects = await getProjects()

// 2. 클라이언트 정보 추출
const clients = extractClientsFromProjects(oldProjects)

// 3. Notion에 클라이언트 생성
for (const client of clients) {
  const properties = clientToNotionProperties(client)
  await createNotionPage(NOTION_DATABASES.CLIENTS, properties)
}

// 4. 프로젝트 -> PortfolioProject 변환
// (클라이언트 ID 연결)
```

---

## 11. 성능 최적화

### 11.1 배치 쿼리

```typescript
// 여러 데이터베이스 동시 조회
const [clients, quotes, invoices] = await Promise.all([
  getClients(),
  getQuotes(),
  getInvoices(),
])
```

### 11.2 캐싱 전략

- **Clients**: 1시간 캐시 (자주 변경 없음)
- **Quotes**: 30분 캐시 (상태 변경 가능)
- **Invoices**: 10분 캐시 (결제 추적 필요)
- **Payments**: 캐시 없음 (실시간)

---

## 12. 문제 해결

### 문제: 롤업 필드가 업데이트되지 않음

**해결**: Notion은 관계 삭제 시 자동 업데이트. 수동으로 강제 업데이트 필요.

### 문제: 두 데이터베이스 간 관계 복잡

**해결**: 매퍼 함수로 추상화. `mapNotionToQuote()`로 자동 처리.

---

## 13. 참고 자료

- [Notion API 공식 문서](https://developers.notion.com)
- 프로젝트 타입 정의: `src/types/index.ts`
- 스키마 정의: `src/lib/notion-schema.ts`
- 매퍼 함수: `src/lib/notion-mappers.ts`

---

**마지막 업데이트**: 2026년 6월 4일
**상태**: Draft
