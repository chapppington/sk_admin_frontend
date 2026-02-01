"use client"

import { useCallback, useEffect, useState } from "react"
import type { Area } from "react-easy-crop"
import { toast } from "sonner"
import mediaService from "@/services/media/media.service"
import { getCroppedImg } from "@/shared/utils/crop"
import { getErrorMessage } from "@/shared/utils/error"

export interface UseUploadParams {
  value?: string | Blob | null
  onChange?: (url: string | null) => void
  aspect?: number
  bucketName: string
}

export function useUpload({
  value,
  onChange,
  aspect = 16 / 9,
  bucketName,
}: UseUploadParams) {
  const [open, setOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (value == null) {
      setPreviewUrl(null)
      return
    }
    if (typeof value === "string") {
      setPreviewUrl(value)
      return
    }
    const url = URL.createObjectURL(value)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [value])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file?.type.startsWith("image/")) return
      const url = URL.createObjectURL(file)
      setImageSrc(url)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCroppedAreaPixels(null)
      setOpen(true)
      e.target.value = ""
    },
    [],
  )

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleCancel = useCallback(() => {
    setImageSrc((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setOpen(false)
  }, [])

  const handleApply = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return
    setIsApplying(true)
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels)
      const url = await mediaService.uploadImage(blob, bucketName)
      onChange?.(url)
      toast.success("Изображение загружено")
      handleCancel()
    } catch (err) {
      toast.error(getErrorMessage(err, "Ошибка загрузки изображения"))
    } finally {
      setIsApplying(false)
    }
  }, [imageSrc, croppedAreaPixels, onChange, handleCancel, bucketName])

  return {
    aspect,
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
  }
}
