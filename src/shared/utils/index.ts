import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { getErrorMessage } from "./error"
export { formatDate as formatCreationDate } from "./date"
export { slugify } from "./slugify"
export { getReadingTimeMinutes } from "./reading-time"
