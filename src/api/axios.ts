import axios, { type CreateAxiosDefaults } from "axios"
import { API_URL } from "@/constants"
import authService from "@/services/auth/auth.service"
import authTokenService from "@/services/auth/auth-token.service"
import { errorCatch, getContentType } from "./api.helper"

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true,
}

export const axiosDefault = axios.create(axiosOptions)

export const axiosAuth = axios.create(axiosOptions)

axiosAuth.interceptors.request.use((config) => {
  const accessToken = authTokenService.getAccessToken()

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true

      try {
        await authService.refreshToken()
        return axiosAuth.request(originalRequest)
      } catch (refreshError) {
        const errorType = errorCatch(refreshError, "type")
        if (
          errorType === "MissingTokenError" ||
          errorType === "JWTDecodeError"
        ) {
          authTokenService.removeAccessToken()
          authTokenService.removeRefreshToken()
        }
        throw refreshError
      }
    }

    throw error
  },
)
