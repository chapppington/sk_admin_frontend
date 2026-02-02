"use client"

import { CertificateForm } from "@/app/dashboard/certificates/form/CertificateForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import type { ICertificate } from "@/types/certificates.types"

type CertificateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  certificateGroupId: string
  certificate: ICertificate | null
}

export function CertificateDialog({
  open,
  onOpenChange,
  certificateGroupId,
  certificate,
}: CertificateDialogProps) {
  const isEdit = Boolean(certificate?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать сертификат" : "Добавить сертификат"}
          </DialogTitle>
        </DialogHeader>
        {open && (
          <CertificateForm
            certificateGroupId={certificateGroupId}
            certificate={certificate}
            onOpenChange={onOpenChange}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
