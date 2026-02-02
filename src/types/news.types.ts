export const NEWS_CATEGORIES = [
  "Производство",
  "Разработки",
  "Полезное",
  "События",
  "Наши проекты",
] as const

export type NewsCategory = (typeof NEWS_CATEGORIES)[number]

export interface INews {
  oid: string
  category: string
  title: string
  slug: string
  content: string
  short_content: string
  image_url: string | null
  alt: string | null
  reading_time: number
  date: string
  created_at: string
  updated_at: string
}

export interface INewsListParams {
  limit?: number
  offset?: number
  category?: string
  search?: string
  sort_field?: string
  sort_order?: number
}

export type INewsCreate = Omit<
  INews,
  "oid" | "created_at" | "updated_at" | "slug" | "reading_time"
>

export type INewsCreatePayload = INewsCreate & {
  slug: string
  reading_time: number
}

export type INewsUpdate = Partial<INewsCreatePayload>
