"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/userStore"

export default function Home() {
  const router = useRouter()
  const { user } = useUserStore()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [user, router])

  return null; // Return null while redirecting
}
