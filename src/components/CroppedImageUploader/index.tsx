"use client"

import { IconPhotoPlus } from "@tabler/icons-react"
import Image from "next/image"
import { useId } from "react"
import Cropper from "react-easy-crop"

import { useUpload } from "@/components/CroppedImageUploader/useUpload"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { cn } from "@/shared/utils"

const CROP_CONTAINER_HEIGHT = 360

export interface CroppedImageUploaderProps {
  bucketName: string
  value?: string | Blob | null
  onChange?: (url: string | null) => void
  aspect?: number
  className?: string
  accept?: string
}

export function CroppedImageUploader({
  bucketName,
  value,
  onChange,
  aspect = 16 / 9,
  className,
  accept = "image/*",
}: CroppedImageUploaderProps) {
  const triggerId = useId()
  const {
    aspect: cropAspect,
    open,
    imageSrc,
    crop,
    zoom,
    croppedAreaPixels,
    isApplying,
    previewUrl,
    handleFileChange,
    onCropComplete,
    handleCancel,
    handleApply,
    setCrop,
    setZoom,
  } = useUpload({ value, onChange, aspect, bucketName })

  return (
    <div className={cn("space-y-2", className)}>
      <input
        id={triggerId}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleFileChange}
      />
      <label
        htmlFor={triggerId}
        className="border-border bg-background flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 transition-colors hover:bg-muted/50"
      >
        {previewUrl ? (
          <>
            <div className="relative h-40 w-full max-w-full">
              <Image
                src={previewUrl}
                alt=""
                fill
                className="object-contain"
                unoptimized={previewUrl.startsWith("blob:")}
              />
            </div>
            <span className="text-muted-foreground text-sm">
              Нажмите, чтобы заменить
            </span>
          </>
        ) : (
          <>
            <IconPhotoPlus className="text-muted-foreground size-10" />
            <span className="text-muted-foreground text-sm">
              Выберите изображение
            </span>
          </>
        )}
      </label>

      <Dialog open={open} onOpenChange={(o) => !o && handleCancel()}>
        <DialogContent
          className="max-w-2xl data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100"
          showCloseButton={!isApplying}
        >
          <DialogHeader>
            <DialogTitle>Обрезка изображения</DialogTitle>
          </DialogHeader>
          {imageSrc && (
            <div
              className="relative w-full overflow-hidden rounded-md bg-muted"
              style={{ height: CROP_CONTAINER_HEIGHT }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={cropAspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isApplying}
            >
              Отмена
            </Button>
            <Button
              onClick={handleApply}
              disabled={!croppedAreaPixels || isApplying}
            >
              {isApplying ? "Сохранение…" : "Применить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
