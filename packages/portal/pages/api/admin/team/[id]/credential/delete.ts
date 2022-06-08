import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  const plugin = $config.plugin;

  if (!plugin.credential.deleteCredentials) {
    res.status(501).end();
    return;
  }

  const { credentials } = req.body;

  if (!Array.isArray(credentials)) {
    res.status(400).end();
    return;
  }

  await plugin.credential.deleteCredentials(credentials);
  res.status(204).end();
  return;
}, { plugin: $config.plugin, permissions: [ 'portal-admin' ] });
