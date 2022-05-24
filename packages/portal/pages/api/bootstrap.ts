// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { 
  Brand,
  getPlugin,
  User,
  withApiAuthRequired
} from '@astral-dx/core';

type Data = {
  user?: User,
  brand: Brand,
};

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const plugin = await getPlugin();

  const data = {
    user: await plugin.authentication.getUser(req),
    brand: await plugin.branding.getBrand(),
  };

  res.status(200).json(data);

}, { permissions: [] });
