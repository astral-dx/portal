import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired, User } from '@astral-dx/core';

const config = $config;

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ user: User }>,
) => {
  if (req.method === 'PUT') {
    if (!config.plugin.teamManagement.deleteTeam) {
      res.status(501).end();
      return;
    }
  
    const { id } = req.query;
    const { user: update } = req.body;
  
    if (typeof id !== 'string' || typeof update !== 'object') {
      res.status(400).end();
      return;
    }

    const user = await config.plugin.authentication
      .updateUser({ ctx: { req, res, config }, id, update });
    res.status(200).json({ user });
    return;
  }

  res.status(404).end();
}, { config, permissions: [ 'portal-admin' ] });
