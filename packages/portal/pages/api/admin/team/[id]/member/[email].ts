import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlugin, withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ link: string }>,
) => {
  if (req.method === 'DELETE') {
    const plugin = getPlugin();

    if (!plugin.teamManagement.removeUserFromTeam) {
      res.status(501).end();
      return;
    }
  
    const { id, email } = req.query;
  
    if (typeof id !== 'string' || typeof email !== 'string') {
      res.status(400).end();
      return;
    }

    await plugin.teamManagement.removeUserFromTeam(id, email);
    res.status(204).end();
    return;
  }

  res.status(404).end();
}, { permissions: [ 'portal-admin' ] });
