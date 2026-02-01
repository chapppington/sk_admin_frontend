export interface ISeoSettings {
  oid: string
  page_path: string
  page_name: string
  title: string
  description: string
  keywords: string | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
  canonical_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ISeoSettingsListParams {
  limit?: number
  offset?: number
  search?: string
  is_active?: boolean
  sort_field?: string
  sort_order?: number
}

export type ISeoSettingsCreate = Omit<
  ISeoSettings,
  "oid" | "created_at" | "updated_at"
>

export type ISeoSettingsUpdate = Partial<ISeoSettingsCreate>
