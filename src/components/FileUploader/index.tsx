"use client"

import {
  IconExternalLink,
  IconFileUpload,
  IconTrash,
} from "@tabler/icons-react"
import { Loader2 } from "lucide-react"
import { useCallback, useId, useState } from "react"
import { toast } from "sonner"
import mediaService from "@/services/media/media.service"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/utils"
import { getErrorMessage } from "@/shared/utils/error"

export interface FileUploaderProps {
  bucketName: string
  value?: string | null
  onChange?: (url: string | null) => void
  accept?: string
  className?: string
  disabled?: boolean
}

const DEFAULT_ACCEPT = "*/*"

export function FileUploader({
  bucketName,
  value,
  onChange,
  accept = DEFAULT_ACCEPT,
  className,
  disabled,
}: FileUploaderProps) {
  const triggerId = useId()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setUploadProgress(0)
      setIsUploading(true)

      try {
        const results = await mediaService.uploadFiles(
          [file],
          bucketName,
          setUploadProgress,
        )
        const url = results[0]?.file_url ?? null
        if (url) {
          onChange?.(url)
          toast.success("Файл загружен")
        } else {
          toast.error("Ошибка: URL не получен")
        }
      } catch (err) {
        toast.error(getErrorMessage(err, "Ошибка загрузки файла"))
      } finally {
        setIsUploading(false)
        setUploadProgress(0)
        e.target.value = ""
      }
    },
    [bucketName, onChange],
  )

  const handleRemove = useCallback(() => {
    onChange?.(null)
  }, [onChange])

  const fileName = value ? (value.split("/").pop() ?? value) : null

  return (
    <div className={cn("space-y-2", className)}>
      <input
        id={triggerId}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />
      <label
        htmlFor={triggerId}
        className={cn(
          "border-border bg-background flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 transition-colors hover:bg-muted/50",
          (disabled || isUploading) && "pointer-events-none opacity-60",
        )}
      >
        {isUploading ? (
          <div className="flex w-full max-w-xs flex-col items-center gap-3 px-2">
            <Loader2 className="text-primary size-8 animate-spin" />
            <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full transition-[width] duration-150"
                style={{ width: `${Math.max(uploadProgress, 8)}%` }}
              />
            </div>
            <span className="text-muted-foreground text-sm">
              {uploadProgress > 0
                ? `Загрузка… ${uploadProgress}%`
                : "Подготовка загрузки…"}
            </span>
          </div>
        ) : value ? (
          <>
            <IconFileUpload className="text-muted-foreground size-10" />
            <span className="text-muted-foreground px-2 text-center text-sm break-all">
              {fileName}
            </span>
            <span className="text-muted-foreground text-xs">
              Нажмите, чтобы заменить
            </span>
          </>
        ) : (
          <>
            <IconFileUpload className="text-muted-foreground size-10" />
            <span className="text-muted-foreground text-center text-sm">
              Нажмите, чтобы выбрать файл
            </span>
          </>
        )}
      </label>
      {value && !isUploading && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1"
            asChild
          >
            <a href={value} target="_blank" rel="noopener noreferrer">
              <IconExternalLink className="mr-1 size-4" />
              Смотреть
            </a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive shrink-0"
            onClick={handleRemove}
            disabled={disabled}
          >
            <IconTrash className="mr-1 size-4" />
            Удалить файл
          </Button>
        </div>
      )}
    </div>
  )
}
