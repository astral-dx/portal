import { Environment, Permission } from '@astral-dx/core';
import { ManagementClient } from 'auth0';
import { decode, encode } from 'bs58';

export interface AstralAppMetadata {
  teamId?: string;
  permissions?: Permission[];
}

export type AstralAuth0ManagementClient = ManagementClient<AstralAppMetadata>;

export const createManagementClient = (environment: Environment): AstralAuth0ManagementClient => { 
  if (environment === 'Sandbox') {
    return new ManagementClient<AstralAppMetadata>({
      domain: process.env.SANDBOX_AUTH0_MANAGEMENT_CLIENT_DOMAIN ?? '',
      clientId: process.env.SANDBOX_AUTH0_MANAGEMENT_CLIENT_ID ?? '',
      clientSecret: process.env.SANDBOX_AUTH0_MANAGEMENT_CLIENT_SECRET ?? ''
    });
  }
  
  return new ManagementClient<AstralAppMetadata>({
    domain: process.env.PRODUCTION_AUTH0_MANAGEMENT_CLIENT_DOMAIN ?? '',
    clientId: process.env.PRODUCTION_AUTH0_MANAGEMENT_CLIENT_ID ?? '',
    clientSecret: process.env.PRODUCTION_AUTH0_MANAGEMENT_CLIENT_SECRET ?? ''
  });
}

export const generateId = (val: string) => {
  const enc = new TextEncoder(); 

  return encode(enc.encode(val));
};

export const decodeId = (id: string) => {
  const dec = new TextDecoder("utf-8");

  return dec.decode(decode(id));
};