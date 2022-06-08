
import { NextApiRequest, NextApiResponse} from 'next';
import jwt from 'jsonwebtoken';
import { withApiAuthRequired } from "@astral-dx/core";
import { createManagementClient } from '../../../services/plugin-auth0';

export type TeamInviteTokenPayload = jwt.JwtPayload & {
  teamId: string;
}

export default withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const inviteSigningSecret = process.env.AUTH0_TEAM_INVITE_SIGNING_SECRET;

    if (!inviteSigningSecret) {
      res.status(500).end();
      return;
    }

    const { teamToken } = req.query;

    if (!teamToken || typeof teamToken !== 'string') {
      res.status(404).end();
      return;
    }

    let payload: TeamInviteTokenPayload;

    try {
      payload = jwt.verify(teamToken, inviteSigningSecret) as TeamInviteTokenPayload;
    } catch (e) {
      console.error(e);
      res.status(302).redirect('/team/invite-expired').end();
      return;
    }
    
    const plugin = $config.plugin;
    const user = await plugin.authentication.getUser(req);

    if (!user) {
      res.status(401).end();
      return;
    }

    try {
      const managementClient = createManagementClient();

      await managementClient.updateAppMetadata({ id: user.id }, {
        teamId: payload.teamId,
      });
      
      res.status(302).redirect('/').end();
      return;
    } catch (e) {
      console.error(e);
      res.status(302).redirect('/team/error-joining').end();
      return;
    }
  }
  
  res.status(404).end();
  return;
}, { plugin: $config.plugin, permissions: [] });