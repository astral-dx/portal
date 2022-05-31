import type { GetServerSidePropsResult, NextPage } from 'next';
import { getPlugin, Team, withPageAuthRequired, AdminTeams, AdminTeamsProvider, getPackages, AdminConfiguration, Package, BetaBanner, Header, Button, teamManagementService, Card, CardBody, UserTable, User, authenticationService } from '@astral-dx/core';
import { Box, Dialog, styled, TextField } from '@mui/material';
import { Add, AddLink } from '@mui/icons-material';
import { useCopyToClipboard } from 'react-use';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
  gap: ${theme.spacing(3)};
`);

interface AdminDashboardProps {
  teams: Team[];
  adminUsers: User[];
  packages: Package[];
}

const AdminDashboard: NextPage<AdminDashboardProps> = ({ teams: initialTeams, adminUsers: initialAdminUsers, packages }) => {
  const [ _, copyToClipboard ] = useCopyToClipboard();
  const [teams, setTeams] = useState(initialTeams);
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const router = useRouter();

  const addTeam = async () => {
    const team = await teamManagementService.addTeam(teamName);

    setTeams([ ...teams, team ]);
    setOpen(false);
    setTeamName('');
    router.push(`/admin/teams/${team.id}`);
  }

  return (
    <>
      <AdminTeamsProvider teams={ teams }>
        <Container>
          <Main>
            <Box display={ 'flex' } flexDirection={ 'column' } gap={ 3 }>
              <Header
                title={ 'Admin Dashbaord' }
                Action={ () => (
                  <Button
                    color="secondary"
                    endIcon={ <Add /> }
                    onClick={ () => setOpen(true) }
                  >
                    Add Team
                  </Button>
                ) }
              />
              <AdminTeams
                teams={ teams }
                onGenerateInviteLink={ async (team) => {
                  const link = await teamManagementService.generateInviteLink(team.id, []);
                  copyToClipboard(link);
                } }
              />
            </Box>
            <Box display={ 'flex' } flexDirection={ 'column' } gap={ 3 }>
              <Header
                title={ 'Portal Admins' }
                Action={ () => (
                  <Button
                    color="secondary"
                    endIcon={ <AddLink /> }
                    onClick={ async () => {
                      const link = await teamManagementService.generateInviteLink('admin', ['portal-admin']);
                      copyToClipboard(link);
                    } }
                  >
                    Get Admin Invite Link
                  </Button>
                ) }
              />
              <UserTable
                onRemoveTeamMember={ async ({ email }) => {
                  const user = adminUsers.find(u => u.email === email);

                  if (user) {
                    await authenticationService.unadminUser(user);
                    setAdminUsers(adminUsers.filter(u => u.email !== email));
                  }
                } }
                members={ adminUsers.map(u => ({ email: u.email })) }
              />
            </Box>
          </Main>
          <SideBar>
            <BetaBanner />
            <AdminConfiguration packages={ packages } />
          </SideBar>
        </Container>
      </AdminTeamsProvider>
      <Dialog
        open={ open }
        onClose={ () => setOpen(false) }
      >
        <Card>
          <CardBody sx={(theme) => ({ width: '100vw', maxWidth: '600px', gap: theme.spacing(3) })}>
            <Header title={ 'Add Team' } />
            <TextField label='Team Name' onChange={ (e) => setTeamName(e.target.value) } />
            <Box display={ 'flex' } justifyContent={ 'flex-end' }>
              <Button
                disabled={ !teamName }
                color="primary"
                onClick={ addTeam }
              >
                Add Team
              </Button>
            </Box>
          </CardBody>
        </Card>
      </Dialog>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  redirectTo: '/',
  permissions: [ 'portal-admin' ],
  getServerSideProps: async (context): Promise<GetServerSidePropsResult<AdminDashboardProps>> => {
    const { req } = context;
    
    const plugin = getPlugin();

    const user = await plugin.authentication.getUser(req);

    const [ teams, adminUsers ] = await Promise.all([
      user ? plugin.teamManagement.getTeams(user) : Promise.resolve([]),
      user ? plugin.authentication.getAdminUsers(user) : Promise.resolve([]),
    ]);

    const packages = getPackages();
  
    return { 
      props: {
        teams,
        adminUsers,
        packages,
      },
    };
  }
});

export default AdminDashboard
