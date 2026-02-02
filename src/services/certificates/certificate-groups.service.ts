import { axiosAuth } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type {
  ICertificateGroup,
  ICertificateGroupCreate,
  ICertificateGroupsListParams,
  ICertificateGroupUpdate,
} from "@/types/certificates.types"

class CertificateGroupsService {
  private _BASE_URL = "/certificate-groups"

  async fetchCertificateGroups(params?: ICertificateGroupsListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<ICertificateGroup>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async fetchCertificateGroupById(oid: string) {
    const response = await axiosAuth.get<ApiResponse<ICertificateGroup>>(
      `${this._BASE_URL}/${oid}`,
    )
    return { data: response.data.data }
  }

  async createCertificateGroup(payload: ICertificateGroupCreate) {
    const response = await axiosAuth.post<ApiResponse<ICertificateGroup>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }

  async updateCertificateGroup(oid: string, payload: ICertificateGroupUpdate) {
    const response = await axiosAuth.put<ApiResponse<ICertificateGroup>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async patchCertificateGroupOrder(oid: string, order: number) {
    const response = await axiosAuth.patch<ApiResponse<ICertificateGroup>>(
      `${this._BASE_URL}/${oid}/order`,
      { order },
    )
    return { data: response.data.data }
  }

  async deleteCertificateGroup(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new CertificateGroupsService()
