export const CATALOG_CATEGORIES = [
  { key: "transformatornye-podstancii", label: "Трансформаторные подстанции" },
  {
    key: "raspredelitelnye-ustroystva-srednego-napryazheniya-6-10-kv",
    label: "Распределительные устройства среднего напряжения 6(10) кВ",
  },
  {
    key: "raspredelitelnye-ustroystva-nizkogo-napryazheniya-04-kv",
    label: "Распределительные устройства низкого напряжения 0,4 кВ",
  },
  {
    key: "punkty-ucheta-i-sekcionirovaniya-vle",
    label:
      "Пункты коммерческого учёта и секционирования воздушных линий электропередач",
  },
  { key: "elektrostancii-i-ustanovki", label: "Электростанции и установки" },
] as const

export type CatalogCategoryKey = (typeof CATALOG_CATEGORIES)[number]["key"]

export type CatalogTextDocument = {
  type: string
  text?: string
  attrs?: {
    level?: number
    start?: number
  }
  marks?: { type: string }[]
  content?: CatalogTextDocument[]
}

export type CatalogText = {
  oid: string
  category: string
  content: CatalogTextDocument
  created_at: string
  updated_at: string
}

export type CatalogTextUpsert = {
  category: CatalogCategoryKey
  content: CatalogTextDocument
}
