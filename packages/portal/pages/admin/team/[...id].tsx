import type { GetServerSidePropsResult, NextPage } from 'next';
import { getPlugin, Team, Credential, withPageAuthRequired, UserTable, AdminTeamDangerZone, AdminTeamCredentials, TeamHeader, teamManagementService, credentialService } from '@astral-dx/core';
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
            const link = await teamManagementService.generateInviteLink(team.id);
            copyToClipboard(link);
          } }
        />
        <UserTable
          onRemoveTeamMember={ async (member) => {
            await teamManagementService.removeTeamMember(team.id, member);

            setTeam({
              ...team,
              members: team.members.filter((m) => m.email !== member.email),
            });
          } }
          members={ team.members }
        />
        <AdminTeamDangerZone
          onRevokeCredentials={ async () => {
            await credentialService.deleteCredentials(credentials, team.id);
            setCredentials([]);
          } }
          onDeleteTeam={ async () => {
            await teamManagementService.deleteTeam(team.id);
            router.push('/admin');
          } }
        />
      </Main>
      <SideBar>
        <AdminTeamCredentials
          credentials={ credentials }
          onRotateCredential={ async (oldCredential) => {
            const newCredential = await credentialService.rotateCredential(oldCredential, team.id);

            if (newCredential) {
              setCredentials(credentials.map((credential) => {
                return isEqual(credential, oldCredential) ? newCredential : credential;
              }));
            }
          } }
          onDeleteCredential={ async (credential) => {
            await credentialService.deleteCredentials([credential], team.id);
            setCredentials(credentials.filter((c) => !isEqual(c, credential)));
          } }
        />
      </SideBar>
    </Container>
  )
}

export const getServerSideProps = withPageAuthRequired({
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

    const plugin = getPlugin();
  
    const user = await plugin.authentication.getUser(req);

    const [ teams, credentials ] = await Promise.all([
      user ? plugin.teamManagement.getTeams(user) : Promise.resolve([]),
      user ? plugin.credential.getTeamCredentials(id, user) : Promise.resolve([]),
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
