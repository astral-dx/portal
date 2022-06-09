import { IncomingMessage } from "http";
import { Permission, User } from "../authentication";
import { PluginComponent, PortalRequestContext } from "../index";

export interface TeamMember {
  email: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamManagementPlugin extends PluginComponent {
  createTeam: (opts: { ctx: PortalRequestContext, name: string }) => Promise<Team>;
  updateTeam: (opts: { ctx: PortalRequestContext, id: string, team: Team }) => Promise<Team>;
  deleteTeam: (opts: { ctx: PortalRequestContext, id: string }) => Promise<void>;
  removeUserFromTeam: (opts: { ctx: PortalRequestContext, teamId: string, email: string }) => Promise<void>;
  getTeams: (opts: { ctx: PortalRequestContext }) => Promise<Team[]>;
  getUserTeam: (opts: { ctx: PortalRequestContext }) => Promise<Team | undefined>;
  getTeamInvitePath: (opts: { ctx: PortalRequestContext, teamId: string }) => Promise<string>;
  getAdminInvitePath: (opts: { ctx: PortalRequestContext }) => Promise<string>;
}

export * from './useAdminTeams';
export * from './useConsumerTeam';