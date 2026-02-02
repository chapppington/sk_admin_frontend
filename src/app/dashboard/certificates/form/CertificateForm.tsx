"use client"

import { Controller } from "react-hook-form"
import { useCertificateForm } from "@/app/dashboard/certificates/form/useCertificateForm"
import { FileUploader } from "@/components/FileUploader"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { BUCKET_NAMES } from "@/config/buckets"
import { Button } from "@/shared/ui/button"
import { DialogFooter } from "@/shared/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import type { ICertificate } from "@/types/certificates.types"

type CertificateFormProps = {
  certificateGroupId: string
  certificate: ICertificate | null
  onOpenChange: (open: boolean) => void
}

export function CertificateForm({
  certificateGroupId,
  certificate,
  onOpenChange,
}: CertificateFormProps) {
  const { register, handleSubmit, control, isEdit, isLoading } =
    useCertificateForm({
      certificateGroupId,
      certificate,
      onOpenChange,
    })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Название</FieldLabel>
          <Input
            {...register("title", { required: true })}
            placeholder="Название сертификата"
          />
        </Field>
        <Field>
          <FieldLabel>Файл</FieldLabel>
          <Controller
            name="link"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FileUploader
                bucketName={BUCKET_NAMES.certificates}
                value={field.value || null}
                onChange={(url) => field.onChange(url ?? "")}
                accept=".pdf,application/pdf,.doc,.docx"
              />
            )}
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <MiniLoader /> : isEdit ? "Сохранить" : "Создать"}
        </Button>
      </DialogFooter>
    </form>
  )
}
