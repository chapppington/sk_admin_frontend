"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import type { ICertificate } from "@/types/certificates.types"

export function getCertificatesColumns(
  onEdit: (certificate: ICertificate) => void,
  onDelete: (certificate: ICertificate) => void,
): ColumnDef<ICertificate>[] {
  return [
    {
      accessorKey: "title",
      header: "Название",
    },
    {
      accessorKey: "link",
      header: "Ссылка",
      cell: ({ row }) => {
        const link = row.original.link
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline truncate max-w-[200px] block"
          >
            {link}
          </a>
        )
      },
    },
    {
      accessorKey: "order",
      header: "Порядок",
      cell: ({ row }) => row.original.order + 1,
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить сертификат?"
        />
      ),
    },
  ]
}
