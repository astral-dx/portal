import {
  AuthenticationPlugin,
  User,
} from '@astral-dx/core';
import { getSession } from '@auth0/nextjs-auth0';
import { decode, JwtPayload } from 'jsonwebtoken';

interface Auth0AuthenticationConfig {
  
};

type IdToken = JwtPayload & { 
  'http://astral'?: {
    user_metadata?: {
      permissions?: string[]
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
      throw new Error('not implemented');
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
      } as User;
    },
    updateUser: async (id: string, user: User) => {
      throw new Error('not implemented');
    }
  }
}