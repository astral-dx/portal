import { styled, Container, Typography, Box } from "@mui/material";

import { useBrand } from "../../plugin";

const Border = styled('div')(({ theme }) => `
  border-top: 1px solid ${theme.palette.divider};
  margin-top: ${theme.spacing(15)};
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

const Text = styled(Typography)(({ theme }) => `
  display: block;
  color: ${theme.palette.text.secondary};
`);

export const Footer: React.FC = () => {
  const { brand } = useBrand();

  return (
    <Border>
      <Container maxWidth="lg">
        <Content>
          <Left>
            <Logo src={ brand.logoSrc } />
            <Text variant="caption">Portions of this content are &copy;{ (new Date()).getFullYear() }, { brand.title }</Text>
            <Text variant="caption">Portions of this content are &copy;{ (new Date()).getFullYear() }, Astral DX</Text>
          </Left>
        </Content>
      </Container>
    </Border>
  )
}