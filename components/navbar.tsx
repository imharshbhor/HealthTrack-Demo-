"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@/components/user-button"
import { MobileNav } from "@/components/mobile-nav"

export default function Navbar() {
  const pathname = usePathname()

  // Don't show navbar on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {/* <Link href="/" className="flex items-center gap-2 font-semibold">
        <span className="text-primary text-xl">HealthTrack</span>
      </Link> */}
      <div className="ml-auto flex items-center gap-4">
        <UserButton />
        <MobileNav />
      </div>
    </header>
  )
}
