"use client"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { DASHBOARD_HOME } from "@/config/dashboard.pages"
import authService from "@/services/auth/auth.service"
import type { ILoginFormData } from "@/types/auth.types"

export function useAuthForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const loginForm = useForm<ILoginFormData>()

  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILoginFormData) => authService.login(data),
    onSuccess() {
      startTransition(() => {
        loginForm.reset()
        toast.success("Успешный вход!")
        router.push(DASHBOARD_HOME)
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "Ошибка при входе"
        toast.error(errorMessage)
      }
    },
  })

  const onSubmitLogin: SubmitHandler<ILoginFormData> = (data) => {
    mutateLogin(data)
  }

  const isLoading = isPending || isLoginPending

  return {
    register: loginForm.register,
    handleSubmit: loginForm.handleSubmit(onSubmitLogin),
    isLoading,
  }
}
