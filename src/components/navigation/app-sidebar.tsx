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
import { usePathname } from "next/navigation"
import type * as React from "react"
import { NavMain } from "@/components/navigation/nav-main"
import { NavUser } from "@/components/navigation/nav-user"
import { ThemeLogo } from "@/components/ui/ThemeLogo"
import { DASHBOARD_HOME } from "@/config/dashboard.pages"
import { useAuth } from "@/hooks/auth/useAuth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/shared/ui/sidebar"
import { Skeleton } from "@/shared/ui/skeleton"

const navMainItems = [
  { title: "Новости", url: `${DASHBOARD_HOME}/news`, icon: IconNews },
  {
    title: "Заявки",
    url: `${DASHBOARD_HOME}/submissions`,
    icon: IconClipboardList,
  },
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
    title: "Отзывы",
    url: `${DASHBOARD_HOME}/reviews`,
    icon: IconMessageCircle2,
  },
  { title: "Команда", url: `${DASHBOARD_HOME}/team`, icon: IconUsersGroup },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const { isMobile, setOpenMobile } = useSidebar()
  const seoUrl = `${DASHBOARD_HOME}/seo`

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-3">
            <Link
              href={DASHBOARD_HOME}
              onClick={() => isMobile && setOpenMobile(false)}
            >
              <ThemeLogo />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <div className="w-full min-w-0 shrink-0 px-2">
          <SidebarSeparator className="mx-0 w-full" />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>SEO настройки</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Наборы мета тегов"
                  isActive={pathname === seoUrl}
                >
                  <Link
                    href={seoUrl}
                    onClick={() => isMobile && setOpenMobile(false)}
                  >
                    <IconSettings />
                    <span>Наборы мета тегов</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
