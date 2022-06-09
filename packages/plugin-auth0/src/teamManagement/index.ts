import { Team, TeamManagementPlugin } from "@astral-dx/core";
import { getSession } from "@auth0/nextjs-auth0";
import jwt from "jsonwebtoken";
import { createManagementClient, generateId, decodeId } from "../authentication/services/plugin-auth0";
import { getAllClients, getAllUsers } from "./services/plugin-auth0/auth0Wrapper";

interface Auth0TeamManagementConfig {
  
};

export const initAuth0TeamManagement = (opts?: Auth0TeamManagementConfig): TeamManagementPlugin => {
  return {
    packageName: '@astral-dx/plugin-auth0',
    folders: {
      pages: './teamManagement/pages',
      services: './authentication/services',
    },
    createTeam: async ({ name }) => {
      const managementClient = await createManagementClient();

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
    },
    updateTeam: async ({ id, team }) => {
      throw new Error('not implemented');
    },
    deleteTeam: async ({ id }) => {
      const managementClient = await createManagementClient();

      // Delete all clients
      const clients = await getAllClients(managementClient);
      const teamClients = clients.filter(team => team.client_metadata?.teamId === id && team.client_metadata.isAstralApp === 'true');

      await Promise.all(teamClients.map(client => managementClient.deleteClient({ client_id: client.client_id ?? '' })));

      // Remove all users from team
      const allUsers = await getAllUsers(managementClient);
      const teamMembers = allUsers
        .filter(x => x.app_metadata?.teamId === id)
      
      await Promise.all(teamMembers.map(user => {
        if (!user.user_id) {
          return;
        }

        return managementClient.updateUser({ id: user.user_id }, { 
          app_metadata: {
            teamId: null
          }
        })
      }));
    },
    removeUserFromTeam: async ({ teamId, email }) => {
      const managementClient = await createManagementClient();
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
    },
    getUserTeam: async ({ ctx }) => {
      const session = await getSession(ctx.req, ctx.res);
      
      if (!session?.user) {
        return undefined;
      }
      
      const { email } = session.user;
      const managementClient = await createManagementClient();
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
    },
    getTeamInvitePath: async ({ teamId }) => {
      const inviteSigningSecret = process.env.AUTH0_TEAM_INVITE_SIGNING_SECRET;

      if (!inviteSigningSecret) {
        throw new Error('Environment variable AUTH0_TEAM_INVITE_SIGNING_SECRET not found');
      }

      const token = jwt.sign({ teamId }, inviteSigningSecret, { expiresIn: '24h' });

      return `/api/auth/login?teamToken=${token}`;
    },
    getAdminInvitePath: async () => {
      const inviteSigningSecret = process.env.AUTH0_ADMIN_INVITE_SIGNING_SECRET;

      if (!inviteSigningSecret) {
        throw new Error('Environment variable AUTH0_ADMIN_INVITE_SIGNING_SECRET not found');
      }

      const token = jwt.sign({}, inviteSigningSecret, { expiresIn: '1h' });

      return `/api/auth/login?adminToken=${token}`;
    },
    getTeams: async () => {
      const managementClient = await createManagementClient();
      
      // TODO: Page through clients
      const clients = await managementClient.getClients();
      const teamClients = clients
        .filter(client => client.client_metadata?.teamId !== '' && client.client_metadata?.isAstralApp === 'true')
      const allUsers = await getAllUsers(managementClient);

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
    }
  }
}