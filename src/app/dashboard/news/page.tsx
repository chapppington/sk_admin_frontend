"use client"

import { useState } from "react"
import { DataTable } from "@/components/DataTable"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useNews } from "@/hooks/news/useNews"
import { Button } from "@/shared/ui/button"
import type { INews } from "@/types/news.types"
import { getNewsColumns } from "./columns"
import { NewsDialog } from "./dialog/NewsDialog"

export default function NewsPage() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState<INews | null>(null)

  const { news, pagination, isLoading, deleteMutation } = useNews({
    limit,
    offset,
    sort_field: "created_at",
    sort_order: -1,
  })

  const handleCreate = () => {
    setSelectedNews(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: INews) => {
    setSelectedNews(item)
    setDialogOpen(true)
  }

  const handleDelete = (item: INews) => deleteMutation.mutate(item.oid)

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
      <div className="flex justify-start">
        <Button onClick={handleCreate}>Добавить новость</Button>
      </div>
      <DataTable
        columns={getNewsColumns(handleEdit, handleDelete)}
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
      <NewsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        news={selectedNews}
      />
    </div>
  )
}
