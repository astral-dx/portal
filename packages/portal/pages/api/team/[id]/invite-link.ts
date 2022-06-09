import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@astral-dx/core';

const config = $config;

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ path: string }>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  if (!config.plugin.teamManagement.getTeamInvitePath) {
    res.status(501).end();
    return;
  }

  const ctx = { req, res, config };
  const team = await config.plugin.teamManagement.getUserTeam({ ctx });

  const { id } = req.query;

  if (!team || team.id !== id) {
    res.status(401).end();
    return;
  }

  if (typeof id !== 'string') {
    res.status(400).end();
    return;
  }

  const path = await config.plugin.teamManagement
    .getTeamInvitePath({ ctx, teamId: id });
  res.status(200).json({ path });
}, { config, permissions: [] });
