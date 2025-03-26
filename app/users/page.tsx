"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Pen, Trash, EllipsisVertical, ArrowLeft, ArrowRight } from "lucide-react"
import { useUserStore } from "@/store/userStore"
import { AddUserDialog } from "@/components/user/addUserDialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getUsers, updateUser, deleteUser } from "@/services/user-service" // Import the necessary services

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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10) // Set the number of users per page

  const { toast } = useToast()

  useEffect(() => {
      fetchUsers()
  }, [])

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers(); // Use the getUsers service
      setUsers(data)
      setFilteredUsers(data) // Initialize filtered users
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleEdit = async () => {
    if (!selectedUser) return

    const updatedUser = {
      id: selectedUser._id,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      email: selectedUser.email,
      role: selectedUser.role,
      status: selectedUser.status,
    };

    try {
      await updateUser(updatedUser); // Use the updateUser service
      fetchUsers();
      toast({
          variant: "default",
          title: "User Edited Successfully",
          description: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
      });
    } catch (error) {
      toast({
          variant: "destructive",
          title: "Failed to edit user",
          description: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
      });
    }

    setIsEditOpen(false);
    setSelectedUser(null);
  }

  const handleDeleteConfirmation = (user: User) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser._id); // Use the deleteUser service
      setUsers(users.filter(user => user._id !== selectedUser._id));
      setFilteredUsers(filteredUsers.filter(user => user._id !== selectedUser._id)); // Update filtered users
      toast({
        variant: "default",
        title: "User Deleted Successfully",
        description: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "User Deletion Failed",
        description: new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
      });
    }

    setIsDeleteOpen(false);
    setSelectedUser(null);
  }

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <AddUserDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Healthcare Staff</CardTitle>
          <CardDescription>Manage doctors and administrative staff</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium border-b bg-gray-100">
              <div className="col-span-2">Name</div>
              <div className="text-center">Role</div>
              <div className="text-center">Status</div>
              <div className="text-center">Actions</div>
            </div>

            {currentUsers.map((user) => (
              <div key={user._id} className="grid grid-cols-5 gap-4 p-4 text-sm border-b last:border-0 items-center">
                <div className="col-span-2 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
                    <div className="text-sm hidden lg:block text-gray-500">{user.email}</div>
                  </div>
                </div>

                <div className="text-center">{user.role}</div>

                <div className="text-center">
                  <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                </div>

                <div className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="hover:cursor-pointer" onClick={() => { setSelectedUser(user); setIsEditOpen(true); }}>
                        <Pen />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleDeleteConfirmation(user)}>
                        <Trash />Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <Button
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
                <ArrowLeft />
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ArrowRight />
            </Button>
          </div>
        </CardContent>
      </Card>

      {isEditOpen && selectedUser && (
        <Dialog open={isEditOpen} onOpenChange={() => setIsEditOpen(false)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User Role and Status</DialogTitle>
              <DialogDescription>
                Update the user's role and status here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center ml-3 items-center gap-4">
                <Label htmlFor="role" className="text-right">Role</Label>
                <Select defaultValue={selectedUser.role} onValueChange={(value) => setSelectedUser(prev => ({ ...prev!, role: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center items-center gap-4">
                <Label htmlFor="status" className="text-right">Status</Label>
                <Select defaultValue={selectedUser.status} onValueChange={(value) => setSelectedUser(prev => ({ ...prev!, status: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-between">
                <Button type="button" onClick={() => { handleEdit(); }}>Save changes</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {selectedUser?.firstName} {selectedUser?.lastName}?</p>
          <DialogFooter>
            <Button variant="default" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
