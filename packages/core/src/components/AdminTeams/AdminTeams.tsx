import { IconButton, styled, Tooltip, Typography } from '@mui/material';
import { AccountCircle, AddLink, ChevronRight } from '@mui/icons-material';

import { useAdminTeams } from '../../plugin';
import { Card, CardHeader, CardTitle } from '../Card/Card';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';

const Container = styled(CardHeader)(({ theme }) => `
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
    <>
      { teams.map((team) => (
        <Card>
          <Container>
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
          </Container>
        </Card>
      )) }
    </>
  );
}