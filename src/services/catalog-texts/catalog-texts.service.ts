import { axiosAuth } from "@/api/axios"
import type { ApiResponse } from "@/types/api.types"
import type {
  CatalogText,
  CatalogTextDocument,
} from "@/types/catalog-text.types"

class CatalogTextsService {
  private _BASE_URL = "/catalog-texts"

  async fetchAll() {
    const response = await axiosAuth.get<ApiResponse<CatalogText[]>>(
      this._BASE_URL,
    )
    return { data: response.data.data }
  }

  async upsert(category: string, content: CatalogTextDocument) {
    const response = await axiosAuth.put<ApiResponse<CatalogText>>(
      `${this._BASE_URL}/category/${encodeURIComponent(category)}`,
      { content },
    )
    return { data: response.data.data }
  }
}

export default new CatalogTextsService()
