"use client"

import type { IVacancy } from "@/types/vacancies.types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { VacancyForm } from "@/app/dashboard/vacancies/form/VacancyForm"

type VacancyDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  vacancy: IVacancy | null
}

export function VacancyDialog({
  open,
  onOpenChange,
  vacancy,
}: VacancyDialogProps) {
  const isEdit = Boolean(vacancy?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать вакансию" : "Создать вакансию"}
          </DialogTitle>
        </DialogHeader>
        {open && <VacancyForm vacancy={vacancy} onOpenChange={onOpenChange} />}
      </DialogContent>
    </Dialog>
  )
}
// 