"use client"

import { useState } from "react"
import { DataTable } from "@/components/DataTable"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useQuestionnaireSettings } from "@/hooks/questionnaire-settings/useQuestionnaireSettings"
import { Button } from "@/shared/ui/button"
import type { IQuestionnaireSettings } from "@/types/questionnaire-settings.types"
import { getQuestionnaireSettingsColumns } from "./columns"
import { QuestionnaireSettingsDialog } from "./dialog/QuestionnaireSettingsDialog"

export default function QuestionnairesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSettings, setSelectedSettings] =
    useState<IQuestionnaireSettings | null>(null)

  const { settings, isLoading, deleteMutation } = useQuestionnaireSettings()

  const handleCreate = () => {
    setSelectedSettings(null)
    setDialogOpen(true)
  }

  const handleEdit = (item: IQuestionnaireSettings) => {
    setSelectedSettings(item)
    setDialogOpen(true)
  }

  const handleDelete = (item: IQuestionnaireSettings) =>
    deleteMutation.mutate(item.oid)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
        <MiniLoader />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
      <div className="flex justify-start">
        <Button onClick={handleCreate}>Добавить опросный лист</Button>
      </div>

      <DataTable
        columns={getQuestionnaireSettingsColumns(handleEdit, handleDelete)}
        data={settings}
      />

      <QuestionnaireSettingsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        settings={selectedSettings}
      />
    </div>
  )
}
