"use client"

import { useTheme } from "next-themes"
import { Button } from "@/shared/ui/button"
import { Sun } from "lucide-react"

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Переключить тему"
    >
      <Sun className="h-5 w-5" />
    </Button>
  )
}
