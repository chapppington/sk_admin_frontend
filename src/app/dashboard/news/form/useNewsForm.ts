"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { useNews } from "@/hooks/useNews"
import type { INews, INewsCreate, INewsCreatePayload } from "@/types/news.types"
import { getReadingTimeMinutes } from "@/shared/utils/reading-time"
import { slugify } from "@/shared/utils/slugify"
import { toFormValues } from "@/app/dashboard/news/form/utils"

export type UseNewsFormParams = {
  news: INews | null
  onOpenChange: (open: boolean) => void
}

export function useNewsForm({ news, onOpenChange }: UseNewsFormParams) {
  const { createMutation, updateMutation } = useNews()
  const isEdit = Boolean(news?.oid)
  const form = useForm<INewsCreate>({
    defaultValues: toFormValues(news),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<INewsCreate> = (data) => {
    const payload: INewsCreatePayload = {
      ...data,
      slug: slugify(data.title),
      reading_time: getReadingTimeMinutes(data.content),
    }
    if (isEdit && news) {
      updateMutation.mutate({ oid: news.oid, data: payload }, { onSuccess })
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
