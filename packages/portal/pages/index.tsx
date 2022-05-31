import type { NextPage } from 'next';
import { withPageAuthRequired, References, Credentials, ConsumerTeamProvider, CredentialsProvider, getPlugin, ReferencesProvider, Team, User, Credential, Reference, UserTable, TeamHeader, Header, CredentialPicker, getEnvironments, TeamMember, teamManagementService, credentialService } from '@astral-dx/core';
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
                    const link = await teamManagementService.generateInviteLink(team.id);
                    copyToClipboard(link);
                  } }
                />
                <UserTable
                  members={ team.members }
                  onRemoveTeamMember={ async (member) => {
                    await teamManagementService.removeTeamMember(team.id, member);

                    setTeam({
                      ...team,
                      members: team.members.filter((m) => m.email !== member.email),
                    });
                  } }
                />
              </Box>
              <Credentials
                credentials={ credentials }
                environments={ getEnvironments(credentials) }
                onRotateCredential={ async (oldCredential) => {
                  const newCredential = await credentialService.rotateCredential(oldCredential, team.id);

                  if (newCredential) {
                    setCredentials(credentials.map((credential) => {
                      return isEqual(credential, oldCredential) ? newCredential : credential;
                    }));
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
    const { req } = context;
    
    const plugin = getPlugin();

    const [ user, team ] = await Promise.all([
      plugin.authentication.getUser(req),
      plugin.teamManagement.getUserTeam(req),
    ]);

    const [ credentials, references ] = await Promise.all([
      user && team ? plugin.credential.getTeamCredentials(team.id, user) : Promise.resolve([]),
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
