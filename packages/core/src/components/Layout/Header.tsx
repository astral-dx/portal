import { styled, Container } from "@mui/material";

import { useBrand } from "../../plugin";
import { Profile } from "../Profile/Profile";

const Border = styled('div')(({ theme }) => `
  border-bottom: 1px solid ${theme.palette.divider};
  margin-bottom: ${theme.spacing(6)};
`);

const Content = styled('div')(({ theme }) => `
  padding: ${theme.spacing(5, 0)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`);

const Logo = styled('img')(({ theme }) => `
  height: 30px;
`);

export const Header: React.FC<{ logoutPath: string }> = ({ logoutPath }) => {
  const { brand } = useBrand();

  return (
    <Border>
      <Container maxWidth="lg">
        <Content>
          <Logo src={ brand.logoSrc } />
          <Profile logoutPath={ logoutPath } />
        </Content>
      </Container>
    </Border>
  )
}