import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@astral-dx/core';

const config = $config;

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ link: string }>,
) => {
  if (req.method === 'DELETE') {
    if (!config.plugin.teamManagement.removeUserFromTeam) {
      res.status(501).end();
      return;
    }
  
    const { id, email } = req.query;

    const ctx = { req, res, config }
    const team = await config.plugin.teamManagement.getUserTeam({ ctx });
    
    if (!team || team.id !== id) {
      res.status(401).end();
      return;
    }
  
    if (typeof id !== 'string' || typeof email !== 'string') {
      res.status(400).end();
      return;
    }

    await config.plugin.teamManagement.removeUserFromTeam({ ctx, teamId: id, email });
    res.status(204).end();
    return;
  }

  res.status(404).end();
}, { config, permissions: [] });
