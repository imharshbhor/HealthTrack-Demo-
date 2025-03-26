"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Eye, ArrowBigRight, ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react"

export default function PatientsPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [patientsPerPage] = useState(5) // Number of patients per page
  const [patients, setPatients] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      age: 45,
      gender: "Male",
      lastVisit: "2023-03-15",
      status: "Active",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      age: 32,
      gender: "Female",
      lastVisit: "2023-03-10",
      status: "Active",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      age: 58,
      gender: "Male",
      lastVisit: "2023-02-28",
      status: "Inactive",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      age: 27,
      gender: "Female",
      lastVisit: "2023-03-05",
      status: "Active",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "robert@example.com",
      age: 62,
      gender: "Male",
      lastVisit: "2023-03-12",
      status: "Active",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "6",
      name: "Alice Smith",
      email: "alice@example.com",
      age: 30,
      gender: "Female",
      lastVisit: "2023-03-01",
      status: "Active",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "7",
      name: "David Johnson",
      email: "david@example.com",
      age: 40,
      gender: "Male",
      lastVisit: "2023-02-20",
      status: "Inactive",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "8",
      name: "Laura Wilson",
      email: "laura@example.com",
      age: 50,
      gender: "Female",
      lastVisit: "2023-03-10",
      status: "Active",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "9",
      name: "James Brown",
      email: "james@example.com",
      age: 35,
      gender: "Male",
      lastVisit: "2023-03-15",
      status: "Active",
      avatar: "/placeholder-user.jpg",
    },
    {
      id: "10",
      name: "Sophia Davis",
      email: "sophia@example.com",
      age: 28,
      gender: "Female",
      lastVisit: "2023-03-12",
      status: "Inactive",
      avatar: "/placeholder-user.jpg",
    },
  ])

  // Calculate the current patients to display
  const indexOfLastPatient = currentPage * patientsPerPage
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient)

  const totalPages = Math.ceil(patients.length / patientsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>View and manage patient information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search patients..." className="pl-8 w-full" />
            </div>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="border rounded-md">
            <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium border-b">
              <div className="col-span-2">Patient</div>
              <div className="hidden md:block">Age/Gender</div>
              <div className="hidden md:block">Last Visit</div>
              <div className="hidden md:block">Status</div>
              <div className="text-center">Actions</div>
            </div>

            {currentPatients.map((patient) => (
              <div key={patient.id} className="grid grid-cols-6 gap-4 p-4 text-sm border-b last:border-0 items-center">
                <div className="col-span-2 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={patient.avatar} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name.charAt(0)}
                      {patient.name.split(" ")[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-muted-foreground">{patient.email}</div>
                  </div>
                </div>
                <div className="hidden md:block">
                  {patient.age} / {patient.gender}
                </div>
                <div className="hidden md:block">{patient.lastVisit}</div>
                <div className="hidden md:block">
                  <Badge variant={patient.status === "Active" ? "default" : "destructive"}>{patient.status}</Badge>
                </div>
                <div className="text-center">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/patients/${patient.id}`}> <Eye />View</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <Button size="sm" onClick={handlePrevPage} disabled={currentPage === 1}><ArrowLeft /> Previous</Button>
            <Button size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>Next <ArrowRight /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
