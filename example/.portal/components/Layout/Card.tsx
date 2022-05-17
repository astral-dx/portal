import { styled, Typography, alpha } from "@mui/material";

export const Card = styled('div')(({ theme }) => `
  background-color: ${alpha('#fff', 0.5)};
  border: 1px solid ${theme.palette.grey[300]};
  padding: ${theme.spacing(3, 4)};
  border-radius: 10px;
`);

export const CardTitle = styled(Typography)(({ theme }) => `
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  padding-bottom: ${theme.spacing(3)};
`);

export const CardBody = styled('div')(({ theme }) => `
  padding-top: ${theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`);

export const CardActions = styled('div')(({ theme }) => `
  padding-top: ${theme.spacing(3)};
  display: flex;
  gap: ${theme.spacing(1)};
  justify-content: flex-end;
`);