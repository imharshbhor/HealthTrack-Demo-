import type { ActivityItem } from "@/components/dashboard/recent-activity"
import { patientService } from "@/services/patient-service"

export interface DashboardMetrics {
  totalPatients: number
  newPatients: number
  totalUsers: number
  appointments: number
  averageWaitTime: number
  patientVisits: {
    date: string
    visits: number
  }[]
  recentActivities: ActivityItem[]
}

// This is a service that fetches dashboard data
export async function getDashboardData(): Promise<DashboardMetrics> {
//   const totalPatients = await patientService.getTotalPatients();
const totalPatients = 124;

  return {
    totalPatients,
    newPatients: 54,
    totalUsers: 12,
    appointments: 32,
    averageWaitTime: 18,
    patientVisits: generateVisitData(),
    recentActivities: generateRecentActivities(),
  }
}

function generateVisitData() {
  const today = new Date()
  const data = []

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Generate a random number of visits between 10 and 50
    const visits = Math.floor(Math.random() * 40) + 10

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      visits,
    })
  }

  return data
}

function generateRecentActivities(): ActivityItem[] {
  const now = new Date()

  return [
    {
      id: "1",
      type: "registration",
      title: "New patient registered",
      patient: "John Doe",
      timestamp: new Date(now.getTime() - 10 * 60 * 1000), // 10 minutes ago
    },
    {
      id: "2",
      type: "appointment",
      title: "Appointment scheduled",
      patient: "Sarah Johnson",
      timestamp: new Date(now.getTime() - 25 * 60 * 1000), // 25 minutes ago
    },
    {
      id: "3",
      type: "results",
      title: "Lab results updated",
      patient: "Michael Brown",
      timestamp: new Date(now.getTime() - 60 * 60 * 1000), // 1 hour ago
    },
  ]
}
