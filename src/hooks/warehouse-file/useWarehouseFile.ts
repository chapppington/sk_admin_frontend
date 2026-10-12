import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import warehouseFileService from "@/services/warehouse-file/warehouse-file.service"
import { getErrorMessage } from "@/shared/utils/error"
import type { IWarehouseFilePayload } from "@/types/warehouse-file.types"

export function useWarehouseFile() {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["warehouse-file"],
    queryFn: () => warehouseFileService.fetch(),
  })

  const upsertMutation = useMutation({
    mutationKey: ["warehouse-file", "upsert"],
    mutationFn: (payload: IWarehouseFilePayload) =>
      warehouseFileService.upsert(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["warehouse-file"] })
      toast.success("Файл склада сохранён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при сохранении"))
    },
  })

  return {
    warehouseFile: data?.data ?? null,
    isLoading,
    error,
    refetch,
    upsertMutation,
  }
}
