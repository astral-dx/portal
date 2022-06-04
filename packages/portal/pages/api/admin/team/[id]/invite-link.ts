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

  if (!plugin.teamManagement.getTeamInviteLink) {
    res.status(501).end();
    return;
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).end();
    return;
  }

  const link = await plugin.teamManagement.getTeamInviteLink(id);
  res.status(200).json({ link });
}, { permissions: [ 'portal-admin' ] });
