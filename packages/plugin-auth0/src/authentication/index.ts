import {
  AuthenticationPlugin,
  User,
} from '@astral-dx/core';
import { getSession } from '@auth0/nextjs-auth0';

interface Auth0AuthenticationConfig {
  
};

export const initAuth0Authentication = ({

}: Auth0AuthenticationConfig): AuthenticationPlugin => {
  return {
    packageName: '@astral-dx/plugin-auth0',
    loginPath: '/api/auth/login',
    logoutPath: '',
    folders: {
      pages: './authentication/pages'
    },
    deleteUser: async (id) => {
      throw new Error('not implemented');
    },
    getUser: async (req) => {
      const session = await getSession(req, {} as any);

      if (!session?.user) {
        return undefined;
      }

      // Grab permissions
      return {
        id: session.user.email,
        email: session.user.email,
        permissions: [],
        name: session.user.name
      } as User;
    },
    updateUser: async (id: string, user: User) => {
      throw new Error('not implemented');
    }
  }
}