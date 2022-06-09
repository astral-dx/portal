import type { NextApiRequest, NextApiResponse } from 'next'
import { withApiAuthRequired } from '@astral-dx/core';

const config = $config;

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ link: string }>,
) => {
  if (req.method === 'DELETE') {
    if (!config.plugin.teamManagement.deleteTeam) {
      res.status(501).end();
      return;
    }
  
    const { id } = req.query;
  
    if (typeof id !== 'string') {
      res.status(400).end();
      return;
    }

    const ctx = { req, res, config };
    const teams = await config.plugin.teamManagement.getTeams({ ctx });
    const team = teams.find((t) => t.id === id);

    if (!team) {
      res.status(404).end();
      return;
    }

    const credentials = await config.plugin.credential.getTeamCredentials({ ctx, teamId: id });

    await Promise.all([
      config.plugin.credential.deleteCredentials({ ctx, credentials }),
      ...team.members.map(
        ({ email }) => config.plugin.teamManagement.removeUserFromTeam({ ctx, teamId: id , email })
      ),
    ]);

    await config.plugin.teamManagement.deleteTeam({ ctx, id });
    res.status(204).end();
    return;
  }

  res.status(404).end();
}, { config, permissions: [ 'portal-admin' ] });
