import { getPlugin, Team, TeamManagementPlugin } from "@astral-dx/core";
import { getSession } from "@auth0/nextjs-auth0";
import { decode } from "jsonwebtoken";
import { IdToken } from "../authentication";
import { createManagementClient, generateId, decodeId } from "../utils";

interface Auth0TeamManagementConfig {
  
};

export const initAuth0TeamManagement = ({

}: Auth0TeamManagementConfig): TeamManagementPlugin => {
  return {
    packageName: '@astral-dx/plugin-auth0',
    createTeam: async (name: string) => {
      const managementClient = await createManagementClient();

      const clients = await managementClient.getClients();

      return {
        id: '',
        name: name,
        members: []
      }
    },
    updateTeam: async (id: string, team: Team) => {
      throw new Error('not implemented');
    },
    deleteTeam: async (id: string) => {
      throw new Error('not implemented');
    },
    addUserToTeam: async (teamId: string, email: string) => {
      throw new Error('not implemented');
    },
    removeUserFromTeam: async (req) => {
      throw new Error('not implemented');
      return;
    },
    getUserTeam: async (req) => {
      const session = await getSession(req, {} as any);

      if (!session?.user) {
        return undefined;
      }
      const idToken = await decode(session.idToken ?? '') as IdToken;
      const { teamId } = idToken["http://astral"]?.user_metadata ?? {};

      if (!teamId) {
        throw new Error('User has no team');
      };

      // TODO: grab all team members with teamId

      return {
        id: teamId,
        name: decodeId(teamId),
        members: []
      };
    },
    getTeamInviteLink: async (req) => {
      throw new Error('not implemented');
    },
    getTeams: async (req) => {
      const managementClient = await createManagementClient();
      
      const clients = await managementClient.getClients({ fields: ['isAstralClient', 'teamId'] });

      console.log(clients);

      return []
    }
  }
}