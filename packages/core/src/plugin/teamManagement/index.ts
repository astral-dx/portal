import { IncomingMessage } from "http";
import { User } from "../authentication";
import { PluginComponent } from "../index";

export type TeamType = 'portal-consumer' | 'portal-owner';

export interface Team {
  id: string;
  name: string;
  permissions: string[];
  type: TeamType;
}

export interface TeamManagementPlugin extends PluginComponent {
  createTeam: (name: string) => Promise<Team>;
  updateTeam: (id: string, team: Team) => Promise<Team>;
  deleteTeam: (id: string) => Promise<void>;
  addUserToTeam: (teamId: string, email: string) => Promise<void>;
  removeUserFromTeam: (teamId: string, email: string) => Promise<void>;
  getUserTeam: (req: IncomingMessage) => Promise<Team>;
  getUserTeamMembers: (req: IncomingMessage) => Promise<User[]>;
  getTeamInviteLink: (team: Team, email: string, permissions: string[]) => Promise<string>;
}

export * from './useTeam';