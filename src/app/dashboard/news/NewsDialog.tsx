"use client"

import { Controller } from "react-hook-form"
import { useNewsForm, VALID_NEWS_CATEGORIES } from "@/app/dashboard/news/useNewsForm"
import { MiniLoader } from "@/components/ui/MiniLoader"
import type { INews } from "@/shared/types/news.types"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
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

export type { NewsFormValues } from "@/app/dashboard/news/useNewsForm"

type NewsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  news: INews | null
}

export function NewsDialog({ open, onOpenChange, news }: NewsDialogProps) {
  const { form, isEdit, isPending, onSubmit } = useNewsForm({
    open,
    news,
    onOpenChange,
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать новость" : "Создать новость"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FieldGroup>
            <Field>
              <FieldLabel>Категория</FieldLabel>
              <Controller
                name="category"
                control={form.control}
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
                      {VALID_NEWS_CATEGORIES.map((cat) => (
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
              <FieldLabel>Заголовок</FieldLabel>
              <Input
                {...form.register("title", { required: true })}
                placeholder="Заголовок"
              />
            </Field>
            <Field>
              <FieldLabel>Краткое содержание</FieldLabel>
              <Textarea
                {...form.register("short_content", { required: true })}
                placeholder="Краткое содержание"
                rows={2}
              />
            </Field>
            <Field>
              <FieldLabel>Содержание</FieldLabel>
              <Textarea
                {...form.register("content", { required: true })}
                placeholder="Полный текст"
                rows={4}
              />
            </Field>
            <Field>
              <FieldLabel>URL изображения</FieldLabel>
              <Input
                {...form.register("image_url")}
                placeholder="https://..."
                type="url"
              />
            </Field>
            <Field>
              <FieldLabel>Alt изображения</FieldLabel>
              <Input {...form.register("alt")} placeholder="Alt текст" />
            </Field>
            <Field>
              <FieldLabel>Дата</FieldLabel>
              <Input
                {...form.register("date", { required: true })}
                type="date"
              />
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
            <Button type="submit" disabled={isPending}>
              {isPending ? <MiniLoader /> : isEdit ? "Сохранить" : "Создать"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
