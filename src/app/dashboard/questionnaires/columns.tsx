"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "@/components/DataTable/ActionsCell"
import type { IQuestionnaireSettings } from "@/types/questionnaire-settings.types"

export function getQuestionnaireSettingsColumns(
  onEdit: (item: IQuestionnaireSettings) => void,
  onDelete: (item: IQuestionnaireSettings) => void,
): ColumnDef<IQuestionnaireSettings>[] {
  return [
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.original.slug}</span>
      ),
    },
    {
      accessorKey: "page_name",
      header: "Название",
    },
    {
      accessorKey: "h1",
      header: "H1",
      cell: ({ row }) => {
        const text = row.getValue("h1") as string
        return (
          <span className="max-w-[200px] truncate block" title={text}>
            {text}
          </span>
        )
      },
    },
    {
      id: "path",
      header: "URL",
      cell: ({ row }) => (
        <span className="font-mono text-sm text-muted-foreground">
          /questionnaire/{row.original.slug}
        </span>
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
          deleteConfirmMessage="Удалить настройки опросного листа?"
        />
      ),
    },
  ]
}
