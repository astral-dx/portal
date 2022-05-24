import { styled, Container, Typography, Box } from "@mui/material";

import { useBrand } from "../../plugin";

const Border = styled('div')(({ theme }) => `
  border-top: 1px solid ${theme.palette.divider};
  margin-top: ${theme.spacing(10)};
`);

const Content = styled('div')(({ theme }) => `
  padding: ${theme.spacing(10, 0)};
  display: flex;
  align-items: center;
`);

const Left = styled('div')(({ theme }) => `
  display: block;
`);

const Logo = styled('img')(({ theme }) => `
  height: 15px;
  width: auto;
  display: block;
  margin-bottom: ${theme.spacing(2)};
`);

const Copyright = styled(Typography)(({ theme }) => `
  display: block;
`);

export const Footer: React.FC = () => {
  const { brand } = useBrand();

  return (
    <Border>
      <Container maxWidth="lg">
        <Content>
          <Left>
            <Logo src={ brand.logoSrc } />
            <Copyright variant="caption">Portions of this content are &copy;{ (new Date()).getFullYear() }, { brand.title }</Copyright>
            <Copyright variant="caption">Portions of this content are &copy;{ (new Date()).getFullYear() }, Astral DX</Copyright>
          </Left>
        </Content>
      </Container>
    </Border>
  )
}