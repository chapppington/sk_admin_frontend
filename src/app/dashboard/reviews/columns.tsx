"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"
import { formatDate } from "@/shared/utils/date"
import type { IReview } from "@/types/reviews.types"

const PREVIEW_WIDTH = 64
const PREVIEW_HEIGHT = 64

export function getReviewsColumns(
  onEdit: (review: IReview) => void,
  onDelete: (review: IReview) => void,
): ColumnDef<IReview>[] {
  return [
    {
      accessorKey: "image",
      header: "Фото",
      cell: ({ row }) => {
        const image = row.original.image
        if (!image) return "—"
        return (
          <ImageWithFallback
            src={image}
            alt={row.original.name}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            containerClassName="relative size-16 shrink-0 overflow-hidden rounded border"
            className="size-full object-cover"
          />
        )
      },
    },
    {
      accessorKey: "category",
      header: "Категория",
    },
    {
      accessorKey: "name",
      header: "Имя",
    },
    {
      accessorKey: "position",
      header: "Должность",
      cell: ({ row }) => row.original.position ?? "—",
    },
    {
      accessorKey: "short_text",
      header: "Краткий текст",
      cell: ({ row }) => {
        const text = row.original.short_text
        if (!text) return "—"
        return (
          <span className="max-w-[200px] truncate block" title={text}>
            {text}
          </span>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: "Дата",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить отзыв?"
        />
      ),
    },
  ]
}
