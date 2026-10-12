import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import catalogTextsService from "@/services/catalog-texts/catalog-texts.service"
import { getErrorMessage } from "@/shared/utils/error"
import type { CatalogTextUpsert } from "@/types/catalog-text.types"

export function useCatalogTexts() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["catalog-texts"],
    queryFn: () => catalogTextsService.fetchAll(),
  })

  const upsertMutation = useMutation({
    mutationKey: ["catalog-texts", "upsert"],
    mutationFn: ({ category, content }: CatalogTextUpsert) =>
      catalogTextsService.upsert(category, content),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["catalog-texts"] })
      toast.success("SEO-текст сохранён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Не удалось сохранить SEO-текст"))
    },
  })

  return {
    texts: data?.data ?? [],
    isLoading,
    error,
    upsertMutation,
  }
}
