import { getPlugin, Team, TeamManagementPlugin } from "@astral-dx/core";
import { getSession } from "@auth0/nextjs-auth0";
import { AppMetadata } from "auth0";
import { decode } from "jsonwebtoken";
import { IdToken } from "../authentication";
import { createManagementClient, generateId, decodeId } from "../utils";
import { getAllClients, getAllUsers } from "../utils/auth0Wrapper";

interface Auth0TeamManagementConfig {
  
};

export const initAuth0TeamManagement = ({

}: Auth0TeamManagementConfig): TeamManagementPlugin => {
  return {
    packageName: '@astral-dx/plugin-auth0',
    createTeam: async (name: string) => {
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
    updateTeam: async (id: string, team: Team) => {
      throw new Error('not implemented');
    },
    deleteTeam: async (id: string) => {
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
    removeUserFromTeam: async (teamId: string, email: string) => {
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
    getUserTeam: async (req) => {
      const session = await getSession(req, {} as any);
      
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
    getTeamInviteLink: async (req) => {
      throw new Error('not implemented');
    },
    getTeams: async (req) => {
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