import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlugin, Credential, withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ credential: Credential}>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  const plugin = getPlugin();

  if (!plugin.credential.rotateCredential) {
    res.status(501).end();
    return;
  }

  const team = await plugin.teamManagement.getUserTeam(req);

  const { id } = req.query;
  const { credential: oldCredential } = req.body;
  
  if (!team || team.id !== id) {
    res.status(401).end();
    return;
  }

  if (typeof oldCredential !== 'object') {
    res.status(400).end();
    return;
  }

  const credential = await plugin.credential.rotateCredential(oldCredential);
  res.status(200).json({ credential });
  return;
}, { permissions: [] });
