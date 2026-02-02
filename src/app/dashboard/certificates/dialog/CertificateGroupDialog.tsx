"use client"

import { CertificateGroupForm } from "@/app/dashboard/certificates/form/CertificateGroupForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import type { ICertificateGroup } from "@/types/certificates.types"

type CertificateGroupDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: ICertificateGroup | null
}

export function CertificateGroupDialog({
  open,
  onOpenChange,
  group,
}: CertificateGroupDialogProps) {
  const isEdit = Boolean(group?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать группу" : "Создать группу"}
          </DialogTitle>
        </DialogHeader>
        {open && (
          <CertificateGroupForm group={group} onOpenChange={onOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}
