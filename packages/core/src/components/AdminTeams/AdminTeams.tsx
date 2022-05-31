import { IconButton, styled, Tooltip, Typography } from '@mui/material';
import { AccountCircle, AddLink, ChevronRight } from '@mui/icons-material';

import { Team } from '../../plugin';
import { Card, CardBody, CardHeader, CardTitle } from '../Card/Card';
import { SectionTitle } from '../SectionTitle/SectionTitle';

const Container = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`);

const Header = styled('div')(({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing(0, 0, 0, 2)};
`);

const TeamContainer = styled(CardHeader)(({ theme }) => `
  border: none;
`);

const TeamID = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
`);

const StatContainer = styled('div')(({ theme }) => `
  display: flex;
  align-items: center;
  gap: ${theme.spacing(4)};
`);

const Stat = styled('div')(({ theme }) => `
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  font-weight: 800;
  color: ${theme.palette.text.secondary};
`);

interface AdminTeamsProps {
  teams: Team[];
  onGenerateInviteLink: (team: Team) => void;
}

export const AdminTeams: React.FC<AdminTeamsProps> = ({ teams, onGenerateInviteLink }) => {
  return (
    <Container>
      <Header>
        <SectionTitle>Teams</SectionTitle>
      </Header>
      { teams.length === 0 && (
        <Card>
          <CardBody sx={{ textAlign: 'center' }}>
            <Typography sx={(theme) => ({ color: theme.palette.text.secondary })}>
              No teams yet, create one to get started!
            </Typography>
          </CardBody>
        </Card>
      ) }
      { teams.map((team) => (
        <Card key={ team.id }>
          <TeamContainer>
            <div>
              <CardTitle>{ team.name }</CardTitle>
              <TeamID variant='caption'>{ team.id }</TeamID>
            </div>
            <StatContainer>
              <Tooltip title={ `${team.members.length} team members` }>
                <Stat>
                  { team.members.length }
                  <AccountCircle />
                </Stat>
              </Tooltip>
              <Tooltip title="Generate Invite Link">
                <IconButton onClick={ () => onGenerateInviteLink(team) }>
                  <AddLink />
                </IconButton>
              </Tooltip>
              <Tooltip title="Team Details">
                <IconButton href={ `/admin/team/${team.id}` }>
                  <ChevronRight />
                </IconButton>
              </Tooltip>
            </StatContainer>
          </TeamContainer>
        </Card>
      )) }
    </Container>
  );
}