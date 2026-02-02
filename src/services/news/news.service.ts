import { axiosAuth } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type {
  INews,
  INewsCreatePayload,
  INewsListParams,
  INewsUpdate,
} from "@/types/news.types"

class NewsService {
  private _BASE_URL = "/news"

  async fetchNews(params?: INewsListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<INews>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async createNews(payload: INewsCreatePayload) {
    const response = await axiosAuth.post<ApiResponse<INews>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }

  async updateNews(oid: string, payload: INewsUpdate) {
    const response = await axiosAuth.put<ApiResponse<INews>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async deleteNews(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new NewsService()
