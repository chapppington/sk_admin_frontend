"use client"

import { ProductForm } from "@/app/dashboard/products/form/ProductForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import type { IProduct } from "@/types/products.types"

type ProductDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: IProduct | null
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
}: ProductDialogProps) {
  const isEdit = Boolean(product?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать продукт" : "Создать продукт"}
          </DialogTitle>
        </DialogHeader>
        {open && <ProductForm product={product} onOpenChange={onOpenChange} />}
      </DialogContent>
    </Dialog>
  )
}
