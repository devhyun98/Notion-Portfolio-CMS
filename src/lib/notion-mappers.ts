/**
 * Notion API 응답을 우리의 타입으로 변환하는 매퍼 함수들
 */

import {
  Client,
  LineItem,
  ProjectQuote,
  Invoice,
  PaymentRecord,
} from '@/types/index'
import {
  NotionDatabaseRow,
  QUOTE_PROPERTIES,
  INVOICE_PROPERTIES,
  LINE_ITEM_PROPERTIES,
  CLIENT_PROPERTIES,
  extractTitle,
  extractText,
  extractNumber,
  extractDate,
  extractSelect,
  extractMultiSelect,
  extractRelation,
} from './notion-schema'

// ==========================================
// 클라이언트 매퍼
// ==========================================

/**
 * Notion 클라이언트 데이터를 Client 타입으로 변환
 */
export function mapNotionToClient(row: NotionDatabaseRow): Client {
  const props = row.properties

  return {
    id: row.id,
    name: extractTitle(props[CLIENT_PROPERTIES.NAME]),
    email: extractText(props[CLIENT_PROPERTIES.EMAIL]),
    phone: extractText(props[CLIENT_PROPERTIES.PHONE]),
    company: extractText(props[CLIENT_PROPERTIES.COMPANY]),
    address: extractText(props[CLIENT_PROPERTIES.ADDRESS]),
    createdAt: row.created_time,
    updatedAt: row.last_edited_time,
  }
}

// ==========================================
// 라인 항목 매퍼
// ==========================================

/**
 * Notion 라인 항목 데이터를 LineItem 타입으로 변환
 */
export function mapNotionToLineItem(row: NotionDatabaseRow): LineItem {
  const props = row.properties

  return {
    id: row.id,
    name: extractTitle(props[LINE_ITEM_PROPERTIES.NAME]),
    description: extractText(props[LINE_ITEM_PROPERTIES.DESCRIPTION]),
    quantity: extractNumber(props[LINE_ITEM_PROPERTIES.QUANTITY]),
    unitPrice: extractNumber(props[LINE_ITEM_PROPERTIES.UNIT_PRICE]),
    amount: extractNumber(props[LINE_ITEM_PROPERTIES.AMOUNT]),
    category: extractSelect(props[LINE_ITEM_PROPERTIES.CATEGORY]),
  }
}

// ==========================================
// 견적서 매퍼
// ==========================================

/**
 * Notion 견적서 데이터를 ProjectQuote 타입으로 변환
 */
export function mapNotionToQuote(
  row: NotionDatabaseRow,
  lineItems: LineItem[] = []
): ProjectQuote {
  const props = row.properties

  return {
    id: row.id,
    quoteNumber: extractTitle(props[QUOTE_PROPERTIES.QUOTE_NUMBER]),
    clientId: extractRelation(props[QUOTE_PROPERTIES.CLIENT])[0] || '',
    clientName: extractText(props[QUOTE_PROPERTIES.CLIENT]),
    issueDate: extractDate(props[QUOTE_PROPERTIES.ISSUE_DATE]),
    validUntil: extractDate(props[QUOTE_PROPERTIES.VALID_UNTIL]),
    status: extractSelect(props[QUOTE_PROPERTIES.STATUS]) as
      | "대기"
      | "승인"
      | "거절"
      | "만료",
    totalAmount: extractNumber(props[QUOTE_PROPERTIES.TOTAL_AMOUNT]),
    lineItems,
    description: extractText(props[QUOTE_PROPERTIES.DESCRIPTION]),
    notes: extractText(props[QUOTE_PROPERTIES.NOTES]),
    createdAt: row.created_time,
    updatedAt: row.last_edited_time,
  }
}

// ==========================================
// 청구서 매퍼
// ==========================================

/**
 * Notion 청구서 데이터를 Invoice 타입으로 변환
 */
export function mapNotionToInvoice(
  row: NotionDatabaseRow,
  lineItems: LineItem[] = []
): Invoice {
  const props = row.properties

  return {
    id: row.id,
    invoiceNumber: extractTitle(props[INVOICE_PROPERTIES.INVOICE_NUMBER]),
    quoteId: extractRelation(props[INVOICE_PROPERTIES.QUOTE])[0] || '',
    clientId: extractRelation(props[INVOICE_PROPERTIES.CLIENT])[0] || '',
    clientName: extractText(props[INVOICE_PROPERTIES.CLIENT]),
    issueDate: extractDate(props[INVOICE_PROPERTIES.ISSUE_DATE]),
    dueDate: extractDate(props[INVOICE_PROPERTIES.DUE_DATE]),
    status: extractSelect(props[INVOICE_PROPERTIES.STATUS]) as
      | "발행"
      | "송금 대기"
      | "부분 결제"
      | "완납",
    totalAmount: extractNumber(props[INVOICE_PROPERTIES.TOTAL_AMOUNT]),
    paidAmount: extractNumber(props[INVOICE_PROPERTIES.PAID_AMOUNT]),
    lineItems,
    paymentTerms: extractText(props[INVOICE_PROPERTIES.PAYMENT_TERMS]),
    notes: extractText(props[INVOICE_PROPERTIES.NOTES]),
    createdAt: row.created_time,
    updatedAt: row.last_edited_time,
  }
}

// ==========================================
// 결제 기록 매퍼
// ==========================================

/**
 * Notion 결제 기록 데이터를 PaymentRecord 타입으로 변환
 */
export function mapNotionToPayment(row: NotionDatabaseRow): PaymentRecord {
  const props = row.properties

  return {
    id: row.id,
    invoiceId: extractRelation(props['Invoice'])[0] || '',
    amount: extractNumber(props['Amount']),
    paymentDate: extractDate(props['Payment Date']),
    paymentMethod: extractSelect(props['Payment Method']) as
      | "계좌이체"
      | "카드"
      | "현금"
      | "수표"
      | "기타",
    reference: extractText(props['Reference']),
    createdAt: row.created_time,
  }
}

// ==========================================
// 역방향 매퍼 (우리 타입을 Notion 형식으로)
// ==========================================

/**
 * Client를 Notion 형식으로 변환 (생성/업데이트용)
 */
export function clientToNotionProperties(client: Client) {
  return {
    [CLIENT_PROPERTIES.NAME]: {
      title: [
        {
          text: {
            content: client.name,
          },
        },
      ],
    },
    [CLIENT_PROPERTIES.EMAIL]: {
      email: client.email,
    },
    [CLIENT_PROPERTIES.PHONE]: {
      phone_number: client.phone,
    },
    [CLIENT_PROPERTIES.COMPANY]: {
      rich_text: [
        {
          text: {
            content: client.company || '',
          },
        },
      ],
    },
    [CLIENT_PROPERTIES.ADDRESS]: {
      rich_text: [
        {
          text: {
            content: client.address || '',
          },
        },
      ],
    },
  }
}

/**
 * ProjectQuote를 Notion 형식으로 변환
 */
export function quoteToNotionProperties(quote: ProjectQuote) {
  return {
    [QUOTE_PROPERTIES.QUOTE_NUMBER]: {
      title: [
        {
          text: {
            content: quote.quoteNumber,
          },
        },
      ],
    },
    [QUOTE_PROPERTIES.CLIENT]: {
      relation: [
        {
          id: quote.clientId,
        },
      ],
    },
    [QUOTE_PROPERTIES.ISSUE_DATE]: {
      date: {
        start: quote.issueDate,
      },
    },
    [QUOTE_PROPERTIES.VALID_UNTIL]: {
      date: {
        start: quote.validUntil,
      },
    },
    [QUOTE_PROPERTIES.STATUS]: {
      select: {
        name: quote.status,
      },
    },
    [QUOTE_PROPERTIES.TOTAL_AMOUNT]: {
      number: quote.totalAmount,
    },
    [QUOTE_PROPERTIES.DESCRIPTION]: {
      rich_text: [
        {
          text: {
            content: quote.description || '',
          },
        },
      ],
    },
    [QUOTE_PROPERTIES.NOTES]: {
      rich_text: [
        {
          text: {
            content: quote.notes || '',
          },
        },
      ],
    },
  }
}

/**
 * Invoice를 Notion 형식으로 변환
 */
export function invoiceToNotionProperties(invoice: Invoice) {
  return {
    [INVOICE_PROPERTIES.INVOICE_NUMBER]: {
      title: [
        {
          text: {
            content: invoice.invoiceNumber,
          },
        },
      ],
    },
    [INVOICE_PROPERTIES.QUOTE]: {
      relation: [
        {
          id: invoice.quoteId,
        },
      ],
    },
    [INVOICE_PROPERTIES.CLIENT]: {
      relation: [
        {
          id: invoice.clientId,
        },
      ],
    },
    [INVOICE_PROPERTIES.ISSUE_DATE]: {
      date: {
        start: invoice.issueDate,
      },
    },
    [INVOICE_PROPERTIES.DUE_DATE]: {
      date: {
        start: invoice.dueDate,
      },
    },
    [INVOICE_PROPERTIES.STATUS]: {
      select: {
        name: invoice.status,
      },
    },
    [INVOICE_PROPERTIES.TOTAL_AMOUNT]: {
      number: invoice.totalAmount,
    },
    [INVOICE_PROPERTIES.PAID_AMOUNT]: {
      number: invoice.paidAmount,
    },
    [INVOICE_PROPERTIES.PAYMENT_TERMS]: {
      rich_text: [
        {
          text: {
            content: invoice.paymentTerms || '',
          },
        },
      ],
    },
    [INVOICE_PROPERTIES.NOTES]: {
      rich_text: [
        {
          text: {
            content: invoice.notes || '',
          },
        },
      ],
    },
  }
}
