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

  const ctx = { req, res, config };
  const team = await config.plugin.teamManagement.getUserTeam({ ctx });

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

  const credential = await config.plugin.credential
    .rotateCredential({ ctx, credential: oldCredential });
  res.status(200).json({ credential });
  return;
}, { config, permissions: [] });
