import { IncomingMessage } from "http";
import { PluginComponent } from "../index";

export type Permission = 'portal-admin' | string;

export interface User {
  id: string;
  name?: string;
  email: string;
  permissions: Permission[];
  avatar?: string;
}

export interface AuthenticationPlugin extends PluginComponent {
  loginPath: string;
  logoutPath: string;
  getUser: (req: IncomingMessage) => Promise<User | undefined>;
  updateUser: (id: string, user: User) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}

export * from './useUser';
export * from './withApiAuthRequired';
export * from './withPageAuthRequired';