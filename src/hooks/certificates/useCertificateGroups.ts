import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import certificateGroupsService from "@/services/certificates/certificate-groups.service"
import { getErrorMessage } from "@/shared/utils/error"
import type {
  ICertificateGroupCreate,
  ICertificateGroupsListParams,
  ICertificateGroupUpdate,
} from "@/types/certificates.types"

export function useCertificateGroups(params?: ICertificateGroupsListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["certificate-groups", params],
    queryFn: () => certificateGroupsService.fetchCertificateGroups(params),
    enabled: params !== undefined,
  })

  const createMutation = useMutation({
    mutationKey: ["certificate-groups", "create"],
    mutationFn: (payload: ICertificateGroupCreate) =>
      certificateGroupsService.createCertificateGroup(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["certificate-groups"] })
      toast.success("Группа создана")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["certificate-groups", "update"],
    mutationFn: ({
      oid,
      data,
    }: {
      oid: string
      data: ICertificateGroupUpdate
    }) => certificateGroupsService.updateCertificateGroup(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["certificate-groups"] })
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      toast.success("Группа обновлена")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const patchOrderMutation = useMutation({
    mutationKey: ["certificate-groups", "patchOrder"],
    mutationFn: ({ oid, order }: { oid: string; order: number }) =>
      certificateGroupsService.patchCertificateGroupOrder(oid, order),
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении порядка"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["certificate-groups", "delete"],
    mutationFn: (oid: string) =>
      certificateGroupsService.deleteCertificateGroup(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["certificate-groups"] })
      queryClient.invalidateQueries({ queryKey: ["certificates"] })
      toast.success("Группа удалена")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    certificateGroups: data?.data.items ?? [],
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
