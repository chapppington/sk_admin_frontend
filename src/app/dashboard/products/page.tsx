"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { DataTable } from "@/components/DataTable"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useProducts } from "@/hooks/products/useProducts"
import { Button } from "@/shared/ui/button"
import type { IProduct } from "@/types/products.types"
import { getProductsColumns } from "./columns"
import { ProductDialog } from "./dialog/ProductDialog"

export default function ProductsPage() {
  const queryClient = useQueryClient()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)

  const {
    products,
    pagination,
    isLoading,
    deleteMutation,
    patchOrderMutation,
  } = useProducts({
    limit,
    offset,
    sort_field: "order",
    sort_order: 1,
  })

  const handleReorder = async (reordered: IProduct[]) => {
    try {
      await Promise.all(
        reordered.map((product, index) =>
          patchOrderMutation.mutateAsync({
            oid: product.oid,
            order: offset + index,
          }),
        ),
      )
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Порядок обновлён")
    } catch {
      toast.error("Ошибка при обновлении порядка")
    }
  }

  const handleCreate = () => {
    setSelectedProduct(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: IProduct) => {
    setSelectedProduct(item)
    setDialogOpen(true)
  }

  const handleDelete = (item: IProduct) => deleteMutation.mutate(item.oid)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
        <MiniLoader />
      </div>
    )
  }

  const handlePageChange = (newOffset: number, newLimit: number) => {
    setOffset(newOffset)
    setLimit(newLimit)
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
      <div className="flex justify-start">
        <Button onClick={handleCreate}>Добавить продукт</Button>
      </div>
      <DataTable
        columns={getProductsColumns(handleEdit, handleDelete)}
        data={products}
        getRowId={(row) => row.oid}
        onReorder={handleReorder}
        getOrderForIndex={(i) => offset + i}
        serverPagination={
          pagination
            ? {
                total: pagination.total,
                offset,
                limit,
                onPageChange: handlePageChange,
              }
            : undefined
        }
      />
      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={selectedProduct}
      />
    </div>
  )
}
