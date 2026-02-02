export const REVIEW_CATEGORIES = ["Сотрудники", "Клиенты"] as const

export type ReviewCategory = (typeof REVIEW_CATEGORIES)[number]

export interface IReview {
  oid: string
  name: string
  category: string
  position: string | null
  image: string | null
  text: string | null
  short_text: string | null
  content_url: string | null
  created_at: string
  updated_at: string
}

export interface IReviewsListParams {
  limit?: number
  offset?: number
  category?: string
  sort_field?: string
  sort_order?: number
}

export type IReviewCreate = Omit<IReview, "oid" | "created_at" | "updated_at">

export type IReviewUpdate = Partial<IReviewCreate>
