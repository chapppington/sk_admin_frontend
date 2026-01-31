"use client"

import { IconPhoto } from "@tabler/icons-react"
import Image from "next/image"
import type { ComponentProps } from "react"
import { useState } from "react"

function isValidImageUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const defaultFallback = (
  <div className="flex size-full items-center justify-center rounded border bg-muted">
    <IconPhoto className="text-muted-foreground size-6" />
  </div>
)

export interface ImageWithFallbackProps
  extends Omit<ComponentProps<typeof Image>, "src" | "onError"> {
  src: string | null | undefined
  alt: string
  fallback?: React.ReactNode
  containerClassName?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallback = defaultFallback,
  containerClassName,
  className,
  ...imageProps
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  const showFallback = !src || !isValidImageUrl(src) || failed

  if (showFallback) {
    return (
      <div
        className={containerClassName}
        data-slot="image-with-fallback-placeholder"
      >
        {fallback}
      </div>
    )
  }

  return (
    <div className={containerClassName} data-slot="image-with-fallback">
      <Image
        src={src}
        alt={alt}
        className={className}
        onError={() => setFailed(true)}
        {...imageProps}
      />
    </div>
  )
}
