import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { patientService } from '@/services/patient-service';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Dot } from 'lucide-react';

const PatientDemographicChart = () => {
  const [demographicData, setDemographicData] = useState([]);

  useEffect(() => {
    const fetchDemographicData = async () => {
      const patients = await patientService.getPatients();
      const genderCounts = patients.reduce((acc, patient) => {
        acc[patient.gender] = (acc[patient.gender] || 0) + 1;
        return acc;
      }, {});

      const data = Object.keys(genderCounts).map(gender => ({
        name: gender,
        value: genderCounts[gender],
      }));

      setDemographicData(data);
    };

    fetchDemographicData();
  }, []);

  const COLORS = ['#FF6384', 'hsl(var(--secondary-foreground))', '#FFCE56'];

  return (
    <Card className="col-span-4 md:col-span-4 lg:col-span-3">
      <CardHeader className="flex gap-1">
        <CardTitle>Demographic Chart</CardTitle>
        <CardDescription>Patient demographic chart.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
      <PieChart width={200} height={200}>
        <Pie
          data={demographicData}
          labelLine={false}
          outerRadius="100%"
          fill="#8884d8"
          dataKey="value"
        >
          {demographicData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      </CardContent>
      <CardFooter className="flex justify-center">
      <div className='flex justify-center mt-4'>
            <span className='flex items-center text-[#FF6384] px-2 rounded'>
              <Dot color={COLORS[0]} /> Male
            </span>
            <span className='flex items-center ml-4 text-[#36A2EB] px-2 rounded'>
              <Dot color={COLORS[1]} /> Female
            </span>
          </div>
      </CardFooter>
      </Card>
  );
};

export default PatientDemographicChart;
