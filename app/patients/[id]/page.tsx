"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Heart, Activity, FileText, Calendar } from "lucide-react"
import type { Level1Data, Level2Data, HistoryRecord, PatientData, Appointment } from "@/types/patient"
import { PatientInfo } from "@/components/patient/patient-info"
import { Level1Screening } from "@/components/patient/level1-screening"
import { Level2Screening } from "@/components/patient/level2-screening"
import { PatientHistory } from "@/components/patient/patient-history"
import { PatientAppointments } from "@/components/patient/patient-appointments"

export default function PatientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

  // State for the screening data
  const [level1Data, setLevel1Data] = useState<Level1Data | null>(null)
  const [level1History, setLevel1History] = useState<Level1Data[]>([])
  const [level2Data, setLevel2Data] = useState<Level2Data | null>(null)
  const [level2History, setLevel2History] = useState<Level2Data[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [patient, setPatient] = useState<PatientData | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const fetchParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    fetchParams()
  }, [params])

  // Mock function to fetch data
  useEffect(() => {
    if (!resolvedParams) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from your API
        // Simulate API delay
        setTimeout(() => {
          // Set patient data
          setPatient({
            id: resolvedParams.id,
            name: "John Doe",
            email: "john@example.com",
            phone: "+91 8833982267",
            dateOfBirth: "1978-05-12",
            age: 45,
            gender: "Male",
            address: "123 Main St, Anytown, India",
            bloodType: "O+",
            allergies: ["Penicillin", "Peanuts"],
            lastVisit: "2023-03-15",
            status: "Active",
            avatar: "/placeholder-user.jpg",
          })

          // Set Level 1 data
          setLevel1Data({
            height: 175, // cm
            weight: 70, // kg
            bloodPressure: {
              systolic: 120,
              diastolic: 80,
            },
            temperature: 101.2, // F
            bpm: 97,
            spo2: 92, // %
            glucose: 95, // mg/dL
            bmi: 22.9,
            ecg: "/placeholder.svg?height=300&width=600",
            recordedAt: new Date().toISOString(),
          })

          // Set Level 1 history
          setLevel1History([
            {
              height: 175,
              weight: 72,
              bloodPressure: { systolic: 125, diastolic: 82 },
              temperature: 98.4,
              bpm: 75,
              spo2: 97,
              glucose: 100,
              bmi: 23.5,
              ecg: "/placeholder.svg?height=300&width=600",
              recordedAt: "2023-02-15T10:30:00Z",
            },
            {
              height: 175,
              weight: 74,
              bloodPressure: { systolic: 130, diastolic: 85 },
              temperature: 98.8,
              bpm: 78,
              spo2: 96,
              glucose: 105,
              bmi: 24.2,
              ecg: "/placeholder.svg?height=300&width=600",
              recordedAt: "2023-01-10T14:15:00Z",
            },
          ])

          // Set Level 2 data
          setLevel2Data({
            pulmonary: {
              fev6: 3.2,
              fev1: 2.8,
              fev1_fvc: 0.85,
            },
            renal: {
              uricAcid: 5.2,
              creatinine: 0.9,
              urea: 15,
            },
            lipid: {
              tc: 180,
              hdl: 55,
              tg: 120,
              tc_hdl: 3.3,
              ldl: 100,
            },
            recordedAt: new Date().toISOString(),
          })

          // Set Level 2 history
          setLevel2History([
            {
              pulmonary: { fev6: 3.1, fev1: 2.7, fev1_fvc: 0.84 },
              renal: { uricAcid: 5.4, creatinine: 1.0, urea: 16 },
              lipid: { tc: 190, hdl: 50, tg: 130, tc_hdl: 3.8, ldl: 110 },
              recordedAt: "2023-02-15T10:30:00Z",
            },
            {
              pulmonary: { fev6: 3.0, fev1: 2.6, fev1_fvc: 0.83 },
              renal: { uricAcid: 5.6, creatinine: 1.1, urea: 17 },
              lipid: { tc: 200, hdl: 45, tg: 140, tc_hdl: 4.4, ldl: 120 },
              recordedAt: "2023-01-10T14:15:00Z",
            },
          ])

          // Set appointments
          setAppointments([
            {
              id: "1",
              date: "April 10, 2023",
              time: "10:00 AM",
              doctor: "Dr. Jane Smith",
              department: "Cardiology",
              status: "Scheduled",
            },
            {
              id: "2",
              date: "March 15, 2023",
              time: "2:30 PM",
              doctor: "Dr. Jane Smith",
              department: "Cardiology",
              status: "Completed",
            },
            {
              id: "3",
              date: "January 10, 2023",
              time: "11:15 AM",
              doctor: "Dr. Michael Brown",
              department: "General Medicine",
              status: "Completed",
            },
          ])

          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [resolvedParams])

  // Mock history records
  const historyRecords: HistoryRecord[] = [
    {
      id: "1",
      date: "2023-03-15",
      type: "Level 1",
      summary: "Routine Checkup",
      details: "All vitals normal. Blood pressure slightly elevated.",
    },
    {
      id: "2",
      date: "2023-01-10",
      type: "Level 2",
      summary: "Comprehensive Screening",
      details: "Lipid profile shows elevated LDL. Recommended dietary changes.",
    },
    {
      id: "3",
      date: "2022-11-05",
      type: "Level 1",
      summary: "Follow-up Visit",
      details: "Blood pressure normalized. Weight reduced by 2kg.",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/patients">
            <ChevronLeft className="h-8 w-8" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Patient Profile</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-7">
          <div className="md:col-span-7 lg:col-span-2">
            <PatientInfo patient={patient} />
          </div>

          <div className="md:col-span-7 lg:col-span-5 space-y-4">
            <Tabs defaultValue="level1" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="level1">
                  <Heart className="h-4 w-4 mr-2" />
                  Level 1
                </TabsTrigger>
                <TabsTrigger value="level2">
                  <Activity className="h-4 w-4 mr-2" />
                  Level 2
                </TabsTrigger>
                <TabsTrigger value="history">
                  <FileText className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger value="appointments">
                  <Calendar className="h-4 w-4 mr-2" />
                  Appointments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="level1">
                <Level1Screening level1Data={level1Data} level1History={level1History} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="level2">
                <Level2Screening level2Data={level2Data} level2History={level2History} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="history">
                <PatientHistory historyRecords={historyRecords} />
              </TabsContent>

              <TabsContent value="appointments">
                <PatientAppointments appointments={appointments} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}
