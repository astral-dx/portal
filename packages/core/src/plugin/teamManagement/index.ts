import { IncomingMessage } from "http";
import { Permission, User } from "../authentication";
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
  removeUserFromTeam: (teamId: string, email: string) => Promise<void>;
  getTeams: () => Promise<Team[]>;
  getUserTeam: (req: IncomingMessage) => Promise<Team | undefined>;
  getTeamInviteLink: (teamId: string) => Promise<string>;
  getAdminInviteLink: () => Promise<string>;
}

export * from './useAdminTeams';
export * from './useConsumerTeam';