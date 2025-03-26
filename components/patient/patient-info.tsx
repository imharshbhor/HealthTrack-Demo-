import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit } from "lucide-react"
import type { PatientData } from "@/types/patient"

interface PatientInfoProps {
  patient: PatientData | null
}

export function PatientInfo({ patient }: PatientInfoProps) {
  if (!patient) return null

  return (
    <Card>
      {/* <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="w-full text-xl">Patient Information</CardTitle>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader> */}
      <CardContent className="flex flex-col items-center text-center mt-[2.9rem]">
        <Avatar className="h-28 w-28 mb-4">
          <AvatarImage src={patient.avatar} alt={patient.name} />
          <AvatarFallback>
            {patient.name.charAt(0)}
            {patient.name.split(" ")[1]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{patient.name}</h2>
        <p className="text-muted-foreground mb-8">{patient.email}</p>
        {/* <Badge className="mb-6">{patient.status}</Badge> */}

        <div className="w-full text-left space-y-[8.25px] mb-5">
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
          {/* <div className="flex flex-col gap-1 mt-2">
            <span className="text-muted-foreground">Allergies:</span>
            <div className="flex flex-wrap gap-1 justify-end">
              {patient.allergies.map((allergy) => (
                <Badge key={allergy} variant="outline">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
}
