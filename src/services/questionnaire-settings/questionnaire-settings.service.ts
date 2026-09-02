import { axiosAuth } from "@/api/axios"
import type { ApiResponse } from "@/types/api.types"
import type {
  IQuestionnaireSettings,
  IQuestionnaireSettingsCreate,
  IQuestionnaireSettingsUpdate,
} from "@/types/questionnaire-settings.types"

class QuestionnaireSettingsService {
  private _BASE_URL = "/questionnaire-settings"

  async fetchAll() {
    const response = await axiosAuth.get<ApiResponse<IQuestionnaireSettings[]>>(
      this._BASE_URL,
    )
    return { data: response.data.data }
  }

  async create(payload: IQuestionnaireSettingsCreate) {
    const response = await axiosAuth.post<ApiResponse<IQuestionnaireSettings>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }

  async update(oid: string, payload: IQuestionnaireSettingsUpdate) {
    const response = await axiosAuth.put<ApiResponse<IQuestionnaireSettings>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async delete(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new QuestionnaireSettingsService()
