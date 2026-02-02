"use client"

import { Controller } from "react-hook-form"
import { useNewsForm } from "@/app/dashboard/news/form/useNewsForm"
import { CroppedImageUploader } from "@/components/CroppedImageUploader"
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
import type { INews } from "@/types/news.types"
import { NEWS_CATEGORIES } from "@/types/news.types"

type NewsFormProps = {
  news: INews | null
  onOpenChange: (open: boolean) => void
}

export function NewsForm({ news, onOpenChange }: NewsFormProps) {
  const { register, handleSubmit, control, isEdit, isLoading } = useNewsForm({
    news,
    onOpenChange,
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
                onValueChange={field.onChange}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {NEWS_CATEGORIES.map((cat) => (
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
            {...register("title", { required: true })}
            placeholder="Заголовок"
          />
        </Field>
        <Field>
          <FieldLabel>Краткое содержание</FieldLabel>
          <Textarea
            {...register("short_content", { required: true })}
            placeholder="Краткое содержание"
            rows={2}
          />
        </Field>
        <Field>
          <FieldLabel>Содержание</FieldLabel>
          <Textarea
            {...register("content", { required: true })}
            placeholder="Полный текст"
            rows={4}
          />
        </Field>
        <Field>
          <FieldLabel>Изображение</FieldLabel>
          <Controller
            name="image_url"
            control={control}
            render={({ field }) => (
              <>
                <CroppedImageUploader
                  bucketName={BUCKET_NAMES.news}
                  value={field.value}
                  onChange={(url) => field.onChange(url ?? null)}
                  aspect={16 / 9}
                />
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-destructive hover:text-destructive"
                    onClick={() => field.onChange(null)}
                  >
                    Удалить изображение
                  </Button>
                )}
              </>
            )}
          />
        </Field>
        <Field>
          <FieldLabel>Alt изображения</FieldLabel>
          <Input {...register("alt")} placeholder="Alt текст" />
        </Field>
        <Field>
          <FieldLabel>Дата</FieldLabel>
          <Input {...register("date", { required: true })} type="date" />
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
