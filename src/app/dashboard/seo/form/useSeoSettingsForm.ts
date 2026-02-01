"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { useSeoSettings } from "@/hooks/useSeoSettings"
import type {
  ISeoSettings,
  ISeoSettingsCreate,
} from "@/types/seo-settings.types"
import { toFormValues } from "@/app/dashboard/seo/form/utils"

export type UseSeoSettingsFormParams = {
  seoSettings: ISeoSettings | null
  onOpenChange: (open: boolean) => void
}

export function useSeoSettingsForm({ seoSettings, onOpenChange }: UseSeoSettingsFormParams) {
  const { createMutation, updateMutation } = useSeoSettings()
  const isEdit = Boolean(seoSettings?.oid)
  const form = useForm<ISeoSettingsCreate>({
    defaultValues: toFormValues(seoSettings),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<ISeoSettingsCreate> = (data) => {
    if (isEdit && seoSettings) {
      updateMutation.mutate({ oid: seoSettings.oid, data }, { onSuccess })
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
