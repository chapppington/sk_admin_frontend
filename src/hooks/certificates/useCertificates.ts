import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import certificatesService from "@/services/certificates/certificates.service"
import { getErrorMessage } from "@/shared/utils/error"
import type {
  ICertificateCreate,
  ICertificatesListParams,
  ICertificateUpdate,
} from "@/types/certificates.types"

export function useCertificates(params?: ICertificatesListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["certificates", params],
    queryFn: () => certificatesService.fetchCertificates(params),
    enabled: params !== undefined,
  })

  const createMutation = useMutation({
    mutationKey: ["certificates", "create"],
    mutationFn: ({
      certificateGroupId,
      payload,
    }: {
      certificateGroupId: string
      payload: ICertificateCreate
    }) => certificatesService.createCertificate(certificateGroupId, payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      toast.success("Сертификат создан")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["certificates", "update"],
    mutationFn: ({ oid, data }: { oid: string; data: ICertificateUpdate }) =>
      certificatesService.updateCertificate(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      toast.success("Сертификат обновлён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const patchOrderMutation = useMutation({
    mutationKey: ["certificates", "patchOrder"],
    mutationFn: ({ oid, order }: { oid: string; order: number }) =>
      certificatesService.patchCertificateOrder(oid, order),
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении порядка"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["certificates", "delete"],
    mutationFn: (oid: string) => certificatesService.deleteCertificate(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      toast.success("Сертификат удалён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    certificates: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
    createMutation,
    updateMutation,
    patchOrderMutation,
    deleteMutation,
  }
}
