import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { Appointment } from "@/types/patient"

interface PatientAppointmentsProps {
  appointments: Appointment[]
}

export function PatientAppointments({ appointments }: PatientAppointmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Past and upcoming appointments.</CardDescription>
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
                <Badge variant={appointment.status === "Scheduled" ? "dark" : "default"}>
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

        <div className="mt-6 flex justify-end">
          <Button variant="dark">Schedule An Appointment</Button>
        </div>
      </CardContent>
    </Card>
  )
}
