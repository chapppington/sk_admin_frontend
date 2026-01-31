"use client"

import { useEffect } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useNews } from "@/hooks/useNews"
import type { INews, INewsCreate } from "@/shared/types/news.types"
import { getReadingTimeMinutes, slugify } from "@/shared/utils"

export type NewsFormValues = {
  category: string
  title: string
  content: string
  short_content: string
  image_url: string
  alt: string
  date: string
}

export const VALID_NEWS_CATEGORIES = [
  "Производство",
  "Разработки",
  "Полезное",
  "События",
  "Наши проекты",
] as const

const defaultValues: NewsFormValues = {
  category: "",
  title: "",
  content: "",
  short_content: "",
  image_url: "",
  alt: "",
  date: new Date().toISOString().slice(0, 10),
}

export type UseNewsFormParams = {
  open: boolean
  news: INews | null
  onOpenChange: (open: boolean) => void
}

export function useNewsForm({
  open,
  news,
  onOpenChange,
}: UseNewsFormParams) {
  const { createMutation, updateMutation } = useNews()
  const isEdit = Boolean(news?.oid)

  const form = useForm<NewsFormValues>({ defaultValues })

  // Reset form
  useEffect(() => {
    if (open) {
      if (news) {
        form.reset({
          category: news.category,
          title: news.title,
          content: news.content,
          short_content: news.short_content,
          image_url: news.image_url ?? "",
          alt: news.alt ?? "",
          date: news.date.slice(0, 10),
        })
      } else {
        form.reset(defaultValues)
      }
    }
  }, [open, news, form])

  const onSubmit: SubmitHandler<NewsFormValues> = async (data) => {
    const payload: INewsCreate = {
      ...data,
      slug: slugify(data.title),
      reading_time: getReadingTimeMinutes(data.content),
    }
    try {
      if (isEdit && news) {
        await updateMutation.mutateAsync({ oid: news.oid, data: payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      onOpenChange(false)
      form.reset(defaultValues)
    } catch {
      // Error toast handled in useNews mutations
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return {
    form,
    isEdit,
    isPending,
    onSubmit,
  }
}
