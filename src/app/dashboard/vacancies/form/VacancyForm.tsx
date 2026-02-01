"use client"

import { IconPlus, IconTrash } from "@tabler/icons-react"
import { Controller, useFieldArray } from "react-hook-form"
import {
  useVacancyForm,
  VALID_VACANCY_CATEGORIES,
} from "@/app/dashboard/vacancies/form/useVacancyForm"
import type { IVacancy } from "@/types/vacancies.types"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { Button } from "@/shared/ui/button"
import { DialogFooter } from "@/shared/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"

type VacancyFormProps = {
  vacancy: IVacancy | null
  onOpenChange: (open: boolean) => void
}

export function VacancyForm({ vacancy, onOpenChange }: VacancyFormProps) {
  const {
    register,
    handleSubmit,
    control,
    isEdit,
    isLoading,
  } = useVacancyForm({ vacancy, onOpenChange })

  const requirementsFields = useFieldArray({ control, name: "requirements" })
  const experienceFields = useFieldArray({ control, name: "experience" })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Название</FieldLabel>
          <Input
            {...register("title", { required: true })}
            placeholder="Название вакансии"
          />
        </Field>
        <Field>
          <FieldLabel>Категория</FieldLabel>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {VALID_VACANCY_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field>
          <FieldLabel>Зарплата (₽)</FieldLabel>
          <Input
            {...register("salary", { required: true, valueAsNumber: true })}
            type="number"
            min={0}
            placeholder="0"
          />
        </Field>
        <Field>
          <FieldLabel>Требования</FieldLabel>
          <div className="flex flex-col gap-2">
            {requirementsFields.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`requirements.${index}.value`)}
                  placeholder="Требование"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:text-destructive"
                  onClick={() => requirementsFields.remove(index)}
                  title="Удалить"
                >
                  <IconTrash className="size-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() => requirementsFields.append({ value: "" })}
            >
              <IconPlus className="size-4 mr-1" />
              Добавить требование
            </Button>
          </div>
        </Field>
        <Field>
          <FieldLabel>Опыт</FieldLabel>
          <div className="flex flex-col gap-2">
            {experienceFields.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`experience.${index}.value`)}
                  placeholder="Пункт опыта"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-destructive hover:text-destructive"
                  onClick={() => experienceFields.remove(index)}
                  title="Удалить"
                >
                  <IconTrash className="size-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() => experienceFields.append({ value: "" })}
            >
              <IconPlus className="size-4 mr-1" />
              Добавить пункт
            </Button>
          </div>
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Отмена
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <MiniLoader /> : isEdit ? "Сохранить" : "Создать"}
        </Button>
      </DialogFooter>
    </form>
  )
}
