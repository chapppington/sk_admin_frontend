export const BUCKET_NAMES = {
  news: "news",
  portfolios: "portfolios",
  products: "products",
  seo: "seo",
  certificates: "certificates",
  team: "team",
} as const

export type BucketName = (typeof BUCKET_NAMES)[keyof typeof BUCKET_NAMES]
