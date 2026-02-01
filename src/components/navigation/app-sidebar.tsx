"use client"

import {
  IconBriefcase,
  IconCertificate,
  IconClipboardList,
  IconNews,
  IconPackage,
  IconUsers,
} from "@tabler/icons-react"
import Link from "next/link"
import type * as React from "react"
import { NavMain } from "@/components/navigation/nav-main"
import { NavUser } from "@/components/navigation/nav-user"
import { ThemeLogo } from "@/components/ui/ThemeLogo"
import { DASHBOARD_HOME } from "@/config/dashboard.pages"
import { useAuth } from "@/hooks/useAuth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/shared/ui/sidebar"
import { Skeleton } from "@/shared/ui/skeleton"

const navMainItems = [
  { title: "Новости", url: `${DASHBOARD_HOME}/news`, icon: IconNews },
  { title: "Продукция", url: `${DASHBOARD_HOME}/products`, icon: IconPackage },
  {
    title: "Вакансии",
    url: `${DASHBOARD_HOME}/vacancies`,
    icon: IconUsers,
  },
  {
    title: "Портфолио",
    url: `${DASHBOARD_HOME}/portfolio`,
    icon: IconBriefcase,
  },
  {
    title: "Сертификаты",
    url: `${DASHBOARD_HOME}/certificates`,
    icon: IconCertificate,
  },
  {
    title: "Заявки",
    url: `${DASHBOARD_HOME}/submissions`,
    icon: IconClipboardList,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useAuth()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-3">
            <Link href={DASHBOARD_HOME}>
              <ThemeLogo />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        {isLoading ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <Skeleton className="h-10 w-full rounded-md" />
            </SidebarMenuItem>
          </SidebarMenu>
        ) : user ? (
          <NavUser user={{ name: user.name, email: user.email }} />
        ) : null}
      </SidebarFooter>
    </Sidebar>
  )
}
