import { axiosAuth } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type {
  IMember,
  IMemberCreate,
  IMembersListParams,
  IMemberUpdate,
} from "@/types/members.types"

class MembersService {
  private _BASE_URL = "/members"

  async fetchMembers(params?: IMembersListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<IMember>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async fetchMemberById(oid: string) {
    const response = await axiosAuth.get<ApiResponse<IMember>>(
      `${this._BASE_URL}/${oid}`,
    )
    return { data: response.data.data }
  }

  async createMember(payload: IMemberCreate) {
    const response = await axiosAuth.post<ApiResponse<IMember>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }

  async updateMember(oid: string, payload: IMemberUpdate) {
    const response = await axiosAuth.put<ApiResponse<IMember>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async patchMemberOrder(oid: string, order: number) {
    const response = await axiosAuth.patch<ApiResponse<IMember>>(
      `${this._BASE_URL}/${oid}/order`,
      { order },
    )
    return { data: response.data.data }
  }

  async deleteMember(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new MembersService()
