import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Продукция",
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
