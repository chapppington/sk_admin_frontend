"use client"

import { useEffect } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useNews } from "@/hooks/useNews"
import type {
  INews,
  INewsCreate,
  INewsCreatePayload,
} from "@/shared/types/news.types"
import { getReadingTimeMinutes } from "@/shared/utils/reading-time"
import { slugify } from "@/shared/utils/slugify"

export const VALID_NEWS_CATEGORIES = [
  "Производство",
  "Разработки",
  "Полезное",
  "События",
  "Наши проекты",
] as const

function toFormValues(news: INews | null): INewsCreate {
  if (!news) {
    return {
      category: "",
      title: "",
      content: "",
      short_content: "",
      image_url: null,
      alt: null,
      date: new Date().toISOString().slice(0, 10),
    }
  }
  return {
    category: news.category,
    title: news.title,
    content: news.content,
    short_content: news.short_content,
    image_url: news.image_url ?? null,
    alt: news.alt ?? null,
    date: news.date.slice(0, 10),
  }
}

export type UseNewsFormParams = {
  open: boolean
  news: INews | null
  onOpenChange: (open: boolean) => void
}

export function useNewsForm({ open, news, onOpenChange }: UseNewsFormParams) {
  const { createMutation, updateMutation } = useNews()
  const isEdit = Boolean(news?.oid)
  const form = useForm<INewsCreate>({
    defaultValues: toFormValues(null),
  })

  useEffect(() => {
    if (open) form.reset(toFormValues(news))
  }, [open, news, form])
  
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
