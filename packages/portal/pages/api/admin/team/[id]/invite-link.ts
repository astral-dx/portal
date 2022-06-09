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

  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).end();
    return;
  }

  const path = await config.plugin.teamManagement
    .getTeamInvitePath({ ctx: { req, res, config }, teamId: id });
  res.status(200).json({ path });
}, { config, permissions: [ 'portal-admin' ] });
