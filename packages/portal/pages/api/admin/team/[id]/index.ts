import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlugin, withApiAuthRequired } from '@astral-dx/core';

export default withApiAuthRequired(async (
  req: NextApiRequest,
  res: NextApiResponse<{ link: string }>,
) => {
  if (req.method === 'DELETE') {
    const plugin = getPlugin();

    if (!plugin.teamManagement.deleteTeam) {
      res.status(501).end();
      return;
    }
  
    const { id } = req.query;
  
    if (typeof id !== 'string') {
      res.status(400).end();
      return;
    }

    const teams = await plugin.teamManagement.getTeams();
    const team = teams.find((t) => t.id === id);

    if (!team) {
      res.status(404).end();
      return;
    }

    await Promise.all([
      plugin.credential.deleteCredentials(await plugin.credential.getTeamCredentials(id)),
      ...team.members.map(
        ({ email }) => plugin.teamManagement.removeUserFromTeam(id, email)
      ),
    ]);

    await plugin.teamManagement.deleteTeam(id);
    res.status(204).end();
    return;
  }

  res.status(404).end();
}, { permissions: [ 'portal-admin' ] });
