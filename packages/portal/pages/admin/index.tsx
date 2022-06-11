import type { GetServerSidePropsResult, NextPage } from 'next';
import { Team, withPageAuthRequired, AdminTeams, AdminTeamsProvider, getPackages, AdminConfiguration, Package, BetaBanner, Header, Button, teamManagementService, Card, CardBody, UserTable, User, authenticationService, useSnackbar } from '@astral-dx/core';
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
  const { enqueueSnackbar } = useSnackbar();
  const [teams, setTeams] = useState(initialTeams);
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers);
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const router = useRouter();

  const addTeam = async () => {
    try {
      const team = await teamManagementService.addTeam(teamName);
      enqueueSnackbar(`Added ${teamName}!`, { variant: 'success' });
      setTeams([ ...teams, team ]);

      setOpen(false);
      setTeamName('');

      router.push(`/admin/team/${team.id}`);
    } catch (e) {
      console.error(e);
      enqueueSnackbar(`Error adding ${teamName}, please try again`, { variant: 'error' });
    }
  }

  return (
    <>
      <AdminTeamsProvider teams={ teams }>
        <Container>
          <Main>
            <Box display={ 'flex' } flexDirection={ 'column' } gap={ 3 }>
              <Header
                title={ 'Admin Dashboard' }
                Action={ () => (
                  <Button
                    color="primary"
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
                  try {
                    const path = await teamManagementService.generateInvitePath(team.id, { admin: true });
                    const link = `${window.location.origin}${path}`;
                    copyToClipboard(link);
                    enqueueSnackbar(`${team.name} invite link has been copied to your clipboard!`, { variant: 'success' });
                  } catch (e) {
                    console.error(e);
                    enqueueSnackbar(`Error generating ${team.name} invite link, please try again`, { variant: 'error' });
                  }
                } }
              />
            </Box>
            <Box display={ 'flex' } flexDirection={ 'column' } gap={ 3 }>
              <Header
                title={ 'Portal Admins' }
                Action={ () => (
                  <Button
                    color="primary"
                    endIcon={ <AddLink /> }
                    onClick={ async () => {
                      try {
                        const path = await teamManagementService.generateAdminInvitePath();
                        const link = `${window.location.origin}${path}`;
                        copyToClipboard(link);
                        enqueueSnackbar('Your admin invite link has been copied to your clipboard!', { variant: 'success' });
                      } catch (e) {
                        console.error(e);
                        enqueueSnackbar('Error generating admin invite link, please try again', { variant: 'error' });
                      }
                    } }
                  >
                    Get Admin Invite Link
                  </Button>
                ) }
              />
              <UserTable
                onRemoveTeamMember={ async ({ email }) => {
                  try {
                    const user = adminUsers.find(u => u.email === email);
  
                    if (user) {
                      await authenticationService.unadminUser(user);
                      setAdminUsers(adminUsers.filter(u => u.email !== email));
                      enqueueSnackbar(`${email} has been removed as an admin`);
                    }
                  } catch (e) {
                    console.error(e);
                    enqueueSnackbar(`Error removing ${email} as an admin, please try again`, { variant: 'error' });
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

const config = $config;

export const getServerSideProps = withPageAuthRequired({
  config,
  redirectTo: '/',
  permissions: [ 'portal-admin' ],
  getServerSideProps: async (context): Promise<GetServerSidePropsResult<AdminDashboardProps>> => {
    const { req, res } = context;
    
    const ctx = { req, res, config };
    const user = await config.plugin.authentication.getUser({ ctx });

    const [ teams, adminUsers ] = await Promise.all([
      user ? config.plugin.teamManagement.getTeams({ ctx }) : Promise.resolve([]),
      user ? config.plugin.authentication.getAdminUsers({ ctx }) : Promise.resolve([]),
    ]);

    const packages = getPackages($config.plugin, $packageJson);
  
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
