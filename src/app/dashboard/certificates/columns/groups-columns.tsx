"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import { Badge } from "@/shared/ui/badge"
import type { ICertificateGroup } from "@/types/certificates.types"

export function getCertificateGroupsColumns(
  onEdit: (group: ICertificateGroup) => void,
  onDelete: (group: ICertificateGroup) => void,
  onViewCertificates: (group: ICertificateGroup) => void,
): ColumnDef<ICertificateGroup>[] {
  return [
    {
      accessorKey: "title",
      header: "Название",
    },
    {
      accessorKey: "order",
      header: "Порядок",
      cell: ({ row }) => row.original.order + 1,
    },
    {
      accessorKey: "is_active",
      header: "Активна",
      cell: ({ row }) =>
        row.original.is_active ? (
          <Badge variant="default">Да</Badge>
        ) : (
          <Badge variant="secondary">Нет</Badge>
        ),
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onView={onViewCertificates}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить группу и все сертификаты в ней?"
        />
      ),
    },
  ]
}
