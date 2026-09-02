"use client"

import { QuestionnaireSettingsForm } from "@/app/dashboard/questionnaires/form/QuestionnaireSettingsForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import type { IQuestionnaireSettings } from "@/types/questionnaire-settings.types"

type QuestionnaireSettingsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: IQuestionnaireSettings | null
}

export function QuestionnaireSettingsDialog({
  open,
  onOpenChange,
  settings,
}: QuestionnaireSettingsDialogProps) {
  const isEdit = Boolean(settings?.oid)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать опросный лист" : "Добавить опросный лист"}
          </DialogTitle>
        </DialogHeader>
        {open && (
          <QuestionnaireSettingsForm
            key={settings?.oid ?? "new"}
            settings={settings}
            onOpenChange={onOpenChange}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
