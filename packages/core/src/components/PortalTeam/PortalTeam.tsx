import { Box, Chip, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { AddLink, MoreHoriz } from '@mui/icons-material';

import { User, useTeam } from "../../plugin";
import { Card, CardHeader } from "../Card/Card";
import { MemberActionsMenu } from "./MemberActionsMenu";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";

const TeamName = styled(Typography)(({ theme }) => `
  font-weight: 800;
`);

const TeamID = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
`);

const MembersContainer = styled('div')(({ theme }) => `
  padding: ${theme.spacing(0, 2)};
`);

export const PortalTeam: React.FC = () => {
  const { team, members, removeTeamMember } = useTeam();
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

  const onRemoveTeamMember = async (member: User) => {
    const shouldRemove = window.confirm(`Are you sure you want to remove ${member.email} as a member of your team?`);

    if (!shouldRemove) {
      return;
    }

    setIsLoading(true);

    const response = await fetch('/api/team/member?' + new URLSearchParams({ email: member.email }), {
      method: 'DELETE',
    });

    if (response.status === 204) {
      removeTeamMember(member);
    }
    
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <TeamName>
            { team?.name }
          </TeamName>
          <TeamID variant="caption">{ team?.id }</TeamID>
        </div>
        <Box display={'flex'} gap={ 1 } paddingLeft={ 1 }>
          { team && (
            <Tooltip title="Generate Invite Link">
              <IconButton onClick={ generateInviteLink }>
                <AddLink />
              </IconButton>
            </Tooltip>
          ) }
        </Box>
      </CardHeader>
      <MembersContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& td, th': { fontWeight: 600, borderColor: 'rgba(0, 0, 0, 0.05)' } } }>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Permissions</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={ member.email }
                sx={{ '& td, th': { borderColor: 'rgba(0, 0, 0, 0.05)' }, '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{ member.name }</TableCell>
                <TableCell>{ member.email }</TableCell>
                <TableCell align="right">{ member.permissions.map(p => <Chip label={ p } />) }</TableCell>
                <TableCell align="right">
                  <MemberActionsMenu onRemoveTeamMember={ () => onRemoveTeamMember(member) } />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MembersContainer>
    </Card>
  )
}