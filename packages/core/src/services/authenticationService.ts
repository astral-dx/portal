import { User } from "../plugin";


export const authenticationService = {
  unadminUser: async (oldUser: User): Promise<Credential | undefined> => {
    const shouldContinue = window.confirm('Are you sure you want remove this user as a portal admin?');

    if (!shouldContinue) {
      return;
    }

    const response = await fetch(`/api/admin/user/${oldUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: { permissions: oldUser.permissions.filter(p => p !== 'portal-admin') }
      }),
    });

    if (response.status >= 400) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const { user } = await response.json();
    return user;
  },
};