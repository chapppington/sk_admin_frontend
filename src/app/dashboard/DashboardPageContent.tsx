"use client"

import {
  IconBriefcase,
  IconCertificate,
  IconClipboardList,
  IconMessageCircle2,
  IconNews,
  IconPackage,
  IconSettings,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react"
import Link from "next/link"
import { DASHBOARD_HOME } from "@/config/dashboard.pages"
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { cn } from "@/shared/utils"

const navItems = [
  { title: "Новости", href: `${DASHBOARD_HOME}/news`, icon: IconNews },
  {
    title: "Заявки",
    href: `${DASHBOARD_HOME}/submissions`,
    icon: IconClipboardList,
  },
  { title: "Продукция", href: `${DASHBOARD_HOME}/products`, icon: IconPackage },
  { title: "Вакансии", href: `${DASHBOARD_HOME}/vacancies`, icon: IconUsers },
  {
    title: "Портфолио",
    href: `${DASHBOARD_HOME}/portfolio`,
    icon: IconBriefcase,
  },
  {
    title: "Сертификаты",
    href: `${DASHBOARD_HOME}/certificates`,
    icon: IconCertificate,
  },
  { title: "Команда", href: `${DASHBOARD_HOME}/team`, icon: IconUsersGroup },
  { title: "Отзывы", href: `${DASHBOARD_HOME}/reviews`, icon: IconMessageCircle2 },
  {
    title: "Наборы мета тегов",
    href: `${DASHBOARD_HOME}/seo`,
    icon: IconSettings,
  },
]

export function DashboardPageContent() {
  return (
    <div className="flex flex-col gap-6 px-4 py-4 md:gap-8 md:px-6 md:py-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Панель управления
        </h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Выберите раздел для перехода
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Card
                className={cn(
                  "h-full transition-colors hover:bg-muted/50 hover:border-primary/30",
                )}
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription className="text-xs">
                      Перейти в раздел
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
