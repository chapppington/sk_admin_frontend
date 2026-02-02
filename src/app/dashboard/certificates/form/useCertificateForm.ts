import { type SubmitHandler, useForm } from "react-hook-form"
import { toCertificateFormValues } from "@/app/dashboard/certificates/form/toFormValues"
import { useCertificates } from "@/hooks/certificates/useCertificates"
import type {
  ICertificate,
  ICertificateCreate,
} from "@/types/certificates.types"

export type UseCertificateFormParams = {
  certificateGroupId: string
  certificate: ICertificate | null
  onOpenChange: (open: boolean) => void
}

export function useCertificateForm({
  certificateGroupId,
  certificate,
  onOpenChange,
}: UseCertificateFormParams) {
  const { createMutation, updateMutation } = useCertificates()
  const isEdit = Boolean(certificate?.oid)
  const form = useForm<ICertificateCreate>({
    defaultValues: toCertificateFormValues(certificate),
  })

  const onSuccess = () => {
    onOpenChange(false)
    form.reset()
  }

  const onSubmit: SubmitHandler<ICertificateCreate> = (data) => {
    if (isEdit && certificate) {
      updateMutation.mutate({ oid: certificate.oid, data }, { onSuccess })
    } else {
      createMutation.mutate(
        { certificateGroupId, payload: data },
        { onSuccess },
      )
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
