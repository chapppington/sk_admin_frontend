import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import portfoliosService from "@/services/portfolios/portfolios.service"
import { getErrorMessage } from "@/shared/utils/error"
import type {
  IPortfolioCreate,
  IPortfolioListParams,
  IPortfolioUpdate,
} from "@/types/portfolios.types"

export function usePortfolios(params?: IPortfolioListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["portfolios", params],
    queryFn: () => portfoliosService.fetchPortfolios(params),
    enabled: params !== undefined,
  })

  const createMutation = useMutation({
    mutationKey: ["portfolios", "create"],
    mutationFn: (payload: IPortfolioCreate) =>
      portfoliosService.createPortfolio(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] })
      toast.success("Проект создан")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["portfolios", "update"],
    mutationFn: ({ oid, data }: { oid: string; data: IPortfolioUpdate }) =>
      portfoliosService.updatePortfolio(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] })
      toast.success("Проект обновлён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["portfolios", "delete"],
    mutationFn: (oid: string) => portfoliosService.deletePortfolio(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] })
      toast.success("Проект удалён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    portfolios: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
