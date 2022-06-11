import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired, Credential } from '@astral-dx/core';

const config = $config;

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ credential: Credential }>,
) => {
  if (req.method !== 'POST') {
    res.status(404).end();
    return;
  }

  if (!config.plugin.credential.createCredential) {
    res.status(501).end();
    return;
  }

  const { id } = req.query;
  const { name, environment } = req.body;

  if (
    typeof id !== 'string' ||
    typeof name !== 'string' ||
    (environment !== 'Sandbox' && environment !== 'Production')
  ) {
    res.status(400).end();
    return;
  }

  const credential = await config.plugin.credential
    .createCredential({ ctx: { req, res, config }, teamId: id, environment, name });
  res.status(200).json({ credential });
}, { config, permissions: [ 'portal-admin' ] });
