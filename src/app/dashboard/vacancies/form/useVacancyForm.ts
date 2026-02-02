"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { useVacancies } from "@/hooks/useVacancies"
import type { IVacancy, IVacancyCreatePayload } from "@/types/vacancies.types"

export type VacancyFormValues = {
  title: string
  category: string
  salary: number
  requirements: Array<{ value: string }>
  experience: Array<{ value: string }>
}

export function toFormValues(vacancy: IVacancy | null): VacancyFormValues {
  if (!vacancy) {
    return {
      title: "",
      category: "",
      salary: 0,
      requirements: [],
      experience: [],
    }
  }
  return {
    title: vacancy.title,
    category: vacancy.category,
    salary: vacancy.salary,
    requirements: (vacancy.requirements ?? []).map((v) => ({ value: v })),
    experience: (vacancy.experience ?? []).map((v) => ({ value: v })),
  }
}

export type UseVacancyFormParams = {
  vacancy: IVacancy | null
  onOpenChange: (open: boolean) => void
}

export function useVacancyForm({
  vacancy,
  onOpenChange,
}: UseVacancyFormParams) {
  const { createMutation, updateMutation } = useVacancies()
  const isEdit = Boolean(vacancy?.oid)
  const form = useForm<VacancyFormValues>({
    defaultValues: toFormValues(vacancy),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<VacancyFormValues> = (data) => {
    const requirements = (data.requirements ?? [])
      .map((r) => r.value.trim())
      .filter(Boolean)
    const experience = (data.experience ?? [])
      .map((e) => e.value.trim())
      .filter(Boolean)
    const payload: IVacancyCreatePayload = {
      title: data.title,
      requirements,
      experience,
      salary: Number(data.salary) || 0,
      category: data.category,
    }
    if (isEdit && vacancy) {
      updateMutation.mutate({ oid: vacancy.oid, data: payload }, { onSuccess })
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
