import { axiosAuth } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type {
  IReview,
  IReviewCreate,
  IReviewsListParams,
  IReviewUpdate,
} from "@/types/reviews.types"

class ReviewsService {
  private _BASE_URL = "/reviews"

  async fetchReviews(params?: IReviewsListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<IReview>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async fetchReviewById(oid: string) {
    const response = await axiosAuth.get<ApiResponse<IReview>>(
      `${this._BASE_URL}/${oid}`,
    )
    return { data: response.data.data }
  }

  async createReview(payload: IReviewCreate) {
    const response = await axiosAuth.post<ApiResponse<IReview>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }

  async updateReview(oid: string, payload: IReviewUpdate) {
    const response = await axiosAuth.put<ApiResponse<IReview>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async deleteReview(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new ReviewsService()
