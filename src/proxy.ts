import { type NextRequest, NextResponse } from "next/server"
import { DASHBOARD_HOME } from "@/config/dashboard.pages"
import { LOGIN_PAGES } from "@/config/login.pages"
import { protectDashboardPages } from "@/middlewares/protect-dashboard.middleware"
import { protectLoginPages } from "@/middlewares/protect-login.middleware"

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith(LOGIN_PAGES.LOGIN)) {
    return protectLoginPages(request)
  }

  if (pathname.startsWith(DASHBOARD_HOME)) {
    return protectDashboardPages(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
