import { Client } from '@notionhq/client'

const notionApiKey = process.env.NOTION_API_KEY

if (!notionApiKey) {
  throw new Error('NOTION_API_KEY 환경 변수가 설정되지 않았습니다.')
}

export const notion = new Client({
  auth: notionApiKey,
  timeoutMs: 30000,
})
