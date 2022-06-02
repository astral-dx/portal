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
  createTeam: (name: string, requestedBy: User) => Promise<Team>;
  updateTeam: (id: string, team: Team, requestedBy: User) => Promise<Team>;
  deleteTeam: (id: string, requestedBy: User) => Promise<void>;
  addUserToTeam: (teamId: string, email: string, requestedBy: User) => Promise<void>;
  removeUserFromTeam: (teamId: string, email: string, requestedBy: User) => Promise<void>;
  getTeams: (requestedBy: User) => Promise<Team[]>;
  getUserTeam: (req: IncomingMessage) => Promise<Team | undefined>;
  getTeamInviteLink: (teamId: string, permissions: Permission[], requestedBy: User) => Promise<string>;
}

export * from './useAdminTeams';
export * from './useConsumerTeam';