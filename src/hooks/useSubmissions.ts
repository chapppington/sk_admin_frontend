import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import submissionsService from "@/services/submissions/submissions.service"
import type { ISubmissionsListParams } from "@/types/submissions.types"
import { getErrorMessage } from "@/shared/utils/error"

export function useSubmissions(params?: ISubmissionsListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["submissions", params],
    queryFn: () => submissionsService.fetchSubmissions(params),
    enabled: params !== undefined,
  })

  const deleteMutation = useMutation({
    mutationKey: ["submissions", "delete"],
    mutationFn: (oid: string) => submissionsService.deleteSubmission(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["submissions"] })
      toast.success("Заявка удалена")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    submissions: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
    deleteMutation,
  }
}
