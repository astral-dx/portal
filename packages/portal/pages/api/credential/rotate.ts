// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

  const credential = await plugin.credential.rotateCredential(req.body.credential);
  res.status(200).json(credential);
}, { permissions: [] });
