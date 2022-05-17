import {Card, CardBody, CardTitle} from "../Layout/Card";
import {Speed} from "@mui/icons-material";
import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import {array} from "yup";

ChartJS.register(
  RadialLinearScale, ArcElement, Tooltip, Legend
);

interface MetricsPolarChartCardProps {
  title: string;
  datasets: any[];
  labels: string[];
}

export const MetricsPolarChartCard = ({title, datasets, labels}: MetricsPolarChartCardProps) => {
  const options: ChartOptions = {
    responsive: true,
  };

  return (
    <Card sx={{opacity: 0.75}}>
      <CardTitle>
        <Speed/> {title}
      </CardTitle>
      <CardBody>
        <PolarArea datasetIdKey='id'
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