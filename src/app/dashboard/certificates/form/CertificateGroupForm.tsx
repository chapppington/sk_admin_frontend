"use client"

import { Controller } from "react-hook-form"
import { useCertificateGroupForm } from "@/app/dashboard/certificates/form/useCertificateGroupForm"
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
import { Switch } from "@/shared/ui/switch"
import { Textarea } from "@/shared/ui/textarea"
import type { ICertificateGroup } from "@/types/certificates.types"
import { CERTIFICATE_SECTIONS } from "@/types/certificates.types"

type CertificateGroupFormProps = {
  group: ICertificateGroup | null
  onOpenChange: (open: boolean) => void
}

export function CertificateGroupForm({
  group,
  onOpenChange,
}: CertificateGroupFormProps) {
  const { register, handleSubmit, control, isEdit, isLoading } =
    useCertificateGroupForm({ group, onOpenChange })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Секция</FieldLabel>
          <Controller
            name="section"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                required
                disabled={isEdit}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите секцию" />
                </SelectTrigger>
                <SelectContent>
                  {CERTIFICATE_SECTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field>
          <FieldLabel>Название</FieldLabel>
          <Input
            {...register("title", { required: true })}
            placeholder="Название группы"
          />
        </Field>
        <Field>
          <FieldLabel>Описание</FieldLabel>
          <Textarea
            {...register("content", { required: true })}
            placeholder="Описание"
            rows={3}
          />
        </Field>
        <Field>
          <div className="flex items-center gap-2">
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <FieldLabel>Активна</FieldLabel>
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
