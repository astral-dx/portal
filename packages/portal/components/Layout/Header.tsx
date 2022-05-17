import { useUser } from "@auth0/nextjs-auth0";
import { Link as MuiLink, Box, IconButton, styled, Switch, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import { usePlatformConfig } from "../../hooks/usePlatformConfig";
import { Card, CardTitle } from "./Card";
import { MadeWithAstral } from "../Button/MadeWithAstral";
import { useDemo } from "../../hooks/useDemo";
import { useTeam } from "../../hooks/useTeam";
import { EnvironmentName, useEnvironments } from "../../hooks/useEnvironments";
import { useState } from "react";
import { AutoAwesome, BugReport } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 500px;
  padding: ${theme.spacing(5)};
`);

const LogoWrapper = styled('div')(({ theme }) => `
  display: block;
  margin-bottom: ${theme.spacing(3)};
`);

const Logo = styled('img')(({ theme }) => `
  height: 40px;
`);

const Title = styled(Typography)(({ theme }) => `
  font-weight: 600;
  padding-bottom: ${theme.spacing(3)};
  color: ${theme.palette.primary.contrastText};
  font-size: 1rem;
`);

const Headline = styled(Typography)(({ theme }) => `
  font-weight: 800;
  padding-bottom: ${theme.spacing(2)};
  font-size: 2rem;
  color: ${theme.palette.primary.contrastText};
`);

const ProfileWrapper = styled('div')(({ theme }) => `
  /* padding: ${theme.spacing(3)}; */
  align-items: center;
  display: flex;
  gap: ${theme.spacing(3)};
`);

const ProfilePhoto = styled('img')(({ theme }) => `
  height: 50px;
  width: 50px;
  border-radius: 18px;
`);

const ProfileIDWrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(0.25)};
  overflow: hidden;
  flex-grow: 1;
`);

const ProfileTeam = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
  font-weight: 600;
`);

const ProfileName = styled(Typography)(({ theme }) => `
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`);

export const Header = () => {
  const { isDemo } = useDemo();
  const router = useRouter();
  const { logo, name, headline } = usePlatformConfig();
  const { user } = useUser();
  const { availableEnvironments, currentEnvironment, setEnvironment } = useEnvironments();
  const team = useTeam();
  const [isDemoOrPreview] = useState<boolean>(isDemo || router.route === '/preview')

  return (
    <Wrapper>
      <div>
        <Link shallow href="/">
          <MuiLink href="/">
            <LogoWrapper>
              { logo && <Logo src={logo} />}
            </LogoWrapper>
            <Title variant="h1">{name === '' ? 'Developer Plaftorm' : name}</Title>
          </MuiLink>
        </Link>
        <Headline variant="h2">{headline === '' ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' : headline}</Headline>
      </div>
      <div>
        <Card>
          <ProfileWrapper>
            { isDemoOrPreview && (
              <>
                <ProfilePhoto src={ '/demo/profile.jpg' } />
                <ProfileIDWrapper>
                  <ProfileName>{ "Neil Armstrong" }</ProfileName>
                <ProfileTeam>{ "NASA" }</ProfileTeam>
                </ProfileIDWrapper>
                <Box display={'flex'} gap={ 1 } paddingLeft={ 1 }>
                  <Tooltip title="Manage Team">
                    <IconButton color="secondary" aria-label="upload picture" component="a">
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Logout" placement="bottom">
                    <IconButton color="secondary" aria-label="upload picture" component="span">
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            ) }
            { !isDemoOrPreview && (
              <>
                { user && user.picture && (
                  <ProfilePhoto src={user.picture} />
                ) }
                { user  && (
                  <ProfileIDWrapper>
                    <ProfileName>{ user.name || user.email }</ProfileName>
                    { team && <ProfileTeam>{ team.name }</ProfileTeam> }
                  </ProfileIDWrapper>
                ) }
                <Box display={'flex'} gap={ 1 } paddingLeft={ 1 }>
                  { team && (
                    <Tooltip title="Manage Team">
                      <IconButton href="/settings" color="secondary" aria-label="upload picture" component="a">
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                  ) }
                  { user && (
                    <Tooltip title="Logout" placement="bottom">
                      <IconButton href="/api/auth/logout" color="secondary" aria-label="upload picture" component="a">
                        <LogoutIcon />
                      </IconButton>
                    </Tooltip>
                  ) }
                </Box>
              </>
            ) }
          </ProfileWrapper>
          { availableEnvironments.length > 1 && (
            <>
              <CardTitle sx={{ paddingBottom: 2, paddingTop: 3 }}>Environment</CardTitle>
              <ToggleButtonGroup
                color="primary"
                value={currentEnvironment}
                exclusive
                fullWidth
                onChange={(e, newEnv) => {
                  if (newEnv) { setEnvironment(newEnv) }
                }}
              >
                <ToggleButton color="secondary" value="PRODUCTION">
                  <AutoAwesome fontSize="small" color="secondary" sx={{ marginRight: 1 }} />
                  <Typography textTransform={'none'} variant="body2" fontWeight={800}>Production</Typography>
                </ToggleButton>
                <ToggleButton color="secondary" value="SANDBOX">
                  <BugReport fontSize="small" color="secondary" sx={{ marginRight: 1 }} />
                  <Typography textTransform={'none'} variant="body2" fontWeight={800}>Sandbox</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </>
          ) }
        </Card>
        <MadeWithAstral />
      </div>
    </Wrapper>
  );
}