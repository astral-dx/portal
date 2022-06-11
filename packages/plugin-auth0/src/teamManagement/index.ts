import { Team, TeamManagementPlugin } from "@astral-dx/core";
import { getSession } from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";

import { createManagementClient, generateId, decodeId } from "../services/plugin-auth0";
import { getAllClients, getAllUsers } from "../services/plugin-auth0/auth0Wrapper";

export const getUserTeam: TeamManagementPlugin['getUserTeam'] = async ({ ctx }) => {
  const session = await getSession(ctx.req, ctx.res);
  
  if (!session?.user) {
    return undefined;
  }
  
  const { email } = session.user;
  const managementClient = await createManagementClient('Production');
  const allUsers = await getAllUsers(managementClient);
  const user = allUsers.find(x => x.email === email);
  const { teamId } = user?.app_metadata ?? {};
  
  if (!teamId) {
    return undefined;
  };

  const teamMembers = allUsers
    .filter(x => x.app_metadata?.teamId === teamId)
    .map((user) => ({
      email: user.email ?? '',
    }));

  return {
    id: teamId,
    name: decodeId(teamId),
    members: teamMembers
  };
};

export const getTeams: TeamManagementPlugin['getTeams'] = async () => {
  const productionManagementClient = await createManagementClient('Production');
  const sandboxManagementClient = await createManagementClient('Sandbox');

  // TODO: Page through clients
  const [ productionClients, sandboxClients ] = await Promise.all([
    productionManagementClient.getClients(),
    sandboxManagementClient.getClients(),
  ]);
  const teamClients = [ ...productionClients, ...sandboxClients ]
    .filter(client => client.client_metadata?.teamId !== '' && client.client_metadata?.isAstralApp === 'true')
  const allUsers = await getAllUsers(productionManagementClient);

  return teamClients.reduce<Team[]>((acc, cur) => {
    const newArr = [...acc];
    const teamId = cur.client_metadata.teamId;
    const teamMembers = allUsers
      .filter(x => x.app_metadata?.teamId === teamId)
      .map((user) => ({
        id: user.user_id,
        email: user.email ?? '',
      }));
    
    if (!newArr.map(x => x.id).includes(teamId)) {
      newArr.push({
        id: teamId,
        name: decodeId(teamId),
        members: teamMembers
      })
    }

    return newArr;
  }, []);
};

export const createTeam: TeamManagementPlugin['createTeam'] = async ({ name }) => {
  const managementClient = await createManagementClient('Sandbox');

  // TODO: Make sure team with name/id doesn't exist
  
  const createdClient = await managementClient.createClient({
    name: name,
    app_type: 'non_interactive',
    client_metadata: {
      isAstralApp: 'true',
      teamId: generateId(name)
    }
  });

  // TODO: Grant client access to API
  
  return {
    id: createdClient.client_metadata.teamId,
    name: name,
    members: []
  }
}

export const updateTeam: TeamManagementPlugin['updateTeam'] = async ({ id, team }) => {
  throw new Error('not implemented');
}

export const deleteTeam: TeamManagementPlugin['deleteTeam'] = async ({ id }) => {
  const productionManagementClient = await createManagementClient('Production');
  const sandboxManagementClient = await createManagementClient('Sandbox');

  // Delete all clients
  const [ productionClients, sandboxClients ] = await Promise.all([
    productionManagementClient.getClients(),
    sandboxManagementClient.getClients(),
  ]);
  const teamProductionClients = productionClients.filter(team => team.client_metadata?.teamId === id && team.client_metadata.isAstralApp === 'true');
  const teamSandboxClients = sandboxClients.filter(team => team.client_metadata?.teamId === id && team.client_metadata.isAstralApp === 'true');

  await Promise.all([
    ...teamProductionClients.map(client => productionManagementClient.deleteClient({ client_id: client.client_id ?? '' })),
    ...teamSandboxClients.map(client => productionManagementClient.deleteClient({ client_id: client.client_id ?? '' })),
  ]);

  // Remove all users from team
  const allUsers = await getAllUsers(productionManagementClient);
  const teamMembers = allUsers
    .filter(x => x.app_metadata?.teamId === id)
  
  await Promise.all(teamMembers.map(user => {
    if (!user.user_id) {
      return;
    }

    return productionManagementClient.updateUser({ id: user.user_id }, { 
      app_metadata: {
        teamId: null
      }
    })
  }));
}

export const removeUserFromTeam: TeamManagementPlugin['removeUserFromTeam'] = async ({ teamId, email }) => {
  const managementClient = await createManagementClient('Production');
  const allUsers = await getAllUsers(managementClient);
  const user = allUsers.find(x => x.email === email);

  if (!user || !user.user_id) {
    return;
  }

  await managementClient.updateUser({ id: user.user_id }, {
    app_metadata: {
      teamId: null
    }
  });
}

export const getTeamInvitePath: TeamManagementPlugin['getTeamInvitePath'] = async ({ teamId }) => {
  const inviteSigningSecret = process.env.AUTH0_TEAM_INVITE_SIGNING_SECRET;

  if (!inviteSigningSecret) {
    throw new Error('Environment variable AUTH0_TEAM_INVITE_SIGNING_SECRET not found');
  }

  const token = jwt.sign({ teamId }, inviteSigningSecret, { expiresIn: '24h' });

  return `/api/auth/login?teamToken=${token}`;
}

export const getAdminInvitePath: TeamManagementPlugin['getAdminInvitePath'] = async () => {
  const inviteSigningSecret = process.env.AUTH0_ADMIN_INVITE_SIGNING_SECRET;

  if (!inviteSigningSecret) {
    throw new Error('Environment variable AUTH0_ADMIN_INVITE_SIGNING_SECRET not found');
  }

  const token = jwt.sign({}, inviteSigningSecret, { expiresIn: '1h' });

  return `/api/auth/login?adminToken=${token}`;
};
