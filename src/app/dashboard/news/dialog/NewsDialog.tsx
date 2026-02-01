"use client"

import type { INews } from "@/types/news.types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { NewsForm } from "@/app/dashboard/news/form/NewsForm"

type NewsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  news: INews | null
}

export function NewsDialog({ open, onOpenChange, news }: NewsDialogProps) {
  const isEdit = Boolean(news?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать новость" : "Создать новость"}
          </DialogTitle>
        </DialogHeader>
        {open && <NewsForm news={news} onOpenChange={onOpenChange} />}
      </DialogContent>
    </Dialog>
  )
}
