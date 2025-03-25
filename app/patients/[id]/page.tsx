"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit, Calendar, FileText, Activity, Pill } from "lucide-react"

export default function PatientProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login")
//     }
//   }, [status, router])

//   if (status === "loading") {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>
//   }

  // Mock patient data - in a real app, you would fetch this from your database
  const patient = {
    id: params.id,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1978-05-12",
    age: 45,
    gender: "Male",
    address: "123 Main St, Anytown, USA",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    lastVisit: "2023-03-15",
    status: "Active",
    avatar: "/placeholder-user.jpg",
  }

  // Mock medical history
  const medicalHistory = [
    {
      id: "1",
      date: "2023-03-15",
      diagnosis: "Hypertension",
      doctor: "Dr. Jane Smith",
      notes: "Blood pressure 140/90. Prescribed medication and lifestyle changes.",
    },
    {
      id: "2",
      date: "2023-01-10",
      diagnosis: "Influenza",
      doctor: "Dr. Michael Brown",
      notes: "Fever, cough, and fatigue. Prescribed rest and fluids.",
    },
    {
      id: "3",
      date: "2022-11-05",
      diagnosis: "Annual Checkup",
      doctor: "Dr. Jane Smith",
      notes: "All vitals normal. Recommended regular exercise.",
    },
  ]

  // Mock appointments
  const appointments = [
    {
      id: "1",
      date: "2023-04-10",
      time: "10:00 AM",
      doctor: "Dr. Jane Smith",
      department: "Cardiology",
      status: "Scheduled",
    },
    {
      id: "2",
      date: "2023-03-15",
      time: "2:30 PM",
      doctor: "Dr. Jane Smith",
      department: "Cardiology",
      status: "Completed",
    },
    {
      id: "3",
      date: "2023-01-10",
      time: "11:15 AM",
      doctor: "Dr. Michael Brown",
      department: "General Medicine",
      status: "Completed",
    },
  ]

  // Mock medications
  const medications = [
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-03-15",
      endDate: "Ongoing",
    },
    {
      id: "2",
      name: "Aspirin",
      dosage: "81mg",
      frequency: "Once daily",
      startDate: "2023-03-15",
      endDate: "Ongoing",
    },
    {
      id: "3",
      name: "Tamiflu",
      dosage: "75mg",
      frequency: "Twice daily",
      startDate: "2023-01-10",
      endDate: "2023-01-15",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/patients">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Patient Profile</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Patient Information</CardTitle>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback>
                {patient.name.charAt(0)}
                {patient.name.split(" ")[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{patient.name}</h2>
            <p className="text-muted-foreground mb-4">{patient.email}</p>
            <Badge className="mb-6">{patient.status}</Badge>

            <div className="w-full text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span>{patient.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gender:</span>
                <span>{patient.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date of Birth:</span>
                <span>{patient.dateOfBirth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{patient.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Blood Type:</span>
                <span>{patient.bloodType}</span>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-muted-foreground">Address:</span>
                <span className="text-right">{patient.address}</span>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-muted-foreground">Allergies:</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {patient.allergies.map((allergy) => (
                    <Badge key={allergy} variant="outline">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-5 space-y-4">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="history">
                <FileText className="h-4 w-4 mr-2" />
                Medical History
              </TabsTrigger>
              <TabsTrigger value="appointments">
                <Calendar className="h-4 w-4 mr-2" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="medications">
                <Pill className="h-4 w-4 mr-2" />
                Medications
              </TabsTrigger>
              <TabsTrigger value="vitals">
                <Activity className="h-4 w-4 mr-2" />
                Vitals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                  <CardDescription>Patient's medical history and past diagnoses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medicalHistory.map((record) => (
                      <div key={record.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{record.diagnosis}</h3>
                            <p className="text-sm text-muted-foreground">{record.doctor}</p>
                          </div>
                          <Badge variant="outline">{record.date}</Badge>
                        </div>
                        <p className="text-sm">{record.notes}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>Past and upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{appointment.department}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                          </div>
                          <Badge variant={appointment.status === "Scheduled" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.date}</span>
                          <span>•</span>
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle>Medications</CardTitle>
                  <CardDescription>Current and past medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medications.map((medication) => (
                      <div key={medication.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{medication.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {medication.dosage} • {medication.frequency}
                            </p>
                          </div>
                          <Badge variant={medication.endDate === "Ongoing" ? "default" : "secondary"}>
                            {medication.endDate === "Ongoing" ? "Current" : "Past"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{medication.startDate}</span>
                          <span>→</span>
                          <span>{medication.endDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitals">
              <Card>
                <CardHeader>
                  <CardTitle>Vitals</CardTitle>
                  <CardDescription>Patient's vital signs over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <Activity className="h-8 w-8 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Vitals chart would go here</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
