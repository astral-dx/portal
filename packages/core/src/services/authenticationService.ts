import { User } from "../plugin";


export const authenticationService = {
  unadminUser: async (user: User): Promise<Credential | undefined> => {
    const shouldContinue = window.confirm('Are you sure you want remove this user as a portal admin?');

    if (!shouldContinue) {
      return;
    }

    const response = await fetch(`/api/user/${user.email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: { ...user, permissions: user.permissions.filter(p => p !== 'portal-admin') }
      }),
    });

    return await response.json();
  },
};