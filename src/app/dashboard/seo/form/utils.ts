import type { ISeoSettings, ISeoSettingsCreate } from "@/types/seo-settings.types"

export function toFormValues(seoSettings: ISeoSettings | null): ISeoSettingsCreate {
  if (!seoSettings) {
    return {
      page_path: "",
      page_name: "",
      title: "",
      description: "",
      keywords: null,
      og_title: null,
      og_description: null,
      og_image: null,
      canonical_url: null,
      is_active: true,
    }
  }
  return {
    page_path: seoSettings.page_path,
    page_name: seoSettings.page_name,
    title: seoSettings.title,
    description: seoSettings.description,
    keywords: seoSettings.keywords ?? null,
    og_title: seoSettings.og_title ?? null,
    og_description: seoSettings.og_description ?? null,
    og_image: seoSettings.og_image ?? null,
    canonical_url: seoSettings.canonical_url ?? null,
    is_active: seoSettings.is_active,
  }
}
