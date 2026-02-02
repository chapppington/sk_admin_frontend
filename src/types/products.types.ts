export const PRODUCT_CATEGORIES = [
  "Трансформаторные подстанции",
  "Распределительные устройства среднего напряжения 6(10) кВ",
  "Распределительные устройства низкого напряжения 0,4 кВ",
  "Пункты коммерческого учёта и секционирования воздушных линий электропередач",
  "Электростанции и установки",
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export interface ImportantCharacteristicUnit {
  text: string
}

export interface ImportantCharacteristic {
  value: string
  unit: ImportantCharacteristicUnit | null
  description: string
}

export interface Advantage {
  label: string
  icon: string
  image: string | null
  alt: string | null
  description: string
}

export interface SimpleDescription {
  text: string
}

export interface DetailedDescription {
  title: string
  description: string
}

export interface Documentation {
  title: string
  url: string
  type: string
}

export interface IProduct {
  oid: string
  category: string
  name: string
  slug: string
  description: string
  preview_image_url: string
  preview_image_alt: string | null
  important_characteristics: ImportantCharacteristic[]
  advantages: Advantage[]
  simple_description: SimpleDescription[]
  detailed_description: DetailedDescription[]
  documentation: Documentation[] | null
  order: number
  is_shown: boolean
  show_advantages: boolean
  portfolio_ids: string[]
  created_at: string
  updated_at: string
}

export interface IProductsListParams {
  limit?: number
  offset?: number
  search?: string
  category?: string
  is_shown?: boolean
  sort_field?: string
  sort_order?: number
}

export type IProductCreate = Omit<
  IProduct,
  "oid" | "created_at" | "updated_at"
>

export type IProductUpdate = Partial<IProductCreate>
