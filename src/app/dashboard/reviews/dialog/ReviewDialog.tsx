"use client"

import { ReviewForm } from "@/app/dashboard/reviews/form/ReviewForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import type { IReview } from "@/types/reviews.types"

type ReviewDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: IReview | null
}

export function ReviewDialog({
  open,
  onOpenChange,
  review,
}: ReviewDialogProps) {
  const isEdit = Boolean(review?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать отзыв" : "Создать отзыв"}
          </DialogTitle>
        </DialogHeader>
        {open && <ReviewForm review={review} onOpenChange={onOpenChange} />}
      </DialogContent>
    </Dialog>
  )
}
