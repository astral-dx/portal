import { Box, IconButton, styled, Tooltip, Typography } from "@mui/material";
import { mdiCrownCircle } from '@mdi/js';
import { Logout } from '@mui/icons-material';
import Icon from "@mdi/react";

import { useConsumerTeam, useUser } from "../../plugin";

const Container = styled('div')(({ theme }) => `
  align-items: center;
  display: flex;
  gap: ${theme.spacing(2)};
`);

const AvatarContainer = styled('div')(({ theme }) => `
  position: relative;
  display: flex;
  align-items: center;
`);

const Avatar = styled('img')(({ theme }) => `
  height: 40px;
  width: 40px;
  border-radius: 50%;
`);

const AdminIcon = styled(Icon)(({ theme }) => `
  position: absolute;
  bottom: -6px;
  right: -6px;
  background: white;
  border-radius: 50%;
  color: ${theme.palette.primary.main};
`);

const ProfileIDWrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-grow: 1;
  position: relative;
  top: -1px;
  text-align: right;
`);

const ProfileTeam = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
  font-weight: 600;
  font-size: 0.8rem;
`);

const ProfileName = styled(Typography)(({ theme }) => `
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`);

export const Profile: React.FC<{ logoutPath: string }> = ({ logoutPath }) => {
  const { user, isPortalAdmin } = useUser();
  const { team } = useConsumerTeam();

  return (
    <Container>
      { user && (
        <ProfileIDWrapper>
          <ProfileName>{ user.name || user.email }</ProfileName>
          { team && <ProfileTeam>{ team.name }</ProfileTeam> }
          { isPortalAdmin && <ProfileTeam>Admin</ProfileTeam> }
        </ProfileIDWrapper>
      ) }
      { user?.avatar && (
        <AvatarContainer>
          <Avatar src={user.avatar} />
          { isPortalAdmin && <AdminIcon path={ mdiCrownCircle } size={1} /> }
        </AvatarContainer>
      ) }
      <Box display={'flex'} gap={ 1 } paddingLeft={ 1 }>
        { user && (
          <Tooltip title="Logout" placement="bottom">
            <IconButton href={ logoutPath } color="secondary">
              <Logout />
            </IconButton>
          </Tooltip>
        ) }
      </Box>
    </Container>
  )
}