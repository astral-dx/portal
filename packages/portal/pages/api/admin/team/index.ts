import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired, Team } from '@astral-dx/core';

const config = $config;

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ team: Team }>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  if (!config.plugin.teamManagement.createTeam) {
    res.status(501).end();
    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400).end();
    return;
  }

  const team = await config.plugin.teamManagement
    .createTeam({ ctx: { req, res, config }, name });
  res.status(200).json({ team });
}, { config, permissions: [ 'portal-admin' ] });
