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

  if (!plugin.teamManagement.getAdminInvitePath) {
    res.status(501).end();
    return;
  }

  const path = await plugin.teamManagement.getAdminInvitePath();
  res.status(200).json({ path });
}, { plugin: $config.plugin, permissions: [ 'portal-admin' ] });
