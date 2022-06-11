import { Credential, Environment } from "../plugin";


export const credentialService = {
  rotateCredential: async (
    oldCredential: Credential,
    teamId: string,
    opts?: { admin?: boolean },
  ): Promise<Credential | undefined> => {
    const shouldContinue = window.confirm('Are you sure you want to generate a new credential? This action may invalidate your current credential.');

    if (!shouldContinue) {
      return;
    }

    const response = await fetch(`/api${ opts?.admin ? '/admin' : '' }/team/${teamId}/credential/rotate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: oldCredential }),
    });

    if (response.status >= 400) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const { credential } = await response.json();
    return credential;
  },

  deleteCredentials: async (credentials: Credential[], teamId: string): Promise<undefined> => {
    const shouldContinue = window.confirm(`Are you sure you want to permanently delete ${credentials.length > 1 ? 'these credentials?' : 'this credential?' }`);

    if (!shouldContinue) {
      return;
    }

    const response = await fetch(`/api/admin/team/${teamId}/credential/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credentials }),
    });

    if (response.status >= 400) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  },

  createCredential: async (
    teamId: string,
    name: string,
    environment: Environment,
  ): Promise<Credential> => {
    const response = await fetch(`/api/admin//team/${teamId}/credential`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, environment }),
    });

    if (response.status >= 400) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const { credential } = await response.json();

    return credential;
  },
};