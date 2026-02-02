import { axiosAuth } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type {
  ISeoSettings,
  ISeoSettingsCreate,
  ISeoSettingsListParams,
  ISeoSettingsUpdate,
} from "@/types/seo-settings.types"

class SeoSettingsService {
  private _BASE_URL = "/seo-settings"

  async fetchSeoSettings(params?: ISeoSettingsListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<ISeoSettings>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async createSeoSettings(payload: ISeoSettingsCreate) {
    const response = await axiosAuth.post<ApiResponse<ISeoSettings>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }

  async updateSeoSettings(oid: string, payload: ISeoSettingsUpdate) {
    const response = await axiosAuth.put<ApiResponse<ISeoSettings>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async deleteSeoSettings(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new SeoSettingsService()
