import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import membersService from "@/services/members/members.service"
import { getErrorMessage } from "@/shared/utils/error"
import type {
  IMemberCreate,
  IMembersListParams,
  IMemberUpdate,
} from "@/types/members.types"

export function useMembers(params?: IMembersListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["members", params],
    queryFn: () => membersService.fetchMembers(params),
    enabled: params !== undefined,
  })

  const createMutation = useMutation({
    mutationKey: ["members", "create"],
    mutationFn: (payload: IMemberCreate) =>
      membersService.createMember(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      toast.success("Участник добавлен")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["members", "update"],
    mutationFn: ({ oid, data }: { oid: string; data: IMemberUpdate }) =>
      membersService.updateMember(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      toast.success("Участник обновлён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const patchOrderMutation = useMutation({
    mutationKey: ["members", "patchOrder"],
    mutationFn: ({ oid, order }: { oid: string; order: number }) =>
      membersService.patchMemberOrder(oid, order),
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении порядка"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["members", "delete"],
    mutationFn: (oid: string) => membersService.deleteMember(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["members"] })
      toast.success("Участник удалён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    members: data?.data.items ?? [],
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

export function useMember(oid: string | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["members", oid],
    queryFn: () => membersService.fetchMemberById(oid ?? ""),
    enabled: Boolean(oid),
  })

  return {
    member: data?.data ?? null,
    isLoading,
    error,
    refetch,
  }
}
