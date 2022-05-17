import {Card, CardBody, CardTitle} from "../Layout/Card";
import {Speed} from "@mui/icons-material";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsLineChartCardProps {
  title: string;
  datasets: [];
  labels: string[];
}

export const MetricsLineChartCard = ({title, datasets, labels}: MetricsLineChartCardProps) => {
  const options: ChartOptions = {
    responsive: true,
  };

  return (
    <Card sx={{opacity: 0.75}}>
      <CardTitle>
        <Speed/> {title}
      </CardTitle>
      <CardBody>
        <Line datasetIdKey='id'
              options={options as any}
             data={{
               labels: labels,
               datasets: datasets,
             }}
        />
      </CardBody>
    </Card>
  );
};