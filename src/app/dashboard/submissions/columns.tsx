"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import { formatDateTime } from "@/shared/utils/date"
import type { ISubmission } from "@/types/submissions.types"

export function getSubmissionsColumns(
  onView: (submission: ISubmission) => void,
  onDelete: (submission: ISubmission) => void,
): ColumnDef<ISubmission>[] {
  return [
    {
      accessorKey: "form_type",
      header: "Тип формы",
    },
    {
      accessorKey: "name",
      header: "Имя",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email ?? "—",
    },
    {
      accessorKey: "phone",
      header: "Телефон",
      cell: ({ row }) => row.original.phone ?? "—",
    },
    {
      accessorKey: "comments",
      header: "Комментарий",
      cell: ({ row }) => {
        const text = row.original.comments
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
      header: "Дата и время",
      cell: ({ row }) => formatDateTime(row.original.created_at),
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onView={onView}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить заявку?"
        />
      ),
    },
  ]
}
