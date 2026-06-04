/**
 * Notion 데이터베이스 스키마 정의
 *
 * Notion 데이터베이스의 구조와 타입 매핑을 정의합니다.
 */

// ==========================================
// 데이터베이스 ID 및 설정
// ==========================================

export const NOTION_DATABASES = {
  PORTFOLIO: process.env.NOTION_PORTFOLIO_DATABASE_ID || '',
  CLIENTS: process.env.NOTION_CLIENTS_DATABASE_ID || '',
  QUOTES: process.env.NOTION_QUOTES_DATABASE_ID || '',
  INVOICES: process.env.NOTION_INVOICES_DATABASE_ID || '',
  LINE_ITEMS: process.env.NOTION_LINE_ITEMS_DATABASE_ID || '',
  PAYMENTS: process.env.NOTION_PAYMENTS_DATABASE_ID || '',
} as const

// ==========================================
// 속성 맵핑 정의 (Property Mapping)
// ==========================================

// 클라이언트 데이터베이스 속성
export const CLIENT_PROPERTIES = {
  NAME: 'title', // 클라이언트명
  EMAIL: 'Email', // 이메일
  PHONE: 'Phone', // 전화번호
  COMPANY: 'Company', // 회사명
  ADDRESS: 'Address', // 주소
  CREATED_DATE: 'Created', // 생성일
} as const

// 견적서 데이터베이스 속성
export const QUOTE_PROPERTIES = {
  QUOTE_NUMBER: 'title', // 견적서 번호
  CLIENT: 'Client', // 클라이언트 (관계)
  ISSUE_DATE: 'Issue Date', // 발행일
  VALID_UNTIL: 'Valid Until', // 유효기간
  STATUS: 'Status', // 상태
  TOTAL_AMOUNT: 'Total Amount', // 총 금액
  LINE_ITEMS: 'Line Items', // 항목 (관계)
  DESCRIPTION: 'Description', // 설명
  NOTES: 'Notes', // 특이사항
} as const

// 청구서 데이터베이스 속성
export const INVOICE_PROPERTIES = {
  INVOICE_NUMBER: 'title', // 청구서 번호
  QUOTE: 'Quote', // 견적서 (관계)
  CLIENT: 'Client', // 클라이언트 (관계)
  ISSUE_DATE: 'Issue Date', // 발행일
  DUE_DATE: 'Due Date', // 납기일
  STATUS: 'Status', // 상태
  TOTAL_AMOUNT: 'Total Amount', // 총 금액
  PAID_AMOUNT: 'Paid Amount', // 결제액
  LINE_ITEMS: 'Line Items', // 항목 (관계)
  PAYMENT_TERMS: 'Payment Terms', // 결제 조건
  NOTES: 'Notes', // 특이사항
} as const

// 라인 항목 데이터베이스 속성
export const LINE_ITEM_PROPERTIES = {
  NAME: 'title', // 항목명
  DESCRIPTION: 'Description', // 설명
  QUANTITY: 'Quantity', // 수량
  UNIT_PRICE: 'Unit Price', // 단가
  AMOUNT: 'Amount', // 금액
  CATEGORY: 'Category', // 카테고리
} as const

// 결제 기록 데이터베이스 속성
export const PAYMENT_PROPERTIES = {
  PAYMENT_ID: 'title', // 결제 ID
  INVOICE: 'Invoice', // 청구서 (관계)
  AMOUNT: 'Amount', // 결제액
  PAYMENT_DATE: 'Payment Date', // 결제일
  PAYMENT_METHOD: 'Payment Method', // 결제 수단
  REFERENCE: 'Reference', // 참고사항
} as const

// ==========================================
// Notion 데이터 타입 (Notion API 응답)
// ==========================================

export interface NotionPropertyType {
  id: string
  type: string
  [key: string]: unknown
}

