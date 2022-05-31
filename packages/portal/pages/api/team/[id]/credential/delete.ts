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

  if (!plugin.credential.deleteCredentials) {
    res.status(501).end();
    return;
  }

  const requestedBy = await plugin.authentication.getUser(req);

  if (!requestedBy) {
    res.status(401).end();
    return;
  }

  const { credentials } = req.body;

  if (!Array.isArray(credentials)) {
    res.status(400).end();
    return;
  }

  await plugin.credential.deleteCredentials(credentials, requestedBy);
  res.status(204).end();
  return;
}, { permissions: [] });
