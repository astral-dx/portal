import {Card, CardBody, CardTitle} from "../Layout/Card";
import {Box, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {Speed} from "@mui/icons-material";

interface MetricNumberCardProps {
  title: string;
  value: number;
  label?: string;
}

const Value = styled(Typography)(({theme}) => `
  font-size: 3rem;
  text-align: center;
  display: block;
`);

const Label = styled(Typography)(({theme}) => `
  font-size: 0.875rem;
  font-style: bold;
  color: #999999;
  text-align: center;
  display: block;
`);

export const MetricNumberCard = ({title, value, label}: MetricNumberCardProps) => {

  return (
    <Card sx={{ opacity: 0.75 }}>
      <CardTitle>
        <Speed/> {title}
      </CardTitle>
      <CardBody>
        <Value>{value}</Value> {/* abbr i.e. 50k / maybe some animation */}
        <Label>{label}</Label>
      </CardBody>
    </Card>
  );
};