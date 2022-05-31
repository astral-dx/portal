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

  const requestedBy = await plugin.authentication.getUser(req);

  if (!requestedBy) {
    res.status(401).end();
    return;
  }

  const { id } = req.query;
  const { permissions } = req.body;

  if (typeof id !== 'string' || !Array.isArray(permissions)) {
    res.status(400).end();
    return;
  }

  const link = await plugin.teamManagement.getTeamInviteLink(id, permissions, requestedBy);
  res.status(200).json({ link });
}, { permissions: [] });
