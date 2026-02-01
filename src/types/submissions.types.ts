export interface ISubmission {
  oid: string
  form_type: string
  name: string
  email: string | null
  phone: string | null
  comments: string | null
  files: string[]
  answers_file_url: string | null
  created_at: string
  updated_at: string
}

export interface ISubmissionsListParams {
  limit?: number
  offset?: number
  form_type?: string
  sort_field?: string
  sort_order?: number
}
