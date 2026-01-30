"use client"

import { useState } from "react"

import { DataTable } from "@/components/data-table"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useNews } from "@/hooks/useNews"
import { newsColumns } from "./columns"

export default function NewsPage() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const { news, pagination, isLoading } = useNews({
    limit,
    offset,
    sort_field: "created_at",
    sort_order: -1,
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
        <MiniLoader />
      </div>
    )
  }

  const handlePageChange = (newOffset: number, newLimit: number) => {
    setOffset(newOffset)
    setLimit(newLimit)
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
      <DataTable
        columns={newsColumns}
        data={news}
        serverPagination={
          pagination
            ? {
                total: pagination.total,
                offset,
                limit,
                onPageChange: handlePageChange,
              }
            : undefined
        }
      />
    </div>
  )
}
