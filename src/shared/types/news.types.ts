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

export interface INewsPagination {
  limit: number
  offset: number
  total: number
}

export interface INewsListResponse {
  items: INews[]
  pagination: INewsPagination
}

export interface INewsListParams {
  limit?: number
  offset?: number
  category?: string
  search?: string
  sort_field?: string
  sort_order?: number
}

export type INewsCreate = Omit<INews, "oid" | "created_at" | "updated_at">

export type INewsUpdate = Partial<INewsCreate>
