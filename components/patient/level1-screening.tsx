import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Heart, Ruler, Weight, Thermometer, ExternalLink, Link, Link2 } from "lucide-react"
import type { Level1Data } from "@/types/patient"
import { formatDate, getStatusColor } from "@/utils/format"

interface Level1ScreeningProps {
  level1Data: Level1Data | null
  level1History: Level1Data[]
  isLoading: boolean
}

export function Level1Screening({ level1Data, level1History, isLoading }: Level1ScreeningProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Level 1 Screening</CardTitle>
        <CardDescription>
          Basic health metrics from device.
          {level1Data && <span className="ml-2 text-sm">Last updated: <span className="font-bold">{formatDate(level1Data.recordedAt)}</span></span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : level1Data ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Height</h3>
                </div>
                <p className="text-xl font-bold">{level1Data.height} cm</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Weight className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Weight</h3>
                </div>
                <p className="text-xl font-bold">{level1Data.weight} kg</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">BMI <span className="text-xs text-muted-foreground">(18.5-24.9)</span></h3>
                </div>
                <p className={`text-xl font-bold ${getStatusColor(level1Data.bmi, 18.5, 24.9)}`}>
                  {level1Data.bmi.toFixed(1)}
                  <span className="text-xs text-muted-foreground ml-2"></span>
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Blood Pressure <span className="text-xs text-muted-foreground">(120/80)</span></h3>
                </div>
                <p
                  className={`text-xl font-bold ${
                    level1Data.bloodPressure.systolic <= 120 && level1Data.bloodPressure.diastolic <= 80
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {level1Data.bloodPressure.systolic}/{level1Data.bloodPressure.diastolic} mmHg
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Temperature <span className="text-xs text-muted-foreground">(97-99°F)</span></h3>
                </div>
                <p className={`text-xl font-bold ${getStatusColor(level1Data.temperature, 97, 99)}`}>
                  {level1Data.temperature.toFixed(1)}°F
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Heart Rate <span className="text-xs text-muted-foreground">(60-100)</span></h3>
                </div>
                <p className={`text-xl font-bold ${getStatusColor(level1Data.bpm, 60, 100)}`}>
                  {level1Data.bpm} BPM
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Oxygen <span className="text-xs text-muted-foreground">(95-100%)</span></h3>
                </div>
                <p className={`text-xl font-bold ${getStatusColor(level1Data.spo2, 95, 100)}`}>
                  {level1Data.spo2}%
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Glucose <span className="text-xs text-muted-foreground">(&lt;140)</span></h3>
                </div>
                <p className={`text-xl font-bold ${level1Data.glucose < 140 ? "text-green-500" : "text-red-500"}`}>
                  {level1Data.glucose} mg/dL

                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">ECG</h3>
                </div>
                {level1Data.ecg ? (
                  <a href={level1Data.ecg} className="flex justify-start gap-2 text-md font-bold text-blue-500 mt-3" target="_blank" rel="noopener noreferrer">
                    <Link2 size={18} className="mt-[0.2rem]" /> ECG Report
                  </a>
                ) : (
                  <p className="text-xl font-bold text-muted-foreground">No ECG available</p>
                )}
              </div>

            </div>

            {/* <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">ECG</h3>
              </div>
              <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                <img src={level1Data.ecg || "/placeholder.svg"} alt="ECG" className="max-h-full" />
              </div>
            </div> */}

            {/* {level1History.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Previous Readings</h3>
                <div className="space-y-2">
                  {level1History.map((record, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{formatDate(record.recordedAt)}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">BP:</span>{" "}
                          <span>
                            {record.bloodPressure.systolic}/{record.bloodPressure.diastolic}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Weight:</span> <span>{record.weight} kg</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">BMI:</span> <span>{record.bmi.toFixed(1)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Glucose:</span> <span>{record.glucose} mg/dL</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No Level 1 screening data available.</p>
            <Button className="mt-4">Record New Screening</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
