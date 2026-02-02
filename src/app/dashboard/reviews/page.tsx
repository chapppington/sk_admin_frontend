"use client"

import { useState } from "react"
import { DataTable } from "@/components/DataTable"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useReviews } from "@/hooks/reviews/useReviews"
import { Button } from "@/shared/ui/button"
import type { IReview } from "@/types/reviews.types"
import { getReviewsColumns } from "./columns"
import { ReviewDialog } from "./dialog/ReviewDialog"

export default function ReviewsPage() {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null)

  const { reviews, pagination, isLoading, deleteMutation } = useReviews({
    limit,
    offset,
    sort_field: "created_at",
    sort_order: -1,
  })

  const handleCreate = () => {
    setSelectedReview(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: IReview) => {
    setSelectedReview(item)
    setDialogOpen(true)
  }

  const handleDelete = (item: IReview) => deleteMutation.mutate(item.oid)

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
        <Button onClick={handleCreate}>Добавить отзыв</Button>
      </div>
      <DataTable
        columns={getReviewsColumns(handleEdit, handleDelete)}
        data={reviews}
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
      <ReviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        review={selectedReview}
      />
    </div>
  )
}
