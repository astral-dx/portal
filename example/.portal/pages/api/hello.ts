// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@astral-dx/core/dist/authentication/withApiAuthRequired';
import { getPlugin } from '@astral-dx/core/dist/plugin';

type Data = {
  name: string
}

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const plugin = await getPlugin();
  const user = await plugin.authentication.getUser(req);
  res.status(200).json(user as any)
}, { permissions: [] });
