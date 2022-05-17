import {Card, CardBody, CardTitle} from "../Layout/Card";
import {Speed} from "@mui/icons-material";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {useEffect, useState} from "react";
import {useInterval} from "react-use";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsPulseCardProps {
  title: string;
}

export const MetricsPulseCard = ({title}: MetricsPulseCardProps) => {
  const [testData, setTestData] = useState<number[]>([.5, .3, .1]);
  const [labels, setLabels] = useState<number[]>([1, 2, 3]);

  useInterval(() => {
    if (testData.length >= 3) {
      testData.shift();
      labels.shift();
    }
    setTestData([...testData, Math.random()]);
    setLabels([...labels, labels[labels.length-1]+1]);
  }, 3000);

  return (
    <Card sx={{opacity: 0.75}}>
      <CardTitle>
        <Speed/> {title}
      </CardTitle>
      <CardBody>
        <Bar datasetIdKey='id'
          data={{
            labels: labels,
            datasets: [
              {
                label: 'Test',
                data: testData,
              }
            ],
        }} />
      </CardBody>
    </Card>
  );
};