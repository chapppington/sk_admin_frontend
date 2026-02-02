export const CERTIFICATE_SECTIONS = [
  "Декларации",
  "Сертификаты",
  "Бухгалтерские документы",
  "Юридические документы",
  "Опросные листы",
] as const

export type CertificateSection = (typeof CERTIFICATE_SECTIONS)[number]

export interface ICertificateGroup {
  oid: string
  section: string
  title: string
  content: string
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ICertificate {
  oid: string
  title: string
  link: string
  order: number
  created_at: string
  updated_at: string
}

export interface ICertificateGroupsListParams {
  limit?: number
  offset?: number
  section?: string
  is_active?: boolean
  search?: string
  sort_field?: string
  sort_order?: number
}

export interface ICertificatesListParams {
  limit?: number
  offset?: number
  certificate_group_id?: string
  search?: string
  sort_field?: string
  sort_order?: number
}

export type ICertificateGroupCreate = Omit<
  ICertificateGroup,
  "oid" | "created_at" | "updated_at"
>

export type ICertificateGroupUpdate = Partial<ICertificateGroupCreate>

export type ICertificateCreate = Omit<
  ICertificate,
  "oid" | "created_at" | "updated_at"
>

export type ICertificateUpdate = Partial<ICertificateCreate>
