"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, UserRound, Settings, Menu, BadgeAlert, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AuroraText } from "./magicui/aurora-text"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
    {
      label: "Risk Calculator",
      icon: BadgeAlert,
      href: "/risk-calculator",
      active: pathname.startsWith("/risk-calculator"),
    },
    {
      label: "Health Questionaries",
      icon: HeartPulse,
      hasSubRoutes: true,
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
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 font-semibold">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-primary text-2xl font-bold">Health<AuroraText speed={2}>Track</AuroraText></span>
          </Link>
          </div>
          <nav className="grid gap-1 px-2 pt-4" aria-labelledby="mobile-nav-title">
            <h2 id="mobile-nav-title" className="sr-only">Mobile Navigation</h2>
            {routes.map((route) => (
              <div key={route.label}>
                {route.hasSubRoutes ? (
                  <div>
                    <button
                      onClick={() => setOpen((prev) => !prev)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                      )}
                    >
                      <route.icon className="h-5 w-5" />
                      {route.label}
                    </button>
                    {open && (
                      <div className="ml-4 border-l border-gray-600 pl-3 mt-1">
                        {route.subRoutes.map((subRoute) => (
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
                ) : (
                  <Link
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
