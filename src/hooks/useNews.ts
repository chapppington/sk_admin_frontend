import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import newsService from "@/services/news/news.service"
import type {
  INewsCreatePayload,
  INewsListParams,
  INewsUpdate,
} from "@/types/news.types"
import { getErrorMessage } from "@/shared/utils/error"

export function useNews(params?: INewsListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["news", params],
    queryFn: () => newsService.fetchNews(params),
    enabled: params !== undefined,
  })

  const createMutation = useMutation({
    mutationKey: ["news", "create"],
    mutationFn: (payload: INewsCreatePayload) =>
      newsService.createNews(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["news"] })
      toast.success("Новость создана")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["news", "update"],
    mutationFn: ({ oid, data }: { oid: string; data: INewsUpdate }) =>
      newsService.updateNews(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["news"] })
      toast.success("Новость обновлена")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["news", "delete"],
    mutationFn: (oid: string) => newsService.deleteNews(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["news"] })
      toast.success("Новость удалена")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    news: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
