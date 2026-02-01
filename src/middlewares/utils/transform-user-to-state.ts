import type { TProtectUserData } from "@/types/auth.types"

export type TUserDataState = {
  sub: string
  isLoggedIn: boolean
}

export const transformUserToState = (
  user: TProtectUserData,
): TUserDataState | null => {
  return {
    sub: user.sub,
    isLoggedIn: true,
  }
}
