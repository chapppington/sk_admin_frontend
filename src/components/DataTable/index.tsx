"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  type ServerPaginationConfig,
  useServerPagination,
} from "@/components/DataTable/useServerPagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

import { TablePagination } from "./TablePagination"

export type DataTableServerPagination = ServerPaginationConfig

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  serverPagination?: DataTableServerPagination
}

export function DataTable<TData, TValue>({
  columns,
  data,
  serverPagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const pagination = useServerPagination(serverPagination)

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет данных.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination.isEnabled && pagination.limit != null && (
        <TablePagination
          pageSizeOptions={pagination.pageSizeOptions}
          pageCount={pagination.pageCount}
          pageIndex={pagination.pageIndex}
          limit={pagination.limit}
          canPrev={pagination.canPrev}
          canNext={pagination.canNext}
          onFirstPage={pagination.goToFirstPage}
          onPrevPage={pagination.goToPrevPage}
          onNextPage={pagination.goToNextPage}
          onLastPage={pagination.goToLastPage}
          onPageSizeChange={pagination.changePageSize}
        />
      )}
    </div>
  )
}
