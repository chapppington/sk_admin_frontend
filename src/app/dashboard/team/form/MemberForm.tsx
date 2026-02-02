"use client"

import { Controller } from "react-hook-form"
import { CroppedImageUploader } from "@/components/CroppedImageUploader"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { BUCKET_NAMES } from "@/config/buckets"
import { Button } from "@/shared/ui/button"
import { DialogFooter } from "@/shared/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import type { IMember } from "@/types/members.types"
import { useMemberForm } from "./useMemberForm"

type MemberFormProps = {
  member: IMember | null
  onOpenChange: (open: boolean) => void
  defaultOrder?: number
}

export function MemberForm({
  member,
  onOpenChange,
  defaultOrder = 0,
}: MemberFormProps) {
  const { register, handleSubmit, control, isEdit, isLoading } =
    useMemberForm({ member, onOpenChange, defaultOrder })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Имя</FieldLabel>
          <Input
            {...register("name", { required: true })}
            placeholder="Имя участника"
          />
        </Field>
        <Field>
          <FieldLabel>Должность</FieldLabel>
          <Input
            {...register("position", { required: true })}
            placeholder="Должность"
          />
        </Field>
        <Field>
          <FieldLabel>Фото</FieldLabel>
          <Controller
            name="image"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CroppedImageUploader
                bucketName={BUCKET_NAMES.team}
                value={field.value ?? ""}
                onChange={(url) => field.onChange(url ?? "")}
                aspect={1}
              />
            )}
          />
        </Field>
        <Field>
          <FieldLabel>Email (необязательно)</FieldLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="email@example.com"
          />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Отмена
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <MiniLoader /> : isEdit ? "Сохранить" : "Добавить"}
        </Button>
      </DialogFooter>
    </form>
  )
}
