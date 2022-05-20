// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { 
  Brand,
  getPlugin,
  Credential,
  Reference,
  Team,
  User,
  withApiAuthRequired
} from '@astral-dx/core';

type Data = {
  user?: User,
  brand: Brand,
  references: Reference[],
  teams: Team[],
  credentials: Credential[]
};

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const plugin = await getPlugin();

  const data = {
    user: await plugin.authentication.getUser(req),
    brand: await plugin.branding.getBrand(),
    references: await plugin.references.getReferences(),
    teams: await plugin.teamManagement.getUserTeams(req),
    credentials: await plugin.credential.getUserCredentials(req)
  };

  res.status(200).json(data);

}, { permissions: [] });
