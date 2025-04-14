"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserRound, HeartPulse, BadgeAlert } from "lucide-react"
import { AuroraText } from "./magicui/aurora-text"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isQuestionariesOpen, setIsQuestionariesOpen] = useState(false) // Manage toggle state

  // Hide sidebar on auth pages
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
    //   label: "Risk Calculator",
    //   icon: BadgeAlert,
    //   href: "/risk-calculator",
    //   active: pathname.startsWith("/risk-calculator"),
    // },
    {
      label: "Health Questionaries",
      icon: HeartPulse,
      hasSubRoutes: true, // Flag for submenu
      subRoutes: [
        { label: "Health Disease Screening", href: "/questionaries/disease-screening", active: pathname === "/questionaries/disease-screening" },
        { label: "Final Oral Cancer", href: "/questionaries/oral-cancer", active: pathname === "/questionaries/oral-cancer" },
        { label: "Final Hypertension", href: "/questionaries/hypertension", active: pathname === "/questionaries/hypertension" },
        { label: "Final Diabetes", href: "/questionaries/diabetes", active: pathname === "/questionaries/diabetes" },
        { label: "Final COPD", href: "/questionaries/copd", active: pathname === "/questionaries/copd" },
        { label: "Final Breast Cancer", href: "/questionaries/breast-cancer", active: pathname === "/questionaries/breast-cancer" },
        { label: "Chronic Kidney Disease", href: "/questionaries/kidney-disease", active: pathname === "/questionaries/kidney-disease" },
        { label: "Risk Prediction", href: "/questionaries/risk-prediction", active: pathname === "/questionaries/risk-prediction" },
      ],
    },
  ].filter(route => route.href || route.hasSubRoutes) // Ensure valid routes

  return (
    <div className={cn("hidden border-r bg-background lg:block w-64", className)}>
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex h-14 items-center px-4 font-semibold">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary text-2xl font-bold">Health<AuroraText speed={2}>Track</AuroraText></span>
          </Link>
        </div>
        <nav className="grid gap-1 px-2 pt-4">
          {routes.map((route) => (
            <div key={route.label}>
              {/* Main route item */}
              {route.hasSubRoutes ? (
                <button
                  onClick={() => setIsQuestionariesOpen(!isQuestionariesOpen)}
                  className={cn(
                    "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isQuestionariesOpen ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </span>
                  {/* <ChevronDown className={`h-4 w-4 transition-transform ${isQuestionariesOpen ? "rotate-180" : ""}`} /> */}
                </button>
              ) : (
                <Link
                  href={route.href!}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              )}

              {/* Submenu */}
              {route.hasSubRoutes && isQuestionariesOpen && (
                <div className="ml-4 border-l border-gray-600 pl-3 mt-1">
                  {route.subRoutes!.map((subRoute) => (
                    <Link
                      key={subRoute.label}
                      href={subRoute.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        subRoute.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                      )}
                    >
                      {subRoute.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-auto px-4 py-2 text-sm text-center text-muted-foreground font-semibold">
          This is a demo app with static data.
        </div>
      </div>
    </div>
  )
}
