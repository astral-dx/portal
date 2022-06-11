import { CredentialPlugin, Credential, Environment } from '@astral-dx/core';
import { Client } from 'auth0';
import axios from 'axios';
import { AstralAuth0ManagementClient, createManagementClient } from '../services/plugin-auth0';

export interface Auth0CredentialConfig {
  audiences: string[],
};

export const getTeamCredentials: CredentialPlugin['getTeamCredentials'] = async ({ teamId }) => {
  const productionManagementClient = createManagementClient('Production');
  const sandboxManagementClient = createManagementClient('Production');
  const [ productionCredentials, sandboxCredentials ] = await Promise.all([
    productionManagementClient.getClients(),
    sandboxManagementClient.getClients(),
  ]);

  const teamCredentials: Credential[] = [];
  
  productionCredentials.filter(({ client_metadata }) => client_metadata && client_metadata.teamId === teamId)
    .forEach(({ client_id, client_secret }) => (teamCredentials.push({
      environment: 'Production',
      properties: [
        { label: 'Client ID', value: client_id ?? '' },
        { label: 'Client Secret', value: client_secret ?? '', secret: true },
      ],
    })));

  sandboxCredentials.filter(({ client_metadata }) => client_metadata && client_metadata.teamId === teamId)
    .forEach(({ client_id, client_secret }) => (teamCredentials.push({
      environment: 'Sandbox',
      properties: [
        { label: 'Client ID', value: client_id ?? '' },
        { label: 'Client Secret', value: client_secret ?? '', secret: true },
      ],
    })));

  return teamCredentials;
}

export const createCredential = async (
  opts: { teamId: string, name: string, environment: Environment },
  audiences: string[],
): Promise<Credential> => {
  const managementClient = createManagementClient(opts.environment);
  const credential = await managementClient.createClient({
    name: opts.name,
    client_metadata: { teamId: opts.teamId },
    app_type: "non_interactive",
  });

  await Promise.all(
    audiences.map(audience => managementClient.createClientGrant({
      client_id: credential.client_id ?? '',
      audience: audience,
      scope: [],
    }))
  );

  return {
    environment: opts.environment,
    properties: [{
      label: 'Client ID',
      value: credential.client_id ?? '',
    }, {
      label: 'Client Secret',
      value: credential.client_secret ?? '',
      secret: true,
    }],
  };
};

export const rotateCredential: CredentialPlugin['rotateCredential'] = async ({ credential }) => {
  const domain = credential.environment === 'Sandbox' ? process.env.SANDBOX_AUTH0_MANAGEMENT_CLIENT_DOMAIN : process.env.PRODUCTION_AUTH0_MANAGEMENT_CLIENT_DOMAIN; 
  const managementClient = createManagementClient(credential.environment);
  const token = await managementClient.getAccessToken();

  const property = credential.properties.find((p) => p.label === 'Client ID');

  if (!property) {
    throw new Error('No Client ID found in credential');
  }

  const { data } = await axios.post<Client>(`https://${domain}/api/v2/clients/${property.value}/rotate-secret`, null, {
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
};

export const deleteCredentials: CredentialPlugin['deleteCredentials'] = async ({ credentials }) => {
  let productionManagementClient: AstralAuth0ManagementClient;
  let sandboxManagementClient: AstralAuth0ManagementClient;

  const errors = await Promise.all(credentials.map(async (credential) => {
    if (credential.environment === 'Production' && !productionManagementClient) {
      productionManagementClient = createManagementClient('Production');
    } else if (!sandboxManagementClient) {
      sandboxManagementClient = createManagementClient('Sandbox');
    }

    const property = credential.properties.find((p) => p.label === 'Client ID');

    try {
      const managementClient = credential.environment === 'Production' ? productionManagementClient : sandboxManagementClient;
      await managementClient.deleteClient({ client_id: property?.value ?? '' });
    } catch (e) {
      return e;
    }
  }));

  if (errors.length) {
    console.error(errors.filter(e => !!e));
    throw new Error(`Error deleting credentials`);
  }
}