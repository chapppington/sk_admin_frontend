import { Loader2 } from "lucide-react"
import { cn } from "@/shared/utils"

interface Props {
  className?: string
  size?: number
}

export function MiniLoader({ className, size = 30 }: Props) {
  return (
    <Loader2
      className={cn("text-primary mx-auto animate-spin", className)}
      size={size}
      aria-hidden
    />
  )
}
