import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ path: string }>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  const plugin = $config.plugin;

  if (!plugin.teamManagement.getTeamInvitePath) {
    res.status(501).end();
    return;
  }

  const team = await plugin.teamManagement.getUserTeam(req);

  const { id } = req.query;

  if (!team || team.id !== id) {
    res.status(401).end();
    return;
  }

  if (typeof id !== 'string') {
    res.status(400).end();
    return;
  }

  const path = await plugin.teamManagement.getTeamInvitePath(id);
  res.status(200).json({ path });
}, { plugin: $config.plugin, permissions: [] });
