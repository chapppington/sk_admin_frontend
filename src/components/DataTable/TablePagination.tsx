"use client"

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react"

import { Button } from "@/shared/ui/button"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

export interface TablePaginationProps {
  pageSizeOptions: number[]
  pageCount: number
  pageIndex: number
  limit: number
  canPrev: boolean
  canNext: boolean
  onFirstPage: () => void
  onPrevPage: () => void
  onNextPage: () => void
  onLastPage: () => void
  onPageSizeChange: (value: string) => void
}

export function TablePagination({
  pageSizeOptions,
  pageCount,
  pageIndex,
  limit,
  canPrev,
  canNext,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage,
  onPageSizeChange,
}: TablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="hidden flex-1 lg:block" />
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Строк на странице
          </Label>
          <Select value={`${limit}`} onValueChange={onPageSizeChange}>
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={limit} />
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
            onClick={onFirstPage}
            disabled={!canPrev}
          >
            <span className="sr-only">В первую страницу</span>
            <IconChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 p-0"
            onClick={onPrevPage}
            disabled={!canPrev}
          >
            <span className="sr-only">Назад</span>
            <IconChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 p-0"
            onClick={onNextPage}
            disabled={!canNext}
          >
            <span className="sr-only">Вперёд</span>
            <IconChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 p-0 lg:flex"
            onClick={onLastPage}
            disabled={!canNext}
          >
            <span className="sr-only">В последнюю страницу</span>
            <IconChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
