import { axiosAuth } from "@/api/axios"
import type {
  ApiResponse,
  ListPaginatedResponse,
} from "@/types/api.types"
import type { ISubmission, ISubmissionsListParams } from "@/types/submissions.types"

class SubmissionsService {
  private _BASE_URL = "/submissions"

  async fetchSubmissions(params?: ISubmissionsListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<ISubmission>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async deleteSubmission(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new SubmissionsService()
