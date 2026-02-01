import { axiosAuth } from "@/api/axios"
import type {
  ApiResponse,
  ListPaginatedResponse,
} from "@/types/api.types"
import type {
  IVacancy,
  IVacancyCreatePayload,
  IVacancyListParams,
  IVacancyUpdate,
} from "@/types/vacancies.types"

class VacanciesService {
  private _BASE_URL = "/vacancies"

  async fetchVacancies(params?: IVacancyListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<IVacancy>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async createVacancy(payload: IVacancyCreatePayload) {
    const response = await axiosAuth.post<ApiResponse<IVacancy>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }

  async updateVacancy(oid: string, payload: IVacancyUpdate) {
    const response = await axiosAuth.put<ApiResponse<IVacancy>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async deleteVacancy(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new VacanciesService()
