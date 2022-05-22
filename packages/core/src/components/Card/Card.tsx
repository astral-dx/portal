import { styled, Typography } from "@mui/material";

export const Card = styled('div')(({ theme }) => `
  background-color: rgba(0, 0, 0, 0.025);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`);

export const CardHeader = styled('div')(({ theme }) => `
  padding: ${theme.spacing(3)};
  display: flex;
  border-bottom: 1px solid ${theme.palette.divider};
  justify-content: space-between;
  align-items: center;
`);

export const CardTitle = styled(Typography)(({ theme }) => `
  font-weight: 800;
  font-size: 1.1rem;
`);

export const CardBody = styled('div')(({ theme }) => `
  padding: ${theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
`);

export const CardActions = styled('div')(({ theme }) => `
  padding: ${theme.spacing(3)};
  display: flex;
  gap: ${theme.spacing(2)};
  justify-content: flex-end;
  border-top: 1px solid ${theme.palette.divider};
`);