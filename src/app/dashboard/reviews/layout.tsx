import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Отзывы",
}

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
