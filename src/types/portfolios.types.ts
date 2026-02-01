export interface IPortfolio {
  oid: string
  name: string
  slug: string
  poster: string
  poster_alt: string
  year: number
  task_title: string
  task_description: string
  solution_title: string
  solution_description: string
  solution_subtitle: string
  solution_subdescription: string
  solution_image_left: string
  solution_image_left_alt: string
  solution_image_right: string
  solution_image_right_alt: string
  description: string
  has_review: boolean
  review_title: string | null
  review_text: string | null
  review_name: string | null
  review_image: string | null
  review_role: string | null
  created_at: string
  updated_at: string
}

export interface IPortfolioListParams {
  limit?: number
  offset?: number
  year?: number
  search?: string
  sort_field?: string
  sort_order?: number
}

export type IPortfolioCreate = Omit<
  IPortfolio,
  "oid" | "created_at" | "updated_at"
>

export type IPortfolioUpdate = Partial<IPortfolioCreate>
