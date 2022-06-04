import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlugin, Credential, withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ link: string }>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  const plugin = getPlugin();

  if (!plugin.teamManagement.getAdminInviteLink) {
    res.status(501).end();
    return;
  }

  const link = await plugin.teamManagement.getAdminInviteLink();
  res.status(200).json({ link });
}, { permissions: [ 'portal-admin' ] });
