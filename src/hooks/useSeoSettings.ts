import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import seoSettingsService from "@/services/seo-settings/seo-settings.service"
import type {
  ISeoSettingsCreate,
  ISeoSettingsListParams,
  ISeoSettingsUpdate,
} from "@/types/seo-settings.types"
import { getErrorMessage } from "@/shared/utils/error"

export function useSeoSettings(params?: ISeoSettingsListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["seo-settings", params],
    queryFn: () => seoSettingsService.fetchSeoSettings(params),
    enabled: params !== undefined,
  })

  const createMutation = useMutation({
    mutationKey: ["seo-settings", "create"],
    mutationFn: (payload: ISeoSettingsCreate) =>
      seoSettingsService.createSeoSettings(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] })
      toast.success("Набор мета тегов создан")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["seo-settings", "update"],
    mutationFn: ({ oid, data }: { oid: string; data: ISeoSettingsUpdate }) =>
      seoSettingsService.updateSeoSettings(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] })
      toast.success("Набор мета тегов обновлён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["seo-settings", "delete"],
    mutationFn: (oid: string) => seoSettingsService.deleteSeoSettings(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] })
      toast.success("Набор мета тегов удалён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    seoSettings: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
