import type { GetServerSidePropsResult, NextPage } from 'next';
import { Team, Credential, withPageAuthRequired, UserTable, AdminTeamDangerZone, AdminTeamCredentials, TeamHeader, teamManagementService, credentialService, useSnackbar, CardBody, Header, Button, Environment } from '@astral-dx/core';
import { Box, Card, Dialog, FormControlLabel, Radio, RadioGroup, styled, TextField } from '@mui/material';
import DefaultErrorPage from 'next/error';
import { useCopyToClipboard } from 'react-use';
import { useState } from 'react';
import { isEqual } from 'lodash';
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

interface AdminTeamDetailProps {
  team: Team | null;
  credentials: Credential[];
}

const AdminTeamDetail: NextPage<AdminTeamDetailProps> = ({ team: initialTeam, credentials: initialCredentials }) => {
  const [ _, copyToClipboard ] = useCopyToClipboard();
  const { enqueueSnackbar } = useSnackbar();
  const [ credentials, setCredentials ] = useState(initialCredentials);
  const [ team, setTeam ] = useState(initialTeam);
  const [open, setOpen] = useState(false);
  const [ newCredentialName, setNewCredentialName ] = useState('');
  const [ newCredentialEnvironment, setNewCredentialEnvironment ] = useState<Environment>('Sandbox');
  const router = useRouter();

  if (!team) {
    return <DefaultErrorPage statusCode={ 404 } />
  }

  const onCreateCredential = async () => {
    try {
      const credential = await credentialService.createCredential(team.id, newCredentialName, newCredentialEnvironment);
      enqueueSnackbar(`Created new ${newCredentialEnvironment.toLocaleLowerCase()} credential for ${team.name}!`, { variant: 'success' });
      setCredentials([ ...credentials, credential ]);
      router.push(`/admin/team/${team.id}`);

      setOpen(false);
      setNewCredentialName('');
      setNewCredentialEnvironment('Sandbox');
    } catch (e) {
      console.error(e);
      enqueueSnackbar(`Error creating ${newCredentialEnvironment.toLocaleLowerCase()} credential for ${team.name}, please try again`, { variant: 'error' });
    }
  }

  return (
    <>
      <Container>
        <Main>
          <TeamHeader 
            name={ team.name }
            id={ team.id }
            onGenerateInviteLink={ async () => {
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
          <UserTable
            onRemoveTeamMember={ async (member) => {
              try {
                await teamManagementService.removeTeamMember(team.id, member, { admin: true });
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
            members={ team.members }
          />
          <AdminTeamDangerZone
            onRevokeCredentials={ async () => {
              try {
                await credentialService.deleteCredentials(credentials, team.id);
                setCredentials([]);

                enqueueSnackbar(`Credetials for ${team.name} have been deleted`);
              } catch (e) {
                console.error(e);
                enqueueSnackbar(`Error deleting credetials for ${team.name}, please try again`, { variant: 'error' });
              }
            } }
            onDeleteTeam={ async () => {
              try {
                await teamManagementService.deleteTeam(team.id);
                router.push('/admin');

                enqueueSnackbar(`${team.name} has been deleted`);
              } catch (e) {
                console.error(e);
                enqueueSnackbar(`Error deleting ${team.name}, please try again`, { variant: 'error' });
              }
            } }
          />
        </Main>
        <SideBar>
          <AdminTeamCredentials
            credentials={ credentials }
            onRotateCredential={ async (oldCredential) => {
              const { name, environment } = oldCredential;
              const label = name ? `${name} (${environment})` : environment;

              try {
                const newCredential = await credentialService.rotateCredential(oldCredential, team.id, { admin: true });
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
            onDeleteCredential={ async (credential) => {
              const { name, environment } = credential;
              const label = name ? `${name} (${environment})` : environment;

              try {
                await credentialService.deleteCredentials([credential], team.id);
                setCredentials(credentials.filter((c) => !isEqual(c, credential)));

                enqueueSnackbar(`${label} credential has been deleted`);
              } catch (e) {
                console.error(e);
                enqueueSnackbar(`Error deleting ${label} credential, please try again`, { variant: 'error' });
              }
            } }
            onNewCredentialClicked={ () => setOpen(true) }
          />
        </SideBar>
      </Container>
        <Dialog
          open={ open }
          onClose={ () => setOpen(false) }
        >
          <Card>
            <CardBody sx={(theme) => ({ width: '100vw', maxWidth: '600px', gap: theme.spacing(3) })}>
              <Header title={ 'New Credential' } />
              <RadioGroup
                row
                value={ newCredentialEnvironment }
                onChange={ (e) => setNewCredentialEnvironment(e.target.value as Environment) }
              >
                <FormControlLabel label={'Sandbox'} value={'Sandbox'} control={<Radio />} />
                <FormControlLabel label={'Production'} value={'Production'} control={<Radio />} />
              </RadioGroup>
              <TextField label='Credential Name' onChange={ (e) => setNewCredentialName(e.target.value) } />
              <Box display={ 'flex' } justifyContent={ 'flex-end' }>
                <Button
                  disabled={ !newCredentialName }
                  color="primary"
                  onClick={ onCreateCredential }
                >
                  Create Credential
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
  getServerSideProps: async (context): Promise<GetServerSidePropsResult<AdminTeamDetailProps>> => {
    const { req, res, params } = context;

    let id: string | undefined;

    if (params && params.id && Array.isArray(params.id)) {
      id = params.id[0];
    }

    if (!id) {
      return {
        props: {
          team: null,
          credentials: [],
        }
      }
    }

    const ctx = { req, res, config };
    const [ teams, credentials ] = await Promise.all([
      config.plugin.teamManagement.getTeams({ ctx }),
      config.plugin.credential.getTeamCredentials({ ctx, teamId: id }),
    ]);

    return {
      props: {
        team: teams.find((t) => t.id === id) || null,
        credentials,
      },
    };
  }
});

export default AdminTeamDetail;
