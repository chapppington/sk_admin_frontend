"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"
import type { IMember } from "@/types/members.types"

const PREVIEW_SIZE = 48

export function getMembersColumns(
  onEdit: (member: IMember) => void,
  onDelete: (member: IMember) => void,
): ColumnDef<IMember>[] {
  return [
    {
      accessorKey: "order",
      header: "Порядок",
      cell: ({ row }) => row.original.order + 1,
    },
    {
      accessorKey: "image",
      header: "Фото",
      cell: ({ row }) => (
        <ImageWithFallback
          src={row.original.image}
          alt={row.original.name}
          width={PREVIEW_SIZE}
          height={PREVIEW_SIZE}
          containerClassName="relative size-12 shrink-0 overflow-hidden rounded-md"
          className="size-full object-cover"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Имя",
    },
    {
      accessorKey: "position",
      header: "Должность",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email ?? "—",
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить участника?"
        />
      ),
    },
  ]
}
