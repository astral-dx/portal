import { AstralAuth0ManagementClient } from ".";

export const getAllUsers = async (clientManager: AstralAuth0ManagementClient) => {
  // TODO: Paginate. Auth0 pagination sucks...
  return await clientManager.getUsers();
};

export const getAllClients = async (clientManager: AstralAuth0ManagementClient) => {
  // TODO: Paginate. Auth0 pagination sucks...
  return await clientManager.getClients();
};