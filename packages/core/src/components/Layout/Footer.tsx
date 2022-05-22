import { styled, Container } from "@mui/material";

import { useBrand } from "../../plugin";

const Border = styled('div')(({ theme }) => `
  border-top: 1px solid ${theme.palette.divider};
  margin-top: ${theme.spacing(6)};
`);

const Content = styled('div')(({ theme }) => `
  padding: ${theme.spacing(10, 0)};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`);

const Logo = styled('img')(({ theme }) => `
  height: 15px;
`);

export const Footer: React.FC = () => {
  const { brand } = useBrand();

  return (
    <Border>
      <Container maxWidth="lg">
        <Content>
          <Logo src={ brand.logoSrc } />
        </Content>
      </Container>
    </Border>
  )
}