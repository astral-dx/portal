import { AddLink } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";

import { Button } from "../Button/Button";

const Container = styled('div')(({ theme }) => `
  display: flex;
  gap: ${theme.spacing(3)};
  justify-content: space-between;
  align-items: center;
`);

const Title = styled(Typography)(({ theme }) => `
  font-weight: 800;
`);

const Subtitle = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
`);

interface HeaderProps {
  title: string;
  subtitle?: string;
  Action?: React.FC;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, Action }) => {
  return (
    <Container>
      <div>
        <Title variantMapping={{ h4: 'h1' }} variant="h4">{ title }</Title>
        { subtitle && <Subtitle variant="caption">{ subtitle }</Subtitle> }
      </div>
      { Action && <Action /> }
    </Container>
  );
}