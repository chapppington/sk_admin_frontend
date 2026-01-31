"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"
import { LOGIN_PAGES } from "@/config/login.pages"
import authService from "@/services/auth/auth.service"

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => authService.fetchProfile(),
    refetchInterval: 1800000,
  })

  const user = data?.data ?? null

  const logout = () => {
    authService.logout()
    queryClient.removeQueries({ queryKey: ["profile"] })
    toast.success("Вы вышли из аккаунта")
    startTransition(() => {
      router.push(LOGIN_PAGES.LOGIN)
    })
  }

  return {
    user,
    isLoading,
    refetch,
    logout,
    isPending,
  }
}
