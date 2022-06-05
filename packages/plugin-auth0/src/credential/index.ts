import { CredentialPlugin } from '@astral-dx/core';
import { Client } from 'auth0';
import axios from 'axios';
import { createManagementClient } from './services/plugin-auth0';

interface Auth0CredentialConfig {
  audiences: string[],
};

export const initAuth0Credential = (opts: Auth0CredentialConfig): CredentialPlugin => {
  return {
    packageName: '@astral-dx/plugin-auth0',
    folders: {
      services: './credential/services',
    },
    createCredential: async (team, environment) => {
      const managementClient = createManagementClient();
      const credential = await managementClient.createClient({
        name: team.name,
        client_metadata: { teamId: team.id },
        app_type: "non_interactive",
      });

      await Promise.all(
        opts.audiences.map(audience => managementClient.createClientGrant({
          client_id: credential.client_id ?? '',
          audience: audience,
          scope: [],
        }))
      );

      return {
        environment: 'Production',
        properties: [{
          label: 'Client ID',
          value: credential.client_id ?? '',
        }, {
          label: 'Client Secret',
          value: credential.client_secret ?? '',
          secret: true,
        }],
      };
    },
    deleteCredentials: async (credentials) => {
      const managementClient = createManagementClient();
      const errors = await Promise.all(credentials.map(async (credential) => {
        const property = credential.properties.find((p) => p.label === 'Client ID');
        try {
          await managementClient.deleteClient({ client_id: property?.value ?? '' });
        } catch (e) {
          return e;
        }
      }));

      if (errors.length) {
        console.error(errors.filter(e => !!e));
        throw new Error(`Error deleting credentials`);
      }
    },
    rotateCredential: async (credential) => {
      const managementClient = createManagementClient();
      const token = await managementClient.getAccessToken();

      const property = credential.properties.find((p) => p.label === 'Client ID');

      if (!property) {
        throw new Error('No Client ID found in credential');
      }

      const { data } = await axios.post<Client>(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/clients/${property.value}/rotate-secret`, null, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!data) {
        throw new Error('Error refreshing token');
      }

      return {
        ...credential,
        properties: [{
          label: 'Client ID',
          value: data.client_id ?? '',
        }, {
          label: 'Client Secret',
          value: data.client_secret ?? '',
          secret: true,
        }],
      };
    },
    getTeamCredentials: async (teamId) => {
      const managementClient = createManagementClient();
      const allClients = await managementClient.getClients();
      return allClients
        .filter(({ client_metadata }) => client_metadata && client_metadata.teamId === teamId)
        .map(({ client_id, client_secret }) => ({
          environment: 'Production',
          properties: [{
            label: 'Client ID',
            value: client_id ?? '',
          }, {
            label: 'Client Secret',
            value: client_secret ?? '',
            secret: true,
          }]
        }));
    }
  }
}