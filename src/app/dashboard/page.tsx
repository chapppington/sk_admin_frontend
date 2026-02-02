import type { Metadata } from "next"
import { DashboardPageContent } from "./DashboardPageContent"

export const metadata: Metadata = {
  title: "Главная",
}

export default function DashboardPage() {
  return <DashboardPageContent />
}
