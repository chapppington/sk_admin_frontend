import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import productsService from "@/services/products/products.service"
import { getErrorMessage } from "@/shared/utils/error"
import type {
  IProductCreate,
  IProductsListParams,
  IProductUpdate,
} from "@/types/products.types"

export function useProducts(params?: IProductsListParams) {
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", params],
    queryFn: () => productsService.fetchProducts(params),
    enabled: params !== undefined,
  })

  const createMutation = useMutation({
    mutationKey: ["products", "create"],
    mutationFn: (payload: IProductCreate) =>
      productsService.createProduct(payload),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Продукт создан")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при создании"))
    },
  })

  const updateMutation = useMutation({
    mutationKey: ["products", "update"],
    mutationFn: ({ oid, data }: { oid: string; data: IProductUpdate }) =>
      productsService.updateProduct(oid, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Продукт обновлён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении"))
    },
  })

  const patchOrderMutation = useMutation({
    mutationKey: ["products", "patchOrder"],
    mutationFn: ({ oid, order }: { oid: string; order: number }) =>
      productsService.patchProductOrder(oid, order),
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при обновлении порядка"))
    },
  })

  const deleteMutation = useMutation({
    mutationKey: ["products", "delete"],
    mutationFn: (oid: string) => productsService.deleteProduct(oid),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Продукт удалён")
    },
    onError(err) {
      toast.error(getErrorMessage(err, "Ошибка при удалении"))
    },
  })

  return {
    products: data?.data.items ?? [],
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

export function useProduct(oid: string | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", oid],
    queryFn: () => productsService.fetchProductById(oid!),
    enabled: Boolean(oid),
  })

  return {
    product: data?.data ?? null,
    isLoading,
    error,
    refetch,
  }
}
