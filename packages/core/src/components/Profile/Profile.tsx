import { styled, Typography } from "@mui/material";

import { useTeam, useUser } from "../../plugin";

const Container = styled('div')(({ theme }) => `
  align-items: center;
  display: flex;
  gap: ${theme.spacing(2)};
`);

const Avatar = styled('img')(({ theme }) => `
  height: 40px;
  width: 40px;
  border-radius: 50%;
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

export const Profile = () => {
  const { user } = useUser();
  const { team } = useTeam();

  return (
    <Container>
      {/* <Box display={'flex'} gap={ 1 } paddingLeft={ 1 }>
        { user && (
          <Tooltip title="Logout" placement="bottom">
            <IconButton href="/api/auth/logout" color="secondary" aria-label="upload picture" component="a">
              <KeyboardArrowDown />
            </IconButton>
          </Tooltip>
        ) }
      </Box> */}
      { user && (
        <ProfileIDWrapper>
          <ProfileName>{ user.name || user.email }</ProfileName>
          { team && <ProfileTeam>{ team.name }</ProfileTeam> }
        </ProfileIDWrapper>
      ) }
      { user?.avatar && (
        <Avatar src={user.avatar} />
      ) }
    </Container>
  )
}