"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { ActionsCell } from "@/components/DataTable/ActionsCell"
import type { IVacancy } from "@/types/vacancies.types"
import { formatDate } from "@/shared/utils/date"

export function getVacanciesColumns(
  onEdit: (vacancy: IVacancy) => void,
  onDelete: (vacancy: IVacancy) => void,
): ColumnDef<IVacancy>[] {
  return [
    {
      accessorKey: "title",
      header: "Название",
    },
    {
      accessorKey: "category",
      header: "Категория",
    },
    {
      accessorKey: "salary",
      header: "Зарплата",
      cell: ({ row }) => {
        const val = row.original.salary
        if (val == null) return ""
        return `${new Intl.NumberFormat("ru-RU").format(val)} ₽`
      },
    },
    {
      accessorKey: "created_at",
      header: "Создано",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: "actions",
      header: "Действия",
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
          deleteConfirmMessage="Удалить вакансию?"
        />
      ),
    },
  ]
}
