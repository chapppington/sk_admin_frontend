"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import { ImageWithFallback } from "@/components/ui/ImageWithFallback"
import type { IPortfolio } from "@/types/portfolios.types"

const PREVIEW_WIDTH = 96
const PREVIEW_HEIGHT = Math.round((PREVIEW_WIDTH * 9) / 16)

export function getPortfoliosColumns(
  onEdit: (portfolio: IPortfolio) => void,
  onDelete: (portfolio: IPortfolio) => void,
): ColumnDef<IPortfolio>[] {
  return [
    {
      accessorKey: "poster",
      header: "Постер",
      cell: ({ row }) => (
        <ImageWithFallback
          src={row.original.poster}
          alt={row.original.name}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
          containerClassName="relative aspect-video w-24 shrink-0 overflow-hidden rounded border"
          className="size-full object-cover"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Название",
    },
    {
      accessorKey: "year",
      header: "Год",
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить проект?"
        />
      ),
    },
  ]
}
