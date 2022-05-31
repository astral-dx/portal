import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlugin, withApiAuthRequired, Team } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<Team>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  const plugin = getPlugin();

  if (!plugin.teamManagement.createTeam) {
    res.status(501).end();
    return;
  }

  const requestedBy = await plugin.authentication.getUser(req);

  if (!requestedBy) {
    res.status(401).end();
    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400).end();
    return;
  }

  const team = await plugin.teamManagement.createTeam(name, requestedBy);
  res.status(200).json(team);
}, { permissions: [] });
