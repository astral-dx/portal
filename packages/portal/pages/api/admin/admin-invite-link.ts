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

  if (!config.plugin.teamManagement.getAdminInvitePath) {
    res.status(501).end();
    return;
  }

  const path = await config.plugin.teamManagement.getAdminInvitePath({ ctx: { req, res, config }});
  res.status(200).json({ path });
}, { config, permissions: [ 'portal-admin' ] });
