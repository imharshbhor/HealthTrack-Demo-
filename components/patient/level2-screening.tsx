import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Pencil, Save } from "lucide-react"
import type { Level2Data } from "@/types/patient"
import { formatDate } from "@/utils/format"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Level2ScreeningProps {
  level2Data: Level2Data | null
  level2History: Level2Data[]
  isLoading: boolean
  updateLevel2Data: (data: Level2Data) => Promise<void>
}

export function Level2Screening({ level2Data, level2History, isLoading, updateLevel2Data }: Level2ScreeningProps) {
  const [editingSections, setEditingSections] = useState<{
    pulmonary: boolean;
    renal: boolean;
    lipid: boolean;
  }>({
    pulmonary: false,
    renal: false,
    lipid: false
  });
  const [editedData, setEditedData] = useState<Level2Data | null>(level2Data);

  useEffect(() => {
    setEditedData(level2Data);
  }, [level2Data]);

  const handleEdit = (section: 'pulmonary' | 'renal' | 'lipid') => {
    setEditingSections(prev => ({
      ...prev,
      [section]: true
    }));
  };

  const handleSave = (section: 'pulmonary' | 'renal' | 'lipid') => {
    // if (editedData) {
    //   await updateLevel2Data(editedData);
    //   setEditingSections(prev => ({
    //     ...prev,
    //     [section]: false
    //   }));
    // }
    setEditingSections(prev => ({
      ...prev,
      [section]: false
    }));
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    if (!editedData) return;

    const numValue = parseFloat(value);

    setEditedData(prev => {
      if (!prev) return prev;

      const newData = { ...prev };

      if (section === 'pulmonary') {
        newData.pulmonary = {
          ...newData.pulmonary,
          [field]: isNaN(numValue) ? 0 : numValue
        };
      } else if (section === 'renal') {
        newData.renal = {
          ...newData.renal,
          [field]: isNaN(numValue) ? 0 : numValue
        };
      } else if (section === 'lipid') {
        newData.lipid = {
          ...newData.lipid,
          [field]: isNaN(numValue) ? 0 : numValue
        };
      }

      return newData;
    });
  };

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
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3 flex justify-between items-center">
                COPD/Pulmonary
                <Button variant="ghost" size="sm" onClick={() => editingSections.pulmonary ? handleSave('pulmonary') : handleEdit('pulmonary')}>
                  {editingSections.pulmonary ? <Save className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
                </Button>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">FEV6</h4>
                  </div>
                  {editingSections.pulmonary ? (
                    <Input
                      type="number"
                      value={editedData?.pulmonary.fev6.toString() || ''}
                      onChange={(e) => handleInputChange('pulmonary', 'fev6', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                      step="0.1"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.pulmonary.fev6.toFixed(1) : 'N/A'}</p>
                  )}
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">FEV1</h4>
                  </div>
                  {editingSections.pulmonary ? (
                    <Input
                      type="number"
                      value={editedData?.pulmonary.fev1.toString() || ''}
                      onChange={(e) => handleInputChange('pulmonary', 'fev1', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                      step="0.1"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.pulmonary.fev1.toFixed(1) : 'N/A'}</p>
                  )}
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">FEV1/FVC</h4>
                  </div>
                  {editingSections.pulmonary ? (
                    <Input
                      type="number"
                      value={editedData?.pulmonary.fev1_fvc.toString() || ''}
                      onChange={(e) => handleInputChange('pulmonary', 'fev1_fvc', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                      step="0.01"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.pulmonary.fev1_fvc.toFixed(2) : 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex justify-between items-center">
                CKD/Renal
                <Button variant="ghost" size="sm" onClick={() => editingSections.renal ? handleSave('renal') : handleEdit('renal')}>
                  {editingSections.renal ? <Save className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
                </Button>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Uric Acid</h4>
                  </div>
                  {editingSections.renal ? (
                    <Input
                      type="number"
                      value={editedData?.renal.uricAcid.toString() || ''}
                      onChange={(e) => handleInputChange('renal', 'uricAcid', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                      step="0.1"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.renal.uricAcid.toFixed(1) : 'N/A'}</p>
                  )}
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Creatinine</h4>
                  </div>
                  {editingSections.renal ? (
                    <Input
                      type="number"
                      value={editedData?.renal.creatinine.toString() || ''}
                      onChange={(e) => handleInputChange('renal', 'creatinine', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                      step="0.1"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.renal.creatinine.toFixed(1) : 'N/A'}</p>
                  )}
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Urea</h4>
                  </div>
                  {editingSections.renal ? (
                    <Input
                      type="number"
                      value={editedData?.renal.urea.toString() || ''}
                      onChange={(e) => handleInputChange('renal', 'urea', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                      step="0.1"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.renal.urea.toFixed(1) : 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex justify-between items-center">
                Lipid Profile
                <Button variant="ghost" size="sm" onClick={() => editingSections.lipid ? handleSave('lipid') : handleEdit('lipid')}>
                  {editingSections.lipid ? <Save className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
                </Button>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Total Cholesterol (TC)</h4>
                  </div>
                  {editingSections.lipid ? (
                    <Input
                      type="number"
                      value={editedData?.lipid.tc.toString() || ''}
                      onChange={(e) => handleInputChange('lipid', 'tc', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.lipid.tc : 'N/A'}</p>
                  )}
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">HDL</h4>
                  </div>
                  {editingSections.lipid ? (
                    <Input
                      type="number"
                      value={editedData?.lipid.hdl.toString() || ''}
                      onChange={(e) => handleInputChange('lipid', 'hdl', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.lipid.hdl : 'N/A'}</p>
                  )}
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">Triglycerides (TG)</h4>
                  </div>
                  {editingSections.lipid ? (
                    <Input
                      type="number"
                      value={editedData?.lipid.tg.toString() || ''}
                      onChange={(e) => handleInputChange('lipid', 'tg', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.lipid.tg : 'N/A'}</p>
                  )}
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">TC/HDL</h4>
                  </div>
                  {editingSections.lipid ? (
                    <Input
                      type="number"
                      value={editedData?.lipid.tc_hdl.toString() || ''}
                      onChange={(e) => handleInputChange('lipid', 'tc_hdl', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                      step="0.1"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.lipid.tc_hdl.toFixed(1) : 'N/A'}</p>
                  )}
                </div>

                <div className="border rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">LDL</h4>
                  </div>
                  {editingSections.lipid ? (
                    <Input
                      type="number"
                      value={editedData?.lipid.ldl.toString() || ''}
                      onChange={(e) => handleInputChange('lipid', 'ldl', e.target.value)}
                      className="text-xl font-bold border border-secondary-foreground"
                    />
                  ) : (
                    <p className="text-xl font-bold">{level2Data ? level2Data.lipid.ldl : 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
