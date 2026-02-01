export interface ApiResponse<T> {
  data: T
  meta?: Record<string, unknown>
  errors?: unknown[]
}

export interface Pagination {
  limit: number
  offset: number
  total: number
}

export interface ListPaginatedResponse<T> {
  items: T[]
  pagination: Pagination
}
