// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

  const plugin = await getPlugin();

  if (!plugin.teamManagement.getTeamInviteLink) {
    res.status(501).end();
    return;
  }

  const link = await plugin.teamManagement.getTeamInviteLink(req);
  res.status(200).json({ link });
}, { permissions: [] });
