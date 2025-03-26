import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { HistoryRecord } from "@/types/patient"

interface PatientHistoryProps {
  historyRecords: HistoryRecord[]
}

export function PatientHistory({ historyRecords }: PatientHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
        <CardDescription>Patient's screening history and records.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historyRecords.map((record) => (
            <div key={record.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{record.summary}</h3>
                  <p className="text-sm text-muted-foreground">{record.type} Screening</p>
                </div>
                <Badge variant="outline">{record.date}</Badge>
              </div>
              <p className="text-sm">{record.details}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
