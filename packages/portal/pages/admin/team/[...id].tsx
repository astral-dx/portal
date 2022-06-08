import type { GetServerSidePropsResult, NextPage } from 'next';
import { Team, Credential, withPageAuthRequired, UserTable, AdminTeamDangerZone, AdminTeamCredentials, TeamHeader, teamManagementService, credentialService, useSnackbar } from '@astral-dx/core';
import { styled } from '@mui/material';
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
  const router = useRouter();

  if (!team) {
    return <DefaultErrorPage statusCode={ 404 } />
  }

  return (
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
        />
      </SideBar>
    </Container>
  )
}

export const getServerSideProps = withPageAuthRequired({
  plugin: $config.plugin,
  redirectTo: '/',
  permissions: [ 'portal-admin' ],
  getServerSideProps: async (context): Promise<GetServerSidePropsResult<AdminTeamDetailProps>> => {
    const { req, params } = context;

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

    const plugin = $config.plugin;
  
    const [ teams, credentials ] = await Promise.all([
      plugin.teamManagement.getTeams(),
      plugin.credential.getTeamCredentials(id),
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
