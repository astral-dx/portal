// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlugin, withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ link: string }>,
) => {
  if (req.method === 'DELETE') {
    const plugin = await getPlugin();

    if (!plugin.teamManagement.removeUserFromTeam) {
      res.status(501).end();
      return;
    }

    await plugin.teamManagement.removeUserFromTeam(req);
    res.status(204).end();
    return;
  }

  res.status(404).end();
}, { permissions: [] });
