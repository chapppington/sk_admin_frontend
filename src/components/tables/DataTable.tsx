"use client"

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/shared/ui/button"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

export interface DataTableServerPagination {
  total: number
  offset: number
  limit: number
  onPageChange: (offset: number, limit: number) => void
  pageSizeOptions?: number[]
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  serverPagination?: DataTableServerPagination
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50]

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

  const pageSizeOptions =
    serverPagination?.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS
  const pageCount =
    serverPagination && serverPagination.limit > 0
      ? Math.ceil(serverPagination.total / serverPagination.limit) || 1
      : 1
  const pageIndex =
    serverPagination && serverPagination.limit > 0
      ? Math.floor(serverPagination.offset / serverPagination.limit)
      : 0
  const canPrev = pageIndex > 0
  const canNext = serverPagination
    ? serverPagination.offset + serverPagination.limit < serverPagination.total
    : false

  const handleFirstPage = () => {
    serverPagination?.onPageChange(0, serverPagination.limit)
  }
  const handlePrevPage = () => {
    const newOffset = Math.max(
      0,
      serverPagination!.offset - serverPagination!.limit,
    )
    serverPagination?.onPageChange(newOffset, serverPagination.limit)
  }
  const handleNextPage = () => {
    serverPagination?.onPageChange(
      serverPagination!.offset + serverPagination!.limit,
      serverPagination!.limit,
    )
  }
  const handleLastPage = () => {
    const lastOffset = (pageCount - 1) * serverPagination!.limit
    serverPagination?.onPageChange(lastOffset, serverPagination!.limit)
  }
  const handlePageSizeChange = (value: string) => {
    const newLimit = Number(value)
    serverPagination?.onPageChange(0, newLimit)
  }

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
      {serverPagination && (
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 lg:block" />
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Строк на странице
              </Label>
              <Select
                value={`${serverPagination.limit}`}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={serverPagination.limit} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Страница {pageIndex + 1} из {pageCount}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 p-0 lg:flex"
                onClick={handleFirstPage}
                disabled={!canPrev}
              >
                <span className="sr-only">В первую страницу</span>
                <IconChevronsLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8 p-0"
                onClick={handlePrevPage}
                disabled={!canPrev}
              >
                <span className="sr-only">Назад</span>
                <IconChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8 p-0"
                onClick={handleNextPage}
                disabled={!canNext}
              >
                <span className="sr-only">Вперёд</span>
                <IconChevronRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 p-0 lg:flex"
                onClick={handleLastPage}
                disabled={!canNext}
              >
                <span className="sr-only">В последнюю страницу</span>
                <IconChevronsRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
