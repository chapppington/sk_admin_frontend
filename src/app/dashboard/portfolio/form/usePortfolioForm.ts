"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { usePortfolios } from "@/hooks/usePortfolios"
import type { IPortfolio, IPortfolioCreate } from "@/types/portfolios.types"
import { slugify } from "@/shared/utils/slugify"
import { toFormValues } from "@/app/dashboard/portfolio/form/utils"

export type UsePortfolioFormParams = {
  portfolio: IPortfolio | null
  onOpenChange: (open: boolean) => void
}

export function usePortfolioForm({ portfolio, onOpenChange }: UsePortfolioFormParams) {
  const { createMutation, updateMutation } = usePortfolios()
  const isEdit = Boolean(portfolio?.oid)
  const form = useForm<IPortfolioCreate>({
    defaultValues: toFormValues(portfolio),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<IPortfolioCreate> = (data) => {
    const payload = {
      ...data,
      slug: slugify(data.name),
    }
    if (isEdit && portfolio) {
      updateMutation.mutate({ oid: portfolio.oid, data: payload }, { onSuccess })
    } else {
      createMutation.mutate(payload, { onSuccess })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    control: form.control,
    watch: form.watch,
    setValue: form.setValue,
    isEdit,
    isLoading,
  }
}
