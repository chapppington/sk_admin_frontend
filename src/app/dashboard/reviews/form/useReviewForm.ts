"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { toFormValues } from "@/app/dashboard/reviews/form/utils"
import { useReviews } from "@/hooks/reviews/useReviews"
import type { IReview, IReviewCreate, IReviewUpdate } from "@/types/reviews.types"

export type UseReviewFormParams = {
  review: IReview | null
  onOpenChange: (open: boolean) => void
}

export function useReviewForm({ review, onOpenChange }: UseReviewFormParams) {
  const { createMutation, updateMutation } = useReviews()
  const isEdit = Boolean(review?.oid)
  const form = useForm<IReviewCreate>({
    defaultValues: toFormValues(review),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<IReviewCreate> = (data) => {
    if (isEdit && review) {
      updateMutation.mutate(
        { oid: review.oid, data: data as IReviewUpdate },
        { onSuccess },
      )
    } else {
      createMutation.mutate(data, { onSuccess })
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
