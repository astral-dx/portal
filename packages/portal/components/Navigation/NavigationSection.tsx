import React from "react";
import { styled, Typography } from "@mui/material";

import { usePlatformConfig } from "../../hooks/usePlatformConfig";

interface NavigationSectionProps {
  title: string;
}

const Wrapper = styled('div')(({ theme }) => `
  
`);

const Title = styled(Typography)(({ theme }) => `
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  font-weight: 800;
  padding: ${theme.spacing(1, 0, 1, 1)};
  color: ${theme.palette.text.secondary};
`);

export const NavigationSection: React.FC<NavigationSectionProps> = ({ title, children }) => (
  <Wrapper>
    <Title>{title}</Title>
    {children}
  </Wrapper>
);