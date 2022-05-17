import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React from "react";
import { Metric } from "../../hooks/useMetrics";
import { Card, CardTitle } from "../Layout/Card";


export const RecentMetricsTable: React.FC<{ metrics: Metric[] }> = ({ metrics }) => (
  <Card>
    <CardTitle>Recent API Calls</CardTitle>
    <TableContainer>
      <Table aria-label="Recent API Calls">
        <TableHead>
          <TableRow>
            <TableCell>Method</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Endpoint</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { metrics.slice(0, 10).map((metric) => (
            <TableRow
              key={metric.timestamp}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {metric.method}
              </TableCell>
              <TableCell>
                {metric.status}
              </TableCell>
              <TableCell>
                {metric.endpoint}
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
); 