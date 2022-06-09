import { IncomingMessage } from "http";
import { PluginComponent, PortalRequestContext } from "../index";

export type Permission = 'portal-admin' | string;

export interface User {
  id: string;
  name?: string;
  email: string;
  permissions: Permission[];
  avatar?: string;
}

export interface AuthenticationPlugin extends PluginComponent {
  loginPath: (opts: { ctx: PortalRequestContext }) => Promise<string>;
  logoutPath: (opts: { ctx: PortalRequestContext }) => Promise<string>;
  getUser: (opts: { ctx: PortalRequestContext }) => Promise<User | undefined>;
  getAdminUsers: (opts: { ctx: PortalRequestContext }) => Promise<User[]>;
  updateUser: (opts: { ctx: PortalRequestContext, id: string, update: Pick<User, 'permissions'> }) => Promise<User>;
  deleteUser: (opts: { ctx: PortalRequestContext, id: string }) => Promise<void>;
}

export * from './useUser';
export * from './withApiAuthRequired';
export * from './withPageAuthRequired';