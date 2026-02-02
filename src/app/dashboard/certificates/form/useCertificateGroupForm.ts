import { type SubmitHandler, useForm } from "react-hook-form"
import { toCertificateGroupFormValues } from "@/app/dashboard/certificates/form/toFormValues"
import { useCertificateGroups } from "@/hooks/certificates/useCertificateGroups"
import type {
  ICertificateGroup,
  ICertificateGroupCreate,
} from "@/types/certificates.types"

export type UseCertificateGroupFormParams = {
  group: ICertificateGroup | null
  onOpenChange: (open: boolean) => void
}

export function useCertificateGroupForm({
  group,
  onOpenChange,
}: UseCertificateGroupFormParams) {
  const { createMutation, updateMutation } = useCertificateGroups()
  const isEdit = Boolean(group?.oid)
  const form = useForm<ICertificateGroupCreate>({
    defaultValues: toCertificateGroupFormValues(group),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<ICertificateGroupCreate> = (data) => {
    if (isEdit && group) {
      updateMutation.mutate({ oid: group.oid, data }, { onSuccess })
    } else {
      createMutation.mutate(data, { onSuccess })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    control: form.control,
    isEdit,
    isLoading,
  }
}
