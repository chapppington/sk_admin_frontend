import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import reviewsService from "@/services/reviews/reviews.service"
import { getErrorMessage } from "@/shared/utils/error"
import type {
  IReviewCreate,
  IReviewsListParams,
  IReviewUpdate,
} from "@/types/reviews.types"

export function useReviews(params?: IReviewsListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reviews", params],
    queryFn: () => reviewsService.fetchReviews(params),
    enabled: params !== undefined,
  })

  const createMutation = useMutation({
    mutationKey: ["reviews", "create"],
    mutationFn: (payload: IReviewCreate) =>
      reviewsService.createReview(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      toast.success("Отзыв создан")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["reviews", "update"],
    mutationFn: ({ oid, data }: { oid: string; data: IReviewUpdate }) =>
      reviewsService.updateReview(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      toast.success("Отзыв обновлён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["reviews", "delete"],
    mutationFn: (oid: string) => reviewsService.deleteReview(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      toast.success("Отзыв удалён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    reviews: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}

export function useReview(oid: string | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reviews", oid],
    queryFn: () => reviewsService.fetchReviewById(oid ?? ""),
    enabled: Boolean(oid),
  })

  return {
    review: data?.data ?? null,
    isLoading,
    error,
    refetch,
  }
}
