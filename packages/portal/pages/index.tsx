import type { NextPage } from 'next';
import { withPageAuthRequired, References, Credentials, ConsumerTeamProvider, CredentialsProvider, getPlugin, ReferencesProvider, Team, User, Credential, Reference, UserTable, TeamHeader, Header, CredentialPicker, getEnvironments, TeamMember, teamManagementService, credentialService, useSnackbar } from '@astral-dx/core';
import { styled } from '@mui/material';
import { GetServerSidePropsResult } from 'next';
import { Box } from '@mui/system';
import { useCopyToClipboard } from 'react-use';
import { useState } from 'react';
import { isEqual } from 'lodash';
import DefaultErrorPage from 'next/error';

const Container = styled('div')(({ theme }) => `
  display: flex;
  gap: ${theme.spacing(6)};
`);

const Main = styled('main')(({ theme }) => `
  flex-basis: 67%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(6)};
`);

const SideBar = styled('nav')(({ theme }) => `
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(6)};
`);

interface DashboardProps {
  team?: Team;
  credentials: Credential[];
  references: Reference[];
}

const Dashboard: NextPage<DashboardProps> = ({ team: initialTeam, credentials: initialCredentials, references }) => {
  const [ _, copyToClipboard ] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const [ credentials, setCredentials ] = useState(initialCredentials);
  const [ team, setTeam ] = useState(initialTeam);

  if (!team) {
    return <DefaultErrorPage statusCode={ 404 } />
  }

  return (
    <ConsumerTeamProvider team={ team }>
      <CredentialsProvider credentials={ credentials }>
        <ReferencesProvider references={ references }>
          <Container>
            <Main>
              <Box display={ 'flex' } flexDirection={ 'column' } gap={ 3 }>
                <TeamHeader 
                  name={ team.name }
                  id={ team.id }
                  onGenerateInviteLink={ async () => {
                    try {
                      const path = await teamManagementService.generateInvitePath(team.id);
                      const link = `${window.location.origin}${path}`;
                      copyToClipboard(link);
                      enqueueSnackbar('Your invite link has been copied to your clipboard!', { variant: 'success' });
                    } catch (e) {
                      console.error(e);
                      enqueueSnackbar('Error generating invite link, please try again', { variant: 'error' });
                    }
                  } }
                />
                <UserTable
                  members={ team.members }
                  onRemoveTeamMember={ async (member) => {
                    try {
                      await teamManagementService.removeTeamMember(team.id, member);
                      setTeam({
                        ...team,
                        members: team.members.filter((m) => m.email !== member.email),
                      });

                      enqueueSnackbar(`${member.email} has been removed from your team`);
                    } catch (e) {
                      console.error(e);
                      enqueueSnackbar(`Error removing ${member.email} from your team, please try again`, { variant: 'error' });
                    }
                  } }
                />
              </Box>
              <Credentials
                credentials={ credentials }
                environments={ getEnvironments(credentials) }
                onRotateCredential={ async (oldCredential) => {
                  const { name, environment } = oldCredential;
                  const label = name ? `${name} (${environment})` : environment;

                  try {
                    const newCredential = await credentialService.rotateCredential(oldCredential, team.id);

                    if (newCredential) {
                      setCredentials(credentials.map((credential) => {
                        return isEqual(credential, oldCredential) ? newCredential : credential;
                      }));
                    }

                    enqueueSnackbar(`${label} credential has been rotated`, { variant: 'success' });
                  } catch (e) {
                    console.error(e);
                    enqueueSnackbar(`Error rotating ${label} credential, please try again`, { variant: 'error' });
                  }
                } }
              />
            </Main>
            <SideBar>
              <References />
            </SideBar>
          </Container>
        </ReferencesProvider>
      </CredentialsProvider>
    </ConsumerTeamProvider>
  )
}

export const getServerSideProps = withPageAuthRequired({
  redirectTo: '/unauthorized',
  permissions: [],
  getServerSideProps: async (context): Promise<GetServerSidePropsResult<DashboardProps>> => {
    const { req, res } = context;
    
    const plugin = getPlugin();

    const [ user, team ] = await Promise.all([
      plugin.authentication.getUser(req),
      plugin.teamManagement.getUserTeam(req),
    ]);

    if (user && user.permissions.includes('portal-admin')) {
      return {
        props: {} as any,
        redirect: {
          permanent: false,
          destination: '/admin',
        }
      }
    }

    const [ credentials, references ] = await Promise.all([
      user && team ? plugin.credential.getTeamCredentials(team.id) : Promise.resolve([]),
      plugin.references.getReferences(),
    ]);
  
    return { 
      props: {
        team,
        credentials,
        references,
      }
     };
  }
});

export default Dashboard
