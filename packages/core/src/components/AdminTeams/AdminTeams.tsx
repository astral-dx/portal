import { IconButton, styled, Tooltip, Typography } from '@mui/material';
import { AccountCircle, AddLink, ChevronRight, Add } from '@mui/icons-material';

import { useAdminTeams } from '../../plugin';
import { Card, CardHeader, CardTitle } from '../Card/Card';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Button } from '../Button/Button';

const Container = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`);

const Header = styled('div')(({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing(0, 0, 0, 2)};
`);

const Title = styled(Typography)(({ theme }) => `
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1.28px;
  font-weight: 800;
  color: ${theme.palette.text.secondary};
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
`);

export const AdminTeams: React.FC = () => {
  const { teams } = useAdminTeams();
  const [ _, copyToClipboard ] = useCopyToClipboard();
  const [ isLoading, setIsLoading ] = useState(false);

  const generateInviteLink = async () => {
    setIsLoading(true);

    const response = await fetch('/api/team/invite-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const { link } = await response.json();
    copyToClipboard(link);
    
    setIsLoading(false);
  }

  return (
    <Container>
      <Header>
        <Title>Teams</Title>
        <Button endIcon={ <Add /> } color="secondary">New Team</Button>
      </Header>
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
                <IconButton onClick={ generateInviteLink }>
                  <AddLink />
                </IconButton>
              </Tooltip>
              <Tooltip title="Team Details">
                <IconButton>
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