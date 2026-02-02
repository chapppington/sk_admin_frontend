"use client"

import { Controller, useWatch } from "react-hook-form"
import { useReviewForm } from "@/app/dashboard/reviews/form/useReviewForm"
import { CroppedImageUploader } from "@/components/CroppedImageUploader"
import { FileUploader } from "@/components/FileUploader"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { BUCKET_NAMES } from "@/config/buckets"
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
import { Textarea } from "@/shared/ui/textarea"
import type { IReview } from "@/types/reviews.types"
import { REVIEW_CATEGORIES } from "@/types/reviews.types"

type ReviewFormProps = {
  review: IReview | null
  onOpenChange: (open: boolean) => void
}

const EMPLOYEE_CATEGORY = "Сотрудники"
const CLIENT_CATEGORY = "Клиенты"

export function ReviewForm({ review, onOpenChange }: ReviewFormProps) {
  const { register, handleSubmit, control, setValue, isEdit, isLoading } =
    useReviewForm({ review, onOpenChange })

  const category = useWatch({
    control,
    name: "category",
    defaultValue: REVIEW_CATEGORIES[0],
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Категория</FieldLabel>
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value === CLIENT_CATEGORY) {
                    setValue("text", null)
                    setValue("short_text", null)
                  } else if (value === EMPLOYEE_CATEGORY) {
                    setValue("content_url", null)
                  }
                  field.onChange(value)
                }}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {REVIEW_CATEGORIES.map((cat) => (
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
          <FieldLabel>Имя / Название</FieldLabel>
          <Input
            {...register("name", { required: true })}
            placeholder="Имя или название организации"
          />
        </Field>
        <Field>
          <FieldLabel>Должность</FieldLabel>
          <Input {...register("position")} placeholder="Должность" />
        </Field>
        <Field>
          <FieldLabel>Фото</FieldLabel>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <>
                <CroppedImageUploader
                  bucketName={BUCKET_NAMES.reviews}
                  value={field.value ?? ""}
                  onChange={(url) => field.onChange(url ?? null)}
                  aspect={1}
                />
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-destructive hover:text-destructive"
                    onClick={() => field.onChange(null)}
                  >
                    Удалить фото
                  </Button>
                )}
              </>
            )}
          />
        </Field>
        {category === EMPLOYEE_CATEGORY && (
          <>
            <Field>
              <FieldLabel>Краткий текст</FieldLabel>
              <Textarea
                {...register("short_text")}
                placeholder="Краткий отзыв"
                rows={2}
              />
            </Field>
            <Field>
              <FieldLabel>Полный текст</FieldLabel>
              <Textarea
                {...register("text")}
                placeholder="Полный текст отзыва"
                rows={4}
              />
            </Field>
          </>
        )}
        {category === CLIENT_CATEGORY && (
          <Field>
            <FieldLabel>Файл отзыва</FieldLabel>
            <Controller
              name="content_url"
              control={control}
              render={({ field }) => (
                <FileUploader
                  bucketName={BUCKET_NAMES.reviews}
                  value={field.value}
                  onChange={field.onChange}
                  accept="image/*,.pdf"
                />
              )}
            />
          </Field>
        )}
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
