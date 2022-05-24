import { IncomingMessage } from "http";
import { PluginComponent } from "../index";

export interface TeamMember {
  email: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamManagementPlugin extends PluginComponent {
  createTeam: (name: string) => Promise<Team>;
  updateTeam: (id: string, team: Team) => Promise<Team>;
  deleteTeam: (id: string) => Promise<void>;
  addUserToTeam: (teamId: string, email: string) => Promise<void>;
  removeUserFromTeam: (req: IncomingMessage) => Promise<void>;
  getTeams: (req: IncomingMessage) => Promise<Team[]>;
  getUserTeam: (req: IncomingMessage) => Promise<Team | undefined>;
  getTeamInviteLink: (req: IncomingMessage) => Promise<string>;
}

export * from './useAdminTeams';
export * from './useConsumerTeam';