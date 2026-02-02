"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { toFormValues } from "@/app/dashboard/team/form/utils"
import { useMembers } from "@/hooks/members/useMembers"
import type { IMember, IMemberCreate } from "@/types/members.types"

export type UseMemberFormParams = {
  member: IMember | null
  onOpenChange: (open: boolean) => void
  defaultOrder?: number
}

export function useMemberForm({
  member,
  onOpenChange,
  defaultOrder = 0,
}: UseMemberFormParams) {
  const { createMutation, updateMutation } = useMembers()
  const isEdit = Boolean(member?.oid)
  const form = useForm<IMemberCreate>({
    defaultValues: toFormValues(member ?? null, defaultOrder),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<IMemberCreate> = (data) => {
    const payload = { ...data }
    if (isEdit && member) {
      updateMutation.mutate({ oid: member.oid, data: payload }, { onSuccess })
    } else {
      createMutation.mutate(payload, { onSuccess })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    control: form.control,
    setValue: form.setValue,
    isEdit,
    isLoading,
  }
}
