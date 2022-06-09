import type { NextApiRequest, NextApiResponse } from 'next'
import { Credential, withApiAuthRequired } from '@astral-dx/core';

const config = $config;

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ credential: Credential}>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  if (!config.plugin.credential.rotateCredential) {
    res.status(501).end();
    return;
  }

  const { credential: oldCredential } = req.body;

  if (typeof oldCredential !== 'object') {
    res.status(400).end();
    return;
  }

  const credential = await config.plugin.credential.rotateCredential({ 
    ctx: { req, res, config },
    credential: oldCredential,
  });
  res.status(200).json({ credential });
  return;
}, { config, permissions: [ 'portal-admin' ] });
