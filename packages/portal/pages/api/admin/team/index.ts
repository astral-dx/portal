import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired, Team } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ team: Team }>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  const plugin = $config.plugin;

  if (!plugin.teamManagement.createTeam) {
    res.status(501).end();
    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400).end();
    return;
  }

  const team = await plugin.teamManagement.createTeam(name);
  res.status(200).json({ team });
}, { plugin: $config.plugin, permissions: [ 'portal-admin' ] });
