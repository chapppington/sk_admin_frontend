import { axiosDefault } from "@/api/axios"
import type { ApiResponse } from "@/shared/types/api.types"
import type { ILoginFormData } from "@/shared/types/auth.types"
import authTokenService from "./auth-token.service"

interface TokenResponse {
  access_token: string
  refresh_token: string
}

interface RefreshTokenResponse {
  access_token: string
}

class AuthService {
  async login(data: ILoginFormData) {
    const response = await axiosDefault.post<ApiResponse<TokenResponse>>(
      "/auth/login",
      data,
    )

    const tokens = response.data.data

    if (tokens.access_token && tokens.refresh_token) {
      authTokenService.saveAccessToken(tokens.access_token)
      authTokenService.saveRefreshToken(tokens.refresh_token)
    }

    return tokens
  }

  async refreshToken() {
    const response = await axiosDefault.post<ApiResponse<RefreshTokenResponse>>(
      "/auth/token/refresh",
    )

    const tokenData = response.data.data

    if (tokenData.access_token) {
      authTokenService.saveAccessToken(tokenData.access_token)
    }

    return tokenData
  }

  async logout() {
    authTokenService.removeAccessToken()
    authTokenService.removeRefreshToken()
  }
}

export default new AuthService()
