"use client"

import { usePathname } from "next/navigation"
import { UserButton } from "@/components/user-button"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import { AuroraText } from "./magicui/aurora-text"

export default function Navbar() {
  const pathname = usePathname()

  // Don't show navbar on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-4">
        <MobileNav />
      <div className="flex h-14 items-center px-4 font-semibold lg:block">
          <Link href="/" className="flex items-center gap-2 font-semibold lg:hidden">
            <span className="text-primary text-2xl font-bold">Health<AuroraText speed={2}>Track</AuroraText></span>
          </Link>
        </div>
      <div className="ml-auto flex items-center gap-4">
        <UserButton />
      </div>
    </header>
  )
}
