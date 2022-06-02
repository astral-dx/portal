import { ManagementClient } from 'auth0';
import { decode, encode } from 'bs58';

export const createManagementClient = () => new ManagementClient({
  domain: process.env.AUTH0_ISSUER_BASE_URL ?? '',
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID ?? '',
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET ?? ''
});

export const generateId = (val: string) => {
  const enc = new TextEncoder(); 

  return encode(enc.encode(val));
};

export const decodeId = (id: string) => {
  const dec = new TextDecoder("utf-8");

  return dec.decode(decode(id));
};