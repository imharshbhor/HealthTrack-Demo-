"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Users, UserRound, Calendar, Clock, FileText, BarChart } from "lucide-react"
import { useUserStore } from "@/store/userStore"
import { getDashboardData, type DashboardMetrics } from "@/services/dashboard-service"
import { PatientVisitsChart } from "@/components/charts/patient-visits-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { MetricCard } from "@/components/dashboard/metric-card"
import PatientDemographicChart from "@/components/charts/patient-demographic"

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useUserStore()
  const [dashboardData, setDashboardData] = useState<DashboardMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const data = await getDashboardData()
        setDashboardData(data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight sm:m-1">Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
          {/* <TabsTrigger value="reports">Reports</TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
            {dashboardData && (
              <>
                <MetricCard
                  title="Total Patients"
                  value={dashboardData.totalPatients.toLocaleString()}
                  description="+12% from last month"
                  icon={UserRound}
                  trend={{ value: "+12% from last month", positive: true }}
                />
                <MetricCard
                  title="New Patients"
                  value={dashboardData.newPatients}
                  description="+4% from last week"
                  icon={Users}
                  trend={{ value: "+4% from last week", positive: true }}
                />
                <MetricCard
                  title="Total Users"
                  value={dashboardData.totalUsers}
                  description="+2% from last week"
                  icon={Users}
                  trend={{ value: "+2% from last week", positive: true }}
                />
                {/* <MetricCard
                  title="Appointments"
                  value={dashboardData.appointments}
                  description="Today's scheduled appointments"
                  icon={Calendar}
                />

                <MetricCard
                  title="Average Wait Time"
                  value={`${dashboardData.averageWaitTime} min`}
                  description="-2 min from last week"
                  icon={Clock}
                  trend={{ value: "-2 min from last week", positive: true }}
                /> */}
              </>
            )}
          </div>

          <div className="grid lg:grid md:grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-7">
            {dashboardData && (
              <>
                <PatientVisitsChart data={dashboardData.patientVisits} />
                <PatientDemographicChart />
                {/* <RecentActivity activities={dashboardData.recentActivities} /> */}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Patient Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <PatientDemographicChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Treatment Outcomes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                      <Activity className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Revenue Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Appointment Report</h3>
                        <p className="text-sm text-muted-foreground">View appointment statistics</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <UserRound className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Patient Report</h3>
                        <p className="text-sm text-muted-foreground">Patient demographics and trends</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Health Metrics</h3>
                        <p className="text-sm text-muted-foreground">Population health statistics</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
