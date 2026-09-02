import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Опросные листы",
}

export default function QuestionnairesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
