"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/tables/ActionsCell"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"
import type { INews } from "@/shared/types/news.types"
import { formatCreationDate } from "@/shared/utils"

const PREVIEW_WIDTH = 96
const PREVIEW_HEIGHT = Math.round((PREVIEW_WIDTH * 9) / 16)

export function getNewsColumns(
  onEdit: (news: INews) => void,
  onDelete: (news: INews) => void,
): ColumnDef<INews>[] {
  return [
    {
      accessorKey: "image_url",
      header: "Изображение",
      cell: ({ row }) => {
        const url = row.original.image_url
        const alt = row.original.alt ?? ""
        return (
          <ImageWithFallback
            src={url}
            alt={alt}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            containerClassName="relative aspect-video w-24 shrink-0 overflow-hidden rounded border"
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
      accessorKey: "title",
      header: "Заголовок",
    },
    {
      accessorKey: "short_content",
      header: "Краткое содержание",
      cell: ({ row }) => {
        const text = row.getValue("short_content") as string
        return (
          <span className="max-w-[200px] truncate block" title={text}>
            {text}
          </span>
        )
      },
    },
    {
      accessorKey: "reading_time",
      header: "Время чтения",
      cell: ({ row }) => `${row.getValue("reading_time")} мин`,
    },
    {
      accessorKey: "created_at",
      header: "Дата создания",
      cell: ({ row }) => formatCreationDate(row.original.created_at),
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell item={row.original} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ]
}
