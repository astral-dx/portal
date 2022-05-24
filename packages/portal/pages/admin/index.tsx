import type { GetServerSidePropsResult, NextPage } from 'next';
import { getPlugin, Team, withPageAuthRequired, AdminTeams, AdminTeamsProvider } from '@astral-dx/core';
import { styled } from '@mui/material';

const Container = styled('div')(({ theme }) => `
  display: flex;
  gap: ${theme.spacing(6)};
`);

const Main = styled('main')(({ theme }) => `
  flex-basis: 67%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`);

const SideBar = styled('nav')(({ theme }) => `
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(6)};
`);

interface AdminDashboardProps {
  teams: Team[];
}

const AdminDashboard: NextPage<AdminDashboardProps> = ({ teams }) => {
  return (
    <AdminTeamsProvider teams={ teams }>
      <Container>
        <Main>
          <AdminTeams />
        </Main>
        <SideBar>

        </SideBar>
      </Container>
    </AdminTeamsProvider>
  )
}

export const getServerSideProps = withPageAuthRequired({
  redirectTo: '/',
  permissions: [ 'portal-admin' ],
  getServerSideProps: async (context): Promise<GetServerSidePropsResult<AdminDashboardProps>> => {
    const { req } = context;
    
    const plugin = await getPlugin();
    const [ teams ] = await Promise.all([
      plugin.teamManagement.getTeams(req),
    ]);
  
    return { 
      props: { teams },
     };
  }
});

export default AdminDashboard
