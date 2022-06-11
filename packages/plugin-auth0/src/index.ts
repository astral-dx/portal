import { AuthenticationPlugin, CredentialPlugin, TeamManagementPlugin } from "@astral-dx/core";
import { getUser, updateUser, deleteUser, getAdminUsers } from './authentication';
import { Auth0CredentialConfig, createCredential, deleteCredentials, getTeamCredentials, rotateCredential } from "./credential";
import { createTeam, deleteTeam, getAdminInvitePath, getTeamInvitePath, getTeams, getUserTeam, removeUserFromTeam, updateTeam } from "./teamManagement";

const packageName = '@astral-dx/plugin-auth0';

export const initAuth0Authentication = (): AuthenticationPlugin => ({
  packageName,
  folders: {
    pages: './authentication-pages',
  },
  loginPath: async () => '/api/auth/login',
  logoutPath: async () =>  '/api/auth/logout',
  getUser,
  updateUser,
  deleteUser,
  getAdminUsers,
});

export const initAuth0Credential = ({ audiences }: Auth0CredentialConfig): CredentialPlugin => ({
  packageName,
  getTeamCredentials,
  createCredential: (opts) => createCredential(opts, audiences),
  rotateCredential,
  deleteCredentials,
});

export const initAuth0TeamManagement = (): TeamManagementPlugin => ({
  packageName,
  folders: {
    pages: './teamManagement-pages',
    services: './services',
  },
  getUserTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  removeUserFromTeam,
  getTeamInvitePath,
  getAdminInvitePath,
});