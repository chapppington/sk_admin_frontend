export interface IVacancy {
  oid: string
  title: string
  requirements: string[]
  experience: string[]
  salary: number
  category: string
  created_at: string
  updated_at: string
}

export interface IVacancyListParams {
  limit?: number
  offset?: number
  category?: string
  search?: string
  sort_field?: string
  sort_order?: number
}

export type IVacancyCreate = Omit<IVacancy, "oid" | "created_at" | "updated_at">

export type IVacancyCreatePayload = IVacancyCreate

export type IVacancyUpdate = Partial<IVacancyCreatePayload>
