"use client"

import type { ISeoSettings } from "@/types/seo-settings.types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { SeoSettingsForm } from "@/app/dashboard/seo/form/SeoSettingsForm"

type SeoSettingsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  seoSettings: ISeoSettings | null
}

export function SeoSettingsDialog({ open, onOpenChange, seoSettings }: SeoSettingsDialogProps) {
  const isEdit = Boolean(seoSettings?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать набор мета тегов" : "Создать набор мета тегов"}
          </DialogTitle>
        </DialogHeader>
        {open && (
          <SeoSettingsForm seoSettings={seoSettings} onOpenChange={onOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}
