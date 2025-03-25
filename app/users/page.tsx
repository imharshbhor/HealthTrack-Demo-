"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Menu } from "lucide-react"
import { useUserStore } from "@/store/userStore"

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

export default function UsersPage() {
  const router = useRouter()
  const user = useUserStore()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    if (!user) {
      router.replace("/")
    } else {
      fetchUsers()
    }
  }, [user, router])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/user/getUsers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.JWT_SECRET}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data) // Assuming the API returns an array of users
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <Button>
          <Plus className="mr-1 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Healthcare Staff</CardTitle>
          <CardDescription>Manage doctors, and administrative staff</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="pl-8" />
            </div>
          </div>

          <div className="border rounded-md">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium border-b bg-gray-100">
              <div className="col-span-2">Name</div>
              <div className="text-center">Role</div>
              <div className="text-center">Status</div>
              <div className="text-center">Actions</div>
            </div>

            {/* Table Rows */}
            {users.map((user) => (
              <div key={user._id} className="grid grid-cols-5 gap-4 p-4 text-sm border-b last:border-0 items-center">
                {/* Name Column */}
                <div className="col-span-2 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>

                {/* Role Column */}
                <div className="text-center">{user.role}</div>

                {/* Status Column */}
                <div className="text-center">
                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                </div>

                {/* Actions Column */}
                <div className="text-center">
                  <Button variant="ghost" size="sm">
                    <Menu />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
