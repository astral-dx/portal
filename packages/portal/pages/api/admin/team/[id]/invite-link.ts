import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlugin, withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ path: string }>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  const plugin = getPlugin();

  if (!plugin.teamManagement.getTeamInvitePath) {
    res.status(501).end();
    return;
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).end();
    return;
  }

  const path = await plugin.teamManagement.getTeamInvitePath(id);
  res.status(200).json({ path });
}, { permissions: [ 'portal-admin' ] });