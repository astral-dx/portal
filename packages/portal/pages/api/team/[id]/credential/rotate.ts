import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlugin, Credential, withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<Credential>,
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

  const requestedBy = await plugin.authentication.getUser(req);

  if (!requestedBy) {
    res.status(401).end();
    return;
  }

  const { credential: oldCredential } = req.body;

  if (typeof oldCredential !== 'object') {
    res.status(400).end();
    return;
  }

  const credential = await plugin.credential.rotateCredential(oldCredential, requestedBy);
  res.status(200).json(credential);
  return;
}, { permissions: [] });
