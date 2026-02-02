import { axiosAuth } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type {
  ICertificate,
  ICertificateCreate,
  ICertificatesListParams,
  ICertificateUpdate,
} from "@/types/certificates.types"

class CertificatesService {
  private _BASE_URL = "/certificates"

  async fetchCertificates(params?: ICertificatesListParams) {
    const response = await axiosAuth.get<
      ApiResponse<ListPaginatedResponse<ICertificate>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async fetchCertificateById(oid: string) {
    const response = await axiosAuth.get<ApiResponse<ICertificate>>(
      `${this._BASE_URL}/${oid}`,
    )
    return { data: response.data.data }
  }

  async createCertificate(
    certificateGroupId: string,
    payload: ICertificateCreate,
  ) {
    const response = await axiosAuth.post<ApiResponse<ICertificate>>(
      this._BASE_URL,
      payload,
      { params: { certificate_group_id: certificateGroupId } },
    )
    return { data: response.data.data }
  }

  async updateCertificate(oid: string, payload: ICertificateUpdate) {
    const response = await axiosAuth.put<ApiResponse<ICertificate>>(
      `${this._BASE_URL}/${oid}`,
      payload,
    )
    return { data: response.data.data }
  }

  async patchCertificateOrder(oid: string, order: number) {
    const response = await axiosAuth.patch<ApiResponse<ICertificate>>(
      `${this._BASE_URL}/${oid}/order`,
      { order },
    )
    return { data: response.data.data }
  }

  async deleteCertificate(oid: string) {
    await axiosAuth.delete(`${this._BASE_URL}/${oid}`)
  }
}

export default new CertificatesService()
