import type { NextApiRequest, NextApiResponse } from 'next'
import { Credential, withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ credential: Credential}>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  const plugin = $config.plugin;

  if (!plugin.credential.rotateCredential) {
    res.status(501).end();
    return;
  }

  const { credential: oldCredential } = req.body;

  if (typeof oldCredential !== 'object') {
    res.status(400).end();
    return;
  }

  const credential = await plugin.credential.rotateCredential(oldCredential);
  res.status(200).json({ credential });
  return;
}, { plugin: $config.plugin, permissions: [ 'portal-admin' ] });
