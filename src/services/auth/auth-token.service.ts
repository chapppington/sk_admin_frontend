import Cookies from "js-cookie"
import { AuthToken } from "@/types/auth.types"

const isProduction = process.env.NODE_ENV === "production"

const cookieOptions = {
  sameSite: "lax" as const,
  path: "/",
  secure: isProduction,
}

class AuthTokenService {
  getAccessToken() {
    const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN)
    return accessToken || null
  }

  getRefreshToken() {
    const refreshToken = Cookies.get(AuthToken.REFRESH_TOKEN)
    return refreshToken || null
  }

  saveAccessToken(accessToken: string) {
    Cookies.set(AuthToken.ACCESS_TOKEN, accessToken, {
      ...cookieOptions,
      expires: 1,
    })
  }

  saveRefreshToken(refreshToken: string) {
    Cookies.set(AuthToken.REFRESH_TOKEN, refreshToken, {
      ...cookieOptions,
      expires: 7,
    })
  }

  removeAccessToken() {
    Cookies.remove(AuthToken.ACCESS_TOKEN, cookieOptions)
  }

  removeRefreshToken() {
    Cookies.remove(AuthToken.REFRESH_TOKEN, cookieOptions)
  }
}

export default new AuthTokenService()
