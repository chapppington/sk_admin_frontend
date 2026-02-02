"use client"

import { MemberForm } from "@/app/dashboard/team/form/MemberForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import type { IMember } from "@/types/members.types"

type MemberDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: IMember | null
  defaultOrder?: number
}

export function MemberDialog({
  open,
  onOpenChange,
  member,
  defaultOrder = 0,
}: MemberDialogProps) {
  const isEdit = Boolean(member?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать участника" : "Добавить участника"}
          </DialogTitle>
        </DialogHeader>
        {open && (
          <MemberForm
            member={member}
            onOpenChange={onOpenChange}
            defaultOrder={defaultOrder}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
