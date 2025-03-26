"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

interface PatientVisitsChartProps {
  data: {
    date: string
    visits: number
  }[]
}

export function PatientVisitsChart({ data }: PatientVisitsChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex gap-1">
        <CardTitle>Patient Registration</CardTitle>
        <CardDescription>Patient registration over the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {data.length > 0 ? (
          <ChartContainer
            config={{
              visits: {
                label: "Visits",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="hsl(var(--secondary-foreground))"
                  name="Registrations"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
            <span className="text-muted-foreground">No visit data available</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
