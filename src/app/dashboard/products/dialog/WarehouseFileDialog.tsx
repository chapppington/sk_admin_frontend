"use client"

import { useEffect, useState } from "react"
import { FileUploader } from "@/components/FileUploader"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { BUCKET_NAMES } from "@/config/buckets"
import { useWarehouseFile } from "@/hooks/warehouse-file/useWarehouseFile"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"

const XLSX_ACCEPT =
  ".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"

type WarehouseFileDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WarehouseFileDialog({
  open,
  onOpenChange,
}: WarehouseFileDialogProps) {
  const { warehouseFile, isLoading, upsertMutation } = useWarehouseFile()
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setFileUrl(warehouseFile?.file_url ?? null)
      setFileName(warehouseFile?.file_name ?? null)
    }
  }, [open, warehouseFile])

  const handleSave = () => {
    if (!fileUrl) return

    upsertMutation.mutate(
      { file_url: fileUrl, file_name: fileName },
      { onSuccess: () => onOpenChange(false) },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Редактировать остатки со склада</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <MiniLoader />
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Загрузите Excel-файл с остатками со склада. Он будет доступен для
              скачивания на сайте во вкладке «Товары со склада».
            </p>
            <FileUploader
              bucketName={BUCKET_NAMES.products}
              value={fileUrl}
              onChange={(url) => {
                setFileUrl(url)
                if (url) {
                  setFileName(decodeURIComponent(url.split("/").pop() ?? ""))
                } else {
                  setFileName(null)
                }
              }}
              accept={XLSX_ACCEPT}
              disabled={upsertMutation.isPending}
            />
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={upsertMutation.isPending}
          >
            Отмена
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!fileUrl || upsertMutation.isPending || isLoading}
          >
            {upsertMutation.isPending ? "Сохранение..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
