import { IncomingMessage } from "http";
import { User } from "./authentication";

export type TeamType = 'portal-consumer' | 'portal-owner';

export interface Team {
  id: string;
  name: string;
  permissions: string[];
  type: TeamType;
}

export interface TeamManagementPlugin {
  createTeam: (name: string) => Promise<Team>;
  updateTeam: (id: string, team: Team) => Promise<Team>;
  deleteTeam: (id: string) => Promise<void>;
  addUserToTeam: (teamId: string, email: string) => Promise<void>;
  removeUserFromTeam: (teamId: string, email: string) => Promise<void>;
  getUserTeams: (req: IncomingMessage) => Promise<Team[]>;
  getTeamUsers: (id: string) => Promise<User[]>;
  getTeamInviteLink: (team: Team, email: string, permissions: string[]) => Promise<string>;
}

