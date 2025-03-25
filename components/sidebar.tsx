"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserRound, Settings } from "lucide-react"
import { AuroraText } from "./magicui/aurora-text"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  // Don't show sidebar on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Users",
      icon: Users,
      href: "/users",
      active: pathname === "/users",
    },
    {
      label: "Patients",
      icon: UserRound,
      href: "/patients",
      active: pathname.startsWith("/patients"),
    },
    // {
    //   label: "Settings",
    //   icon: Settings,
    //   href: "/settings",
    //   active: pathname === "/settings",
    // },
  ]

  return (
    <div className={cn("hidden border-r bg-background md:block w-64", className)}>
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex h-14 items-center px-4 font-semibold">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary text-2xl font-bold">Health<AuroraText speed={2}>Track</AuroraText></span>
          </Link>
        </div>
        <nav className="grid gap-1 px-2 pt-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
