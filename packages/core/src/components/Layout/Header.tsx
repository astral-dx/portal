import { styled, Typography } from "@mui/material";
import { useBrand, useTeams, useUser } from "../../plugin";

const Container = styled('header')(({ theme }) => `
  padding: ${theme.spacing(6, 0)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`);

const Logo = styled('img')(({ theme }) => `
  height: 30px;
`);

const ProfileContainer = styled('div')(({ theme }) => `

`);

const UserName = styled(Typography)(({ theme }) => `
  font-weight: 800;
`);

const TeamName = styled(Typography)(({ theme }) => `
  font-weight: 800;
  font-size: 0.9rem;
  color: ${theme.palette.text.secondary};
`);

export const Header: React.FC = () => {
  const { brand } = useBrand();
  const { user } = useUser();
  const { teams } = useTeams();

  return (
    <Container>
      <Logo src={ brand.logoSrc } />
      { user && (
        <ProfileContainer>
          <UserName>{ user?.name ?? '' }</UserName>
          <TeamName>{ teams[0]?.name ?? '' }</TeamName>
        </ProfileContainer>
      ) }
    </Container>
  )
}