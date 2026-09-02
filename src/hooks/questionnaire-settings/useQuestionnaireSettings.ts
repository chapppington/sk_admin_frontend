import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import questionnaireSettingsService from "@/services/questionnaire-settings/questionnaire-settings.service"
import { getErrorMessage } from "@/shared/utils/error"
import type {
  IQuestionnaireSettingsCreate,
  IQuestionnaireSettingsUpdate,
} from "@/types/questionnaire-settings.types"

export function useQuestionnaireSettings() {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["questionnaire-settings"],
    queryFn: () => questionnaireSettingsService.fetchAll(),
  })

  const createMutation = useMutation({
    mutationKey: ["questionnaire-settings", "create"],
    mutationFn: (payload: IQuestionnaireSettingsCreate) =>
      questionnaireSettingsService.create(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["questionnaire-settings"] })
      toast.success("Опросный лист добавлен")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["questionnaire-settings", "update"],
    mutationFn: ({
      oid,
      data,
    }: {
      oid: string
      data: IQuestionnaireSettingsUpdate
    }) => questionnaireSettingsService.update(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["questionnaire-settings"] })
      toast.success("Опросный лист обновлён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["questionnaire-settings", "delete"],
    mutationFn: (oid: string) => questionnaireSettingsService.delete(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["questionnaire-settings"] })
      toast.success("Опросный лист удалён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    settings: data?.data ?? [],
    isLoading,
    error,
    refetch,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
