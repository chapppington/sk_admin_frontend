import { axiosAuth } from "@/api/axios"
import type { ApiResponse } from "@/types/api.types"
import type {
  IWarehouseFile,
  IWarehouseFilePayload,
} from "@/types/warehouse-file.types"

class WarehouseFileService {
  private _BASE_URL = "/warehouse-file"

  async fetch() {
    const response = await axiosAuth.get<ApiResponse<IWarehouseFile | null>>(
      this._BASE_URL,
    )
    return { data: response.data.data }
  }

  async upsert(payload: IWarehouseFilePayload) {
    const response = await axiosAuth.put<ApiResponse<IWarehouseFile>>(
      this._BASE_URL,
      payload,
    )
    return { data: response.data.data }
  }
}

export default new WarehouseFileService()
