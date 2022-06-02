import {
  AuthenticationPlugin,
  User,
} from '@astral-dx/core';
import { getSession } from '@auth0/nextjs-auth0';
import { decode, JwtPayload } from 'jsonwebtoken';
import { createManagementClient } from '../utils';

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

export const initAuth0Authentication = ({

}: Auth0AuthenticationConfig): AuthenticationPlugin => {
  return {
    packageName: '@astral-dx/plugin-auth0',
    loginPath: '/api/auth/login',
    logoutPath: '/api/auth/logout',
    folders: {
      pages: './authentication/pages'
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

      // TODO: change to verify?
      const idToken = await decode(session.idToken ?? '') as IdToken;

      // Grab permissions
      return {
        id: session.user.email,
        email: session.user.email,
        permissions: idToken['http://astral']?.user_metadata?.permissions ?? [],
        name: session.user.name,
        avatar: session.user.picture ?? ''
      };
    },
    updateUser: async (id: string, user: User) => {
      const managementClient = createManagementClient();
      const updatedUser = await managementClient.updateUser({
        id
      }, {
        email: user.email,
        name: user.name,
        user_metadata: {
          permissions: user.permissions
        }
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