import { styled, Typography } from "@mui/material";

export const SectionTitle = styled(Typography)(({ theme }) => `
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1.28px;
  font-weight: 800;
  color: ${theme.palette.text.secondary};
`);