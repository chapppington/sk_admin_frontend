import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import vacanciesService from "@/services/vacancies/vacancies.service"
import { getErrorMessage } from "@/shared/utils/error"
import type {
  IVacancyCreatePayload,
  IVacancyListParams,
  IVacancyUpdate,
} from "@/types/vacancies.types"

export function useVacancies(params?: IVacancyListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["vacancies", params],
    queryFn: () => vacanciesService.fetchVacancies(params),
    enabled: params !== undefined,
  })

  const createMutation = useMutation({
    mutationKey: ["vacancies", "create"],
    mutationFn: (payload: IVacancyCreatePayload) =>
      vacanciesService.createVacancy(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] })
      toast.success("Вакансия создана")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["vacancies", "update"],
    mutationFn: ({ oid, data }: { oid: string; data: IVacancyUpdate }) =>
      vacanciesService.updateVacancy(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] })
      toast.success("Вакансия обновлена")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["vacancies", "delete"],
    mutationFn: (oid: string) => vacanciesService.deleteVacancy(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] })
      toast.success("Вакансия удалена")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    vacancies: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
