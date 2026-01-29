import { axiosAuth } from "@/api/axios"
import type { ApiResponse } from "@/shared/types/api.types"
import type { IUser } from "@/shared/types/user.types"

class UserService {
  private _BASE_URL = "/users"

  async fetchProfile() {
    const response = await axiosAuth.get<ApiResponse<IUser>>(
      `${this._BASE_URL}/me`,
    )
    return { data: response.data.data }
  }
}

export default new UserService()
