"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect, useMemo, useRef, useState } from "react"

import {
  DataTableDndContext,
  DragHandle,
  SortableTableRow,
  useDataTableDnd,
} from "@/components/DataTable/DataTableDnd"
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
  getRowId?: (row: TData) => string
  onReorder?: (reorderedData: TData[]) => void
  getOrderForIndex?: (index: number) => number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  serverPagination,
  getRowId,
  onReorder,
  getOrderForIndex,
}: DataTableProps<TData, TValue>) {
  const isReorderEnabled = Boolean(getRowId && onReorder)
  const [localData, setLocalData] = useState(data)
  const skipNextSyncRef = useRef(false)

  useEffect(() => {
    if (skipNextSyncRef.current) {
      skipNextSyncRef.current = false
      return
    }
    setLocalData(data)
  }, [data])

  const tableColumns = useMemo(() => {
    if (!isReorderEnabled || !getRowId) return columns
    const dragColumn: ColumnDef<TData, TValue> = {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={getRowId(row.original)} />,
      meta: { width: "w-10" },
    }
    return [dragColumn, ...columns]
  }, [columns, isReorderEnabled, getRowId])

  const table = useReactTable({
    data: localData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    ...(isReorderEnabled &&
      getRowId && { getRowId: (row: TData) => getRowId(row) }),
  })

  const pagination = useServerPagination(serverPagination)

  const { rowIds, sensors, handleDragEnd } = useDataTableDnd({
    localData,
    getRowId: getRowId ?? (() => ""),
    getOrderForIndex,
    onReorder,
    setLocalData,
    setSkipNextSync: () => {
      skipNextSyncRef.current = true
    },
  })

  const tableBody = (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) =>
          isReorderEnabled ? (
            <SortableTableRow key={row.id} row={row} />
          ) : (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ),
        )
      ) : (
        <TableRow>
          <TableCell colSpan={tableColumns.length} className="h-24 text-center">
            Нет данных.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )

  const tableContent = isReorderEnabled ? (
    <DataTableDndContext
      rowIds={rowIds}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
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
        {tableBody}
      </Table>
    </DataTableDndContext>
  ) : (
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
      {tableBody}
    </Table>
  )

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border">{tableContent}</div>
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
