import type { NextRequest } from "next/server";
import { PUBLIC_PAGES } from "@/config/pages/public.config";
import { nextRedirect } from "./next-redirect";

export const redirectToLoginOrNotFound = (request: NextRequest) => {
  return nextRedirect(PUBLIC_PAGES.LOGIN, request.url);
};
