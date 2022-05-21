import { styled, Typography } from "@mui/material";
import { useTeam } from "../../plugin";

const Container = styled('header')(({ theme }) => `
  padding: ${theme.spacing(2)};
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
`);

const Title = styled(Typography)(({ theme }) => `
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 0.8rem;
  color: ${theme.palette.text.secondary};
  padding-left: ${theme.spacing(2)};
`);

const Reference = styled('a')(({ theme }) => `
  padding: ${theme.spacing(2)};
  width: 100%;
  color: ${theme.palette.text.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 200ms ease;
  border-radius: 10px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:hover .icon-wrapper {
    background-color: ${theme.palette.primary.main};
  }

  &:hover .material-symbols-rounded {
    color: ${theme.palette.primary.contrastText};
  }
`);

const IconWrapper = styled('span')(({ theme }) => `
  margin-right: ${theme.spacing(2)};
  background-color: rgba(0, 0, 0, 0.05);
  height: 60px;
  width: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease;
`);

const Icon = styled('span')(({ theme }) => `
  font-size: 2rem !important;
  transition: all 200ms ease;
`);

const TextContainer = styled('div')(({ theme }) => `
  max-width: 300px;
`);

const Label = styled(Typography)(({ theme }) => `
  font-weight: 800;
`);

const Description = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
  font-size: 0.9rem;
  line-height: 1.1rem;
`);

export const PortalTeam: React.FC = () => {
  const { team, members } = useTeam();

  return (
    <Container>
      <Title>Team</Title>
      <pre>{ JSON.stringify(team, null, 2) }</pre>
      <pre>{ JSON.stringify(members, null, 2) }</pre>
    </Container>
  )
}