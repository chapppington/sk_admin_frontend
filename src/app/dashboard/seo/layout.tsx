import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Наборы мета тегов",
}

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  return children
}
