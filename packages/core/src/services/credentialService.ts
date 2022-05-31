import { Credential } from "../plugin";


export const credentialService = {
  rotateCredential: async (credential: Credential, teamId: string): Promise<Credential | undefined> => {
    const shouldContinue = window.confirm('Are you sure you want to generate a new credential? This action may invalidate your current credential.');

    if (!shouldContinue) {
      return;
    }

    const response = await fetch(`/api/team/${teamId}/credential/rotate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    });

    return await response.json();
  },

  deleteCredentials: async (credentials: Credential[], teamId: string): Promise<undefined> => {
    const shouldContinue = window.confirm(`Are you sure you want to permanently delete ${credentials.length > 1 ? 'these credentials?' : 'this credential?' }`);

    if (!shouldContinue) {
      return;
    }

    await fetch(`/api/team/${teamId}/credential/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credentials }),
    });
  },
};