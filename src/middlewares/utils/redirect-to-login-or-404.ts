import type { NextRequest } from "next/server"
import { LOGIN_PAGES } from "@/config/login.pages"
import { nextRedirect } from "./next-redirect"

export const redirectToLoginOrNotFound = (request: NextRequest) => {
  return nextRedirect(LOGIN_PAGES.LOGIN, request.url)
}
