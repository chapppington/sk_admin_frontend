"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeLogo() {
  const { resolvedTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const src =
    !isMounted || resolvedTheme !== "light" ? "/logo.svg" : "/logo-color.svg"

  return <Image src={src} alt="Logo" width={180} height={40} priority />
}
