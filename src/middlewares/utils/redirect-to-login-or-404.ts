import type { NextRequest } from "next/server"
import { LOGIN_PAGES } from "@/config/pages/login.config"
import { nextRedirect } from "./next-redirect"

export const redirectToLoginOrNotFound = (request: NextRequest) => {
  return nextRedirect(LOGIN_PAGES.LOGIN, request.url)
}
