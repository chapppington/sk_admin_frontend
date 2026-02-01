import { axiosAuth } from "@/api/axios"
import type {
  ApiResponse,
  ListPaginatedResponse,
} from "@/types/api.types"
import type {
  IPortfolio,
  IPortfolioCreate,
  IPortfolioListParams,
  IPortfolioUpdate,
} from "@/types/portfolios.types"

class PortfoliosService {
  private _BASE_URL = "/portfolios"

  async fetchPortfolios(params?: IPortfolioListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<IPortfolio>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async createPortfolio(payload: IPortfolioCreate) {
    const response = await axiosAuth.post<ApiResponse<IPortfolio>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }

  async updatePortfolio(oid: string, payload: IPortfolioUpdate) {
    const response = await axiosAuth.put<ApiResponse<IPortfolio>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async deletePortfolio(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new PortfoliosService()
