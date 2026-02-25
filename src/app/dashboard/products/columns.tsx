"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"
import { Badge } from "@/shared/ui/badge"
import type { IProduct } from "@/types/products.types"

const PREVIEW_SIZE = 64

export function getProductsColumns(
  onEdit: (product: IProduct) => void,
  onDelete: (product: IProduct) => void,
): ColumnDef<IProduct>[] {
  return [
    {
      accessorKey: "order",
      header: "Порядок",
      cell: ({ row }) => row.original.order + 1,
    },
    {
      accessorKey: "preview_image_url",
      header: "Превью",
      cell: ({ row }) => (
        <ImageWithFallback
          src={row.original.preview_image_url}
          alt={row.original.preview_image_alt ?? ""}
          width={PREVIEW_SIZE}
          height={PREVIEW_SIZE}
          containerClassName="relative size-16 shrink-0 overflow-hidden rounded border"
          className="size-full object-cover"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Название",
    },
    {
      accessorKey: "category",
      header: "Категория",
    },
    {
      accessorKey: "is_shown",
      header: "Показан",
      cell: ({ row }) => (
        <Badge variant={row.original.is_shown ? "success" : "destructive"}>
          {row.original.is_shown ? "Да" : "Нет"}
        </Badge>
      ),
    },

    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить продукт?"
        />
      ),
    },
  ]
}
