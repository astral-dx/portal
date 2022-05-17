import { IncomingMessage } from "http";

export interface User {
  id: string;
  name?: string;
  email: string;
  permissions: string[];
}

export interface AuthenticationPlugin {
  loginPath: string;
  logoutPath: string;
  getUser: (req: IncomingMessage) => Promise<User | undefined>;
  updateUser: (id: string, user: User) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  internal?: any;
}

