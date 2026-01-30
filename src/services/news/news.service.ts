import { axiosAuth } from "@/api/axios"
import type { ApiResponse } from "@/shared/types/api.types"
import type {
  INewsListParams,
  INewsListResponse,
} from "@/shared/types/news.types"

class NewsService {
  private _BASE_URL = "/news"

  async fetchNews(params?: INewsListParams) {
    const response = await axiosAuth.get<ApiResponse<INewsListResponse>>(
      this._BASE_URL,
      { params },
    )
    return { data: response.data.data }
  }
}

export default new NewsService()
