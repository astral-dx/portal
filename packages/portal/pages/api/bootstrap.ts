// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { 
  Brand,
  User,
  withApiAuthRequired
} from '@astral-dx/core';

type Data = {
  user?: User,
  brand: Brand,
  logoutPath: string;
};

const config = $config;

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const plugin = $config.plugin;

  const ctx = { req, res, config };
  const data = {
    logoutPath: await plugin.authentication.logoutPath({ ctx }),
    user: await plugin.authentication.getUser({ ctx }),
    brand: await plugin.branding.getBrand({ ctx }),
  };

  res.status(200).json(data);

}, { config, permissions: [] });
