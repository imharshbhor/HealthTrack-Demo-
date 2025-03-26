import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, UserPlus, Calendar, FileText } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export interface ActivityItem {
  id: string
  type: "registration" | "appointment" | "results" | "other"
  title: string
  patient: string
  timestamp: Date
}

interface RecentActivityProps {
  activities: ActivityItem[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "registration":
        return <UserPlus className="h-4 w-4 text-primary" />
      case "appointment":
        return <Calendar className="h-4 w-4 text-primary" />
      case "results":
        return <FileText className="h-4 w-4 text-primary" />
      default:
        return <Activity className="h-4 w-4 text-primary" />
    }
  }

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest patient activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <div className="rounded-full w-8 h-8 bg-secondary-foreground/20 flex items-center justify-center">
                  {getIcon(activity.type)}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.patient} • {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
