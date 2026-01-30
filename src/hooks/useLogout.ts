"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"
import { LOGIN_PAGES } from "@/config/pages/login.config"
import authService from "@/services/auth/auth.service"

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()

  const logout = () => {
    authService.logout()
    queryClient.removeQueries({ queryKey: ["profile"] })
    toast.success("Вы вышли из аккаунта")
    startTransition(() => {
      router.push(LOGIN_PAGES.LOGIN)
    })
  }

  return { logout, isPending }
}
