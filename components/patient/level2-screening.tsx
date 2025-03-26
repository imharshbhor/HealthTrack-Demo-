import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity } from "lucide-react"
import type { Level2Data } from "@/types/patient"
import { formatDate } from "@/utils/format"

interface Level2ScreeningProps {
  level2Data: Level2Data | null
  level2History: Level2Data[]
  isLoading: boolean
}

export function Level2Screening({ level2Data, level2History, isLoading }: Level2ScreeningProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Level 2 Screening</CardTitle>
        <CardDescription>
          Advanced health metrics.
          {level2Data && <span className="ml-2 text-sm">Last updated: <span className="font-bold">{formatDate(level2Data.recordedAt)}</span></span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : level2Data ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">COPD/Pulmonary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">FEV6</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.pulmonary.fev6.toFixed(1)}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">FEV1</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.pulmonary.fev1.toFixed(1)}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">FEV1/FVC</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.pulmonary.fev1_fvc.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">CKD/Renal</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Uric Acid</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.renal.uricAcid.toFixed(1)}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Creatinine</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.renal.creatinine.toFixed(1)}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Urea</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.renal.urea.toFixed(1)}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Lipid Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Total Cholesterol (TC)</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.lipid.tc}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">HDL</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.lipid.hdl}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Triglycerides (TG)</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.lipid.tg}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">TC/HDL</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.lipid.tc_hdl.toFixed(1)}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">LDL</h4>
                  </div>
                  <p className="text-xl font-bold">{level2Data.lipid.ldl}</p>
                </div>
              </div>
            </div>

            {/* {level2History.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Previous Readings</h3>
                <div className="space-y-2">
                  {level2History.map((record, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{formatDate(record.recordedAt)}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">TC:</span> <span>{record.lipid.tc}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">LDL:</span> <span>{record.lipid.ldl}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">HDL:</span> <span>{record.lipid.hdl}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Creatinine:</span>{" "}
                          <span>{record.renal.creatinine.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            <div className="flex justify-end">
              <Button variant="dark" >Add Level 2 Screening</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No Level 2 screening data available.</p>
            <Button className="mt-4">Add Level 2 Screening</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
