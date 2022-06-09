import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@astral-dx/core';

const config = $config;

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  if (!config.plugin.credential.deleteCredentials) {
    res.status(501).end();
    return;
  }

  const { credentials } = req.body;

  if (!Array.isArray(credentials)) {
    res.status(400).end();
    return;
  }

  await config.plugin.credential.deleteCredentials({ ctx: { req, res, config }, credentials });
  res.status(204).end();
  return;
}, { config, permissions: [ 'portal-admin' ] });