export interface NotionDatabaseRow {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  created_by: { object: 'user'; id: string }
  last_edited_by: { object: 'user'; id: string }
  cover: null | {
    type: string
    [key: string]: unknown
  }
  icon: null | {
    type: string
    [key: string]: unknown
  }
  parent: {
    type: 'database_id'
    database_id: string
  }
  archived: boolean
  properties: {
    [key: string]: NotionPropertyType
  }
  url: string
  public_url: string | null
}

// ==========================================
// 속성 값 추출 함수
// ==========================================

/**
 * Notion 타이틀 속성에서 텍스트 추출
 */
export function extractTitle(property: NotionPropertyType): string {
  if (property.type === 'title' && property.title) {
    const title = property.title as Array<{ plain_text: string }>
    return title.map((t) => t.plain_text).join('')
  }
  return ''
}

/**
 * Notion 텍스트 속성에서 값 추출
 */
export function extractText(property: NotionPropertyType): string {
  if (property.type === 'rich_text' && property.rich_text) {
    const richText = property.rich_text as Array<{ plain_text: string }>
    return richText.map((t) => t.plain_text).join('')
  }
  if (property.type === 'email' && property.email) {
    return property.email as string
  }
  if (property.type === 'phone_number' && property.phone_number) {
    return property.phone_number as string
  }
  if (property.type === 'url' && property.url) {
    return property.url as string
  }
  return ''
}

/**
 * Notion 숫자 속성에서 값 추출
 */
export function extractNumber(property: NotionPropertyType): number {
  if (property.type === 'number' && property.number !== null) {
    return property.number as number
  }
  return 0
}

/**
 * Notion 날짜 속성에서 값 추출
 */
export function extractDate(property: NotionPropertyType): string {
  if (property.type === 'date' && property.date) {
    const date = property.date as Record<string, string>
    return date.start
  }
  return new Date().toISOString()
}

/**
 * Notion 선택 속성에서 값 추출
 */
export function extractSelect(property: NotionPropertyType): string {
  if (property.type === 'select' && property.select) {
    const select = property.select as Record<string, string>
    return select.name
  }
  return ''
}

/**
 * Notion 다중 선택 속성에서 값 추출
 */
export function extractMultiSelect(property: NotionPropertyType): string[] {
  if (property.type === 'multi_select' && property.multi_select) {
    const multiSelect = property.multi_select as Array<{ name: string }>
    return multiSelect.map((s) => s.name)
  }
  return []
}

/**
 * Notion 관계 속성에서 ID 추출
 */
export function extractRelation(property: NotionPropertyType): string[] {
  if (property.type === 'relation' && property.relation) {
    const relation = property.relation as Array<{ id: string }>
    return relation.map((r) => r.id)
  }
  return []
}

/**
 * Notion 롤업 속성에서 값 추출
 */
export function extractRollup(property: NotionPropertyType): unknown {
  if (property.type === 'rollup' && property.rollup) {
    const rollup = property.rollup as Record<string, unknown>
    return rollup.results
  }
  return []
}

// ==========================================
// 검증 함수
// ==========================================

/**
 * 필수 데이터베이스 ID 검증
 */
export function validateDatabaseIds(): {
  valid: boolean
  missing: string[]
} {
  const missing: string[] = []

  if (!NOTION_DATABASES.PORTFOLIO) missing.push('NOTION_PORTFOLIO_DATABASE_ID')
  if (!NOTION_DATABASES.CLIENTS) missing.push('NOTION_CLIENTS_DATABASE_ID')
  if (!NOTION_DATABASES.QUOTES) missing.push('NOTION_QUOTES_DATABASE_ID')
  if (!NOTION_DATABASES.INVOICES) missing.push('NOTION_INVOICES_DATABASE_ID')

  return {
    valid: missing.length === 0,
    missing,
  }
}

/**
 * Notion 데이터베이스 행 검증
 */
export function validateDatabaseRow(
  row: NotionDatabaseRow,
  requiredProperties: string[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  for (const prop of requiredProperties) {
    if (!row.properties[prop]) {
      errors.push(`Missing required property: ${prop}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
