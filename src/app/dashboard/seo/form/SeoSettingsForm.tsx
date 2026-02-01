"use client"

import { Controller } from "react-hook-form"
import { useSeoSettingsForm } from "@/app/dashboard/seo/form/useSeoSettingsForm"
import { CroppedImageUploader } from "@/components/CroppedImageUploader"
import { MiniLoader } from "@/components/ui/MiniLoader"
import type { ISeoSettings } from "@/types/seo-settings.types"
import { BUCKET_NAMES } from "@/config/buckets"
import { Button } from "@/shared/ui/button"
import { DialogFooter } from "@/shared/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { Switch } from "@/shared/ui/switch"
import { Textarea } from "@/shared/ui/textarea"

type SeoSettingsFormProps = {
  seoSettings: ISeoSettings | null
  onOpenChange: (open: boolean) => void
}

export function SeoSettingsForm({ seoSettings, onOpenChange }: SeoSettingsFormProps) {
  const {
    register,
    handleSubmit,
    control,
    isEdit,
    isLoading,
  } = useSeoSettingsForm({ seoSettings, onOpenChange })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Путь страницы</FieldLabel>
          <Input
            {...register("page_path", { required: true })}
            placeholder="/about"
          />
        </Field>
        <Field>
          <FieldLabel>Название страницы</FieldLabel>
          <Input
            {...register("page_name", { required: true })}
            placeholder="О компании"
          />
        </Field>
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input
            {...register("title", { required: true })}
            placeholder="Заголовок для поисковиков"
          />
        </Field>
        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea
            {...register("description", { required: true })}
            placeholder="Описание для поисковиков"
            rows={2}
          />
        </Field>
        <Field>
          <FieldLabel>Keywords</FieldLabel>
          <Input {...register("keywords")} placeholder="ключевые, слова" />
        </Field>
        <Field>
          <FieldLabel>OG Title</FieldLabel>
          <Input {...register("og_title")} placeholder="Заголовок для соцсетей" />
        </Field>
        <Field>
          <FieldLabel>OG Description</FieldLabel>
          <Textarea
            {...register("og_description")}
            placeholder="Описание для соцсетей"
            rows={2}
          />
        </Field>
        <Field>
          <FieldLabel>OG Image</FieldLabel>
          <Controller
            name="og_image"
            control={control}
            render={({ field }) => (
              <>
                <CroppedImageUploader
                  bucketName={BUCKET_NAMES.seo}
                  value={field.value ?? ""}
                  onChange={(url) => field.onChange(url ?? null)}
                  aspect={1200 / 630}
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
          <FieldLabel>Canonical URL</FieldLabel>
          <Input
            {...register("canonical_url")}
            placeholder="https://example.com/page"
          />
        </Field>
        <Field orientation="horizontal" className="items-center gap-2">
          <Controller
            name="is_active"
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
          <FieldLabel>Активно</FieldLabel>
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
