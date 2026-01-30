"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { IconPencil, IconPhoto, IconTrash } from "@tabler/icons-react"

import { ImageWithFallback } from "@/components/ui/ImageWithFallback"
import { formatCreationDate } from "@/shared/utils"
import { Button } from "@/shared/ui/button"
import type { INews } from "@/shared/types/news.types"

const PREVIEW_WIDTH = 96
const PREVIEW_HEIGHT = Math.round((PREVIEW_WIDTH * 9) / 16)

export const newsColumns: ColumnDef<INews>[] = [
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
    cell: ({ row }) => {
      const news = row.original
      return (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-8"
            onClick={() => {}}
            title="Редактировать"
          >
            <IconPencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-8 text-destructive hover:text-destructive"
            onClick={() => {}}
            title="Удалить"
          >
            <IconTrash className="size-4" />
          </Button>
        </div>
      )
    },
  },
]
