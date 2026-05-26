"use client"

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/common/theme-toggle"
import Link from "next/link"
import { LayoutDashboard, Settings, LogOut } from "lucide-react"

const navItems = [
  { title: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { title: "설정", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="px-4 text-lg font-bold">StarterKit</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton>
                    <Link href={item.href} className="flex items-center gap-2 w-full">
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 flex flex-col">
        <header className="border-b">
          <div className="flex h-16 items-center justify-between px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}
