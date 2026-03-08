"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"
import { formatDate } from "@/shared/utils/date"
import type { INews } from "@/types/news.types"

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
      accessorKey: "title",
      header: "Заголовок",
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5 w-[550px] whitespace-normal">
          <span>{row.original.title}</span>
          <span className="text-muted-foreground text-xs">
            {row.original.category}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "reading_time",
      header: "Время чтения",
      cell: ({ row }) => `${row.getValue("reading_time")} мин`,
    },
    {
      accessorKey: "date",
      header: "Дата создания",
      cell: ({ row }) => formatDate(row.original.date),
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить новость?"
        />
      ),
    },
  ]
}
