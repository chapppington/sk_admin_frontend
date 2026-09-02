"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { useQuestionnaireSettings } from "@/hooks/questionnaire-settings/useQuestionnaireSettings"
import type {
  IQuestionnaireSettings,
  IQuestionnaireSettingsPayload,
} from "@/types/questionnaire-settings.types"

function toFormValues(
  settings: IQuestionnaireSettings | null,
): IQuestionnaireSettingsPayload {
  return {
    slug: settings?.slug ?? "",
    page_name: settings?.page_name ?? "",
    h1: settings?.h1 ?? "Опросный лист",
    subtitle: settings?.subtitle ?? "",
    breadcrumb_label: settings?.breadcrumb_label ?? "",
  }
}

type UseQuestionnaireSettingsFormArgs = {
  settings: IQuestionnaireSettings | null
  onOpenChange: (open: boolean) => void
}

export function useQuestionnaireSettingsForm({
  settings,
  onOpenChange,
}: UseQuestionnaireSettingsFormArgs) {
  const { createMutation, updateMutation } = useQuestionnaireSettings()
  const isEdit = Boolean(settings?.oid)

  const form = useForm<IQuestionnaireSettingsPayload>({
    defaultValues: toFormValues(settings),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<IQuestionnaireSettingsPayload> = (data) => {
    const payload: IQuestionnaireSettingsPayload = {
      ...data,
      slug: data.slug.trim().toLowerCase(),
    }

    if (isEdit && settings) {
      updateMutation.mutate(
        { oid: settings.oid, data: { ...payload, slug: settings.slug } },
        { onSuccess },
      )
    } else {
      createMutation.mutate(payload, { onSuccess })
    }
  }

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    control: form.control,
    isEdit,
    isLoading: createMutation.isPending || updateMutation.isPending,
  }
}
