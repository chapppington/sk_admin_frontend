"use client"

import { Controller } from "react-hook-form"
import { useQuestionnaireSettingsForm } from "@/app/dashboard/questionnaires/form/useQuestionnaireSettingsForm"
import { Button } from "@/shared/ui/button"
import { DialogFooter } from "@/shared/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { AutoResizeTextarea } from "@/shared/ui/auto-resize-textarea"
import type { IQuestionnaireSettings } from "@/types/questionnaire-settings.types"

type QuestionnaireSettingsFormProps = {
  settings: IQuestionnaireSettings | null
  onOpenChange: (open: boolean) => void
}

export function QuestionnaireSettingsForm({
  settings,
  onOpenChange,
}: QuestionnaireSettingsFormProps) {
  const { register, handleSubmit, control, isEdit, isLoading } =
    useQuestionnaireSettingsForm({ settings, onOpenChange })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Slug</FieldLabel>
          <Controller
            name="slug"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="ktp"
                readOnly={isEdit}
                className={isEdit ? "cursor-not-allowed opacity-70" : undefined}
              />
            )}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Латиница, цифры и дефисы. URL: /questionnaire/{"{slug}"}
          </p>
        </Field>
        <Field>
          <FieldLabel>Название в админке</FieldLabel>
          <Input
            {...register("page_name", { required: true })}
            placeholder="КТП"
          />
        </Field>
        <Field>
          <FieldLabel>Заголовок H1</FieldLabel>
          <Input
            {...register("h1", { required: true })}
            placeholder="Опросный лист"
          />
        </Field>
        <Field>
          <FieldLabel>Подзаголовок</FieldLabel>
          <Controller
            name="subtitle"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <AutoResizeTextarea {...field} rows={3} />
            )}
          />
        </Field>
        <Field>
          <FieldLabel>Хлебные крошки</FieldLabel>
          <Input
            {...register("breadcrumb_label", { required: true })}
            placeholder="Опросный лист КТП"
          />
        </Field>
      </FieldGroup>

      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Сохранение..." : isEdit ? "Сохранить" : "Создать"}
        </Button>
      </DialogFooter>
    </form>
  )
}
