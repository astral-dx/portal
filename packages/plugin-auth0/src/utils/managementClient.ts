import { ManagementClient } from 'auth0';

export const createManagementClient = () => new ManagementClient({
  domain: process.env.AUTH0_ISSUER_BASE_URL ?? '',
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID ?? '',
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET ?? ''
});