import type { NextPage } from 'next';
import { withPageAuthRequired, References, Credentials, ConsumerTeam, ConsumerTeamProvider, CredentialsProvider, getPlugin, ReferencesProvider, Team, User, Credential, Reference } from '@astral-dx/core';
import { styled } from '@mui/material';
import { GetServerSidePropsResult } from 'next';

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

const Dashboard: NextPage<DashboardProps> = ({ team, credentials, references }) => {
  return (
    <ConsumerTeamProvider team={ team }>
      <CredentialsProvider credentials={ credentials }>
        <ReferencesProvider references={ references }>
          <Container>
            <Main>
              <Credentials />
              <ConsumerTeam />
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
    const [ team, credentials, references ] = await Promise.all([
      plugin.teamManagement.getUserTeam(req),
      plugin.credential.getUserCredentials(req),
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
