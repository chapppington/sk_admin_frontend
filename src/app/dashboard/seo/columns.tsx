"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import type { ISeoSettings } from "@/types/seo-settings.types"

export function getSeoSettingsColumns(
  onEdit: (seoSettings: ISeoSettings) => void,
  onDelete: (seoSettings: ISeoSettings) => void,
): ColumnDef<ISeoSettings>[] {
  return [
    {
      accessorKey: "page_path",
      header: "Путь",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.page_path}</span>
      ),
    },
    {
      accessorKey: "page_name",
      header: "Название страницы",
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const text = row.getValue("title") as string
        return (
          <span className="max-w-[200px] truncate block" title={text}>
            {text}
          </span>
        )
      },
    },
    {
      accessorKey: "is_active",
      header: "Активно",
      cell: ({ row }) => (row.original.is_active ? "Да" : "Нет"),
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить набор мета тегов?"
        />
      ),
    },
  ]
}
