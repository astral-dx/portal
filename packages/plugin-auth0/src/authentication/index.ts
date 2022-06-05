import {
  AuthenticationPlugin,
  User,
} from '@astral-dx/core';
import { getSession } from '@auth0/nextjs-auth0';
import { JwtPayload } from 'jsonwebtoken';
import { createManagementClient } from './services/plugin-auth0';
import { getAllUsers } from './services/plugin-auth0/auth0Wrapper';

interface Auth0AuthenticationConfig {
  
};

export type IdToken = JwtPayload & { 
  'http://astral'?: {
    user_metadata?: {
      permissions?: string[],
      teamId?: string
    }
  }
}

export const initAuth0Authentication = (opts?: Auth0AuthenticationConfig): AuthenticationPlugin => {
  return {
    packageName: '@astral-dx/plugin-auth0',
    loginPath: '/api/auth/login',
    logoutPath: '/api/auth/logout',
    folders: {
      pages: './authentication/pages',
      services: './authentication/services',
    },
    deleteUser: async (id) => {
      const managementClient = createManagementClient();
      
      await managementClient.deleteUser({
        id
      });
    },
    getUser: async (req) => {
      const session = await getSession(req, {} as any);

      if (!session?.user) {
        return undefined;
      }

      const managementClient = createManagementClient();
      const allUsers = await getAllUsers(managementClient);
      const foundUser = allUsers.find(u => u.user_id === session.user.sub);

      if (!foundUser) {
        return undefined;
      }

      return {
        id: session.user.sub,
        email: session.user.email,
        permissions: foundUser.app_metadata?.permissions ?? [],
        name: foundUser.name,
        avatar: foundUser.picture ?? '',
      };
    },
    getAdminUsers: async () => {
      const managementClient = createManagementClient();
      const users = await managementClient.getUsers();
      
      return users
        .filter(user => (user.app_metadata?.permissions ?? []).includes('portal-admin'))
        .map((user) => ({
          id: user.user_id ?? '',
          email: user.email ?? '',
          permissions: user.app_metadata?.permissions ?? [],
          name: user.name,
          avatar: user.picture ?? '',
        }));
    },
    updateUser: async (id: string, update: Pick<User, 'permissions'>) => {
      const managementClient = createManagementClient();
      const allUsers = await getAllUsers(managementClient);
      const foundUser = allUsers.find(u => u.user_id === id);

      const updatedUser = await managementClient.updateAppMetadata({ id }, {
        teamId: foundUser?.app_metadata?.teamId,
        permissions: update.permissions,
      });

      return {
        id,
        email: updatedUser.email ?? '',
        permissions: updatedUser.user_metadata?.permissions ?? [],
        name: updatedUser.name,
        avatar: updatedUser.picture ?? ''
      }
    }
  }
}