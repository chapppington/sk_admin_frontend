"use client"

import { Controller, useWatch } from "react-hook-form"
import { usePortfolioForm } from "@/app/dashboard/portfolio/form/usePortfolioForm"
import { CroppedImageUploader } from "@/components/CroppedImageUploader"
import { MiniLoader } from "@/components/ui/MiniLoader"
import type { IPortfolio } from "@/types/portfolios.types"
import { BUCKET_NAMES } from "@/config/buckets"
import { Button } from "@/shared/ui/button"
import { DialogFooter } from "@/shared/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { Switch } from "@/shared/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Textarea } from "@/shared/ui/textarea"

const STEPS = [
  { value: "main", label: "Основное" },
  { value: "task", label: "Задача" },
  { value: "solution", label: "Решение" },
  { value: "review", label: "Отзыв" },
] as const

type PortfolioFormProps = {
  portfolio: IPortfolio | null
  onOpenChange: (open: boolean) => void
}

export function PortfolioForm({ portfolio, onOpenChange }: PortfolioFormProps) {
  const {
    register,
    handleSubmit,
    control,
    isEdit,
    isLoading,
  } = usePortfolioForm({ portfolio, onOpenChange })

  const hasReview = useWatch({ control, name: "has_review", defaultValue: false })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Tabs defaultValue={STEPS[0].value} className="w-full min-w-0">
        <TabsList className="mb-3 grid w-full grid-cols-4 h-auto p-1 gap-1">
          {STEPS.map((step) => (
            <TabsTrigger
              key={step.value}
              value={step.value}
              className="min-w-0 px-2 py-2 text-xs sm:text-sm truncate"
            >
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="main">
          <FieldGroup>
            <Field>
              <FieldLabel>Название</FieldLabel>
              <Input {...register("name", { required: true })} placeholder="Название проекта" />
            </Field>
            <Field>
              <FieldLabel>Год</FieldLabel>
              <Input
                {...register("year", { required: true, valueAsNumber: true })}
                type="number"
              />
            </Field>
            <Field>
              <FieldLabel>Полное описание</FieldLabel>
              <Textarea
                {...register("description", { required: true })}
                placeholder="Полное описание проекта"
                rows={4}
              />
            </Field>
            <Field>
              <FieldLabel>Постер</FieldLabel>
              <Controller
                name="poster"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CroppedImageUploader
                    bucketName={BUCKET_NAMES.portfolios}
                    value={field.value}
                    onChange={(url) => field.onChange(url ?? "")}
                    aspect={16 / 9}
                  />
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Alt постера</FieldLabel>
              <Input {...register("poster_alt", { required: true })} placeholder="Описание изображения" />
            </Field>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="task">
          <FieldGroup>
            <Field>
              <FieldLabel>Задача (заголовок)</FieldLabel>
              <Input {...register("task_title", { required: true })} placeholder="Заголовок задачи" />
            </Field>
            <Field>
              <FieldLabel>Задача (описание)</FieldLabel>
              <Textarea
                {...register("task_description", { required: true })}
                placeholder="Описание задачи"
                rows={2}
              />
            </Field>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="solution">
          <FieldGroup>
            <Field>
              <FieldLabel>Решение (заголовок)</FieldLabel>
              <Input {...register("solution_title", { required: true })} placeholder="Заголовок решения" />
            </Field>
            <Field>
              <FieldLabel>Решение (описание)</FieldLabel>
              <Textarea
                {...register("solution_description", { required: true })}
                placeholder="Описание решения"
                rows={2}
              />
            </Field>
            <Field>
              <FieldLabel>Решение (подзаголовок)</FieldLabel>
              <Input {...register("solution_subtitle", { required: true })} placeholder="Подзаголовок" />
            </Field>
            <Field>
              <FieldLabel>Решение (подописание)</FieldLabel>
              <Textarea
                {...register("solution_subdescription", { required: true })}
                placeholder="Подописание"
                rows={2}
              />
            </Field>
            <Field>
              <FieldLabel>Изображение решения (слева)</FieldLabel>
              <Controller
                name="solution_image_left"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CroppedImageUploader
                    bucketName={BUCKET_NAMES.portfolios}
                    value={field.value}
                    onChange={(url) => field.onChange(url ?? "")}
                    aspect={16 / 9}
                  />
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Alt изображения (слева)</FieldLabel>
              <Input {...register("solution_image_left_alt", { required: true })} placeholder="Описание изображения" />
            </Field>
            <Field>
              <FieldLabel>Изображение решения (справа)</FieldLabel>
              <Controller
                name="solution_image_right"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CroppedImageUploader
                    bucketName={BUCKET_NAMES.portfolios}
                    value={field.value}
                    onChange={(url) => field.onChange(url ?? "")}
                    aspect={16 / 9}
                  />
                )}
              />
            </Field>
            <Field>
              <FieldLabel>Alt изображения (справа)</FieldLabel>
              <Input {...register("solution_image_right_alt", { required: true })} placeholder="Описание изображения" />
            </Field>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="review">
          <FieldGroup>
            <Field orientation="horizontal" className="items-center gap-2">
              <Controller
                name="has_review"
                control={control}
                render={({ field }) => (
                  <Switch
                    ref={field.ref}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                    onBlur={field.onBlur}
                    className="shrink-0"
                  />
                )}
              />
              <FieldLabel>Есть отзыв</FieldLabel>
            </Field>
            {hasReview && (
              <>
                <Field>
                  <FieldLabel>Отзыв (заголовок)</FieldLabel>
                  <Input {...register("review_title")} placeholder="Заголовок отзыва" />
                </Field>
                <Field>
                  <FieldLabel>Текст отзыва</FieldLabel>
                  <Textarea {...register("review_text")} placeholder="Текст отзыва" rows={2} />
                </Field>
                <Field>
                  <FieldLabel>Имя автора отзыва</FieldLabel>
                  <Input {...register("review_name")} placeholder="Имя" />
                </Field>
                <Field>
                  <FieldLabel>Роль автора</FieldLabel>
                  <Input {...register("review_role")} placeholder="Должность" />
                </Field>
                <Field>
                  <FieldLabel>Фото автора отзыва</FieldLabel>
                  <Controller
                    name="review_image"
                    control={control}
                    render={({ field }) => (
                      <CroppedImageUploader
                        bucketName={BUCKET_NAMES.portfolios}
                        value={field.value ?? ""}
                        onChange={(url) => field.onChange(url ?? null)}
                        aspect={1}
                      />
                    )}
                  />
                </Field>
              </>
            )}
          </FieldGroup>
        </TabsContent>
      </Tabs>
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
