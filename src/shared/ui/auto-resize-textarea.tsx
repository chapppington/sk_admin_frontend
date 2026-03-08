"use client"

import { forwardRef, useEffect, useRef } from "react"
import { Textarea } from "@/shared/ui/textarea"
import { cn } from "@/shared/utils"

function resize(textarea: HTMLTextAreaElement | null) {
  if (!textarea) return
  textarea.style.height = "auto"
  textarea.style.height = `${textarea.scrollHeight}px`
}

export const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof Textarea> & { value?: string }
>(function AutoResizeTextarea({ value, className, onInput, ...props }, ref) {
  const innerRef = useRef<HTMLTextAreaElement | null>(null)
  const setRef = (el: HTMLTextAreaElement | null) => {
    innerRef.current = el
    if (typeof ref === "function") ref(el)
    else if (ref) ref.current = el
  }

  useEffect(() => {
    resize(innerRef.current)
  }, [value])

  return (
    <Textarea
      ref={setRef}
      value={value}
      className={cn("resize-none overflow-hidden", className)}
      onInput={(e) => {
        resize(e.currentTarget)
        onInput?.(e)
      }}
      {...props}
    />
  )
})
