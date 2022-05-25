import type { GetServerSidePropsResult, NextPage } from 'next';
import { getPlugin, Team, withPageAuthRequired, AdminTeams, AdminTeamsProvider, getPackages, AdminConfiguration, Package, BetaBanner } from '@astral-dx/core';
import { styled } from '@mui/material';

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

interface AdminDashboardProps {
  teams: Team[];
  packages: Package[];
}

const AdminDashboard: NextPage<AdminDashboardProps> = ({ teams, packages }) => {
  return (
    <AdminTeamsProvider teams={ teams }>
      <Container>
        <Main>
          <BetaBanner />
          <AdminTeams />
        </Main>
        <SideBar>
          <AdminConfiguration packages={ packages } />
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
    
    const plugin = getPlugin();
    const [ teams ] = await Promise.all([
      plugin.teamManagement.getTeams(req),
    ]);

    const packages = getPackages();
  
    return { 
      props: {
        teams,
        packages,
      },
    };
  }
});

export default AdminDashboard
