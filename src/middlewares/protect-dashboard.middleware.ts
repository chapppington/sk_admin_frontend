"use server"

import { type NextRequest, NextResponse } from "next/server"

import { AuthToken } from "@/types/auth.types"
import { getTokensFromRequest } from "./utils/get-tokens-from-request"
import { jwtVerifyServer } from "./utils/jwt-verify"
import { redirectToLoginOrNotFound } from "./utils/redirect-to-login-or-404"

export async function protectDashboardPages(request: NextRequest) {
  const tokens = await getTokensFromRequest(request)
  if (!tokens) return redirectToLoginOrNotFound(request)

  const verifiedData = await jwtVerifyServer(tokens.accessToken)
  if (!verifiedData) return redirectToLoginOrNotFound(request)

  const response = NextResponse.next()
  const currentAccessToken = request.cookies.get(AuthToken.ACCESS_TOKEN)?.value

  if (tokens.accessToken !== currentAccessToken) {
    response.cookies.set(AuthToken.ACCESS_TOKEN, tokens.accessToken, {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    })
  }

  return response
}
