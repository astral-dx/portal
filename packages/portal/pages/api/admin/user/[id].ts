import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlugin, withApiAuthRequired, User } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ user: User }>,
) => {
  if (req.method === 'PUT') {
    const plugin = getPlugin();

    if (!plugin.teamManagement.deleteTeam) {
      res.status(501).end();
      return;
    }
  
    const { id } = req.query;
    const { user: update } = req.body;
  
    if (typeof id !== 'string' || typeof update !== 'object') {
      res.status(400).end();
      return;
    }

    const user = await plugin.authentication.updateUser(id, update);
    res.status(200).json({ user });
    return;
  }

  res.status(404).end();
}, { permissions: [ 'portal-admin' ] });
