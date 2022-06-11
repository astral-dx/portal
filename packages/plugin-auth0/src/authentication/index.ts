import { AuthenticationPlugin } from '@astral-dx/core';
import { getSession } from '@auth0/nextjs-auth0';
import { JwtPayload } from 'jsonwebtoken';
import { createManagementClient } from '../services/plugin-auth0';
import { getAllUsers } from '../services/plugin-auth0/auth0Wrapper';

export type IdToken = JwtPayload & { 
  'http://astral'?: {
    user_metadata?: {
      permissions?: string[],
      teamId?: string
    }
  }
}

export const getUser: AuthenticationPlugin['getUser'] = async ({ ctx }) => {
  const session = await getSession(ctx.req, ctx.res);

  if (!session?.user) {
    return undefined;
  }

  const managementClient = createManagementClient('Production');
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
};

export const updateUser: AuthenticationPlugin['updateUser'] = async ({ id, update }) => {
  const managementClient = createManagementClient('Production');
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
};

export const deleteUser: AuthenticationPlugin['deleteUser'] = async ({ id }) => {
  const managementClient = createManagementClient('Production');
  
  await managementClient.deleteUser({
    id
  });
};

export const getAdminUsers: AuthenticationPlugin['getAdminUsers'] = async () => {
  const managementClient = createManagementClient('Production');
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
};
