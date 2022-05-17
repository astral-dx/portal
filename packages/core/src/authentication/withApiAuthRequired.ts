import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getPlugin } from '../plugin';

interface withApiAuthRequiredOptions {
  permissions: string[];
}

export const withApiAuthRequired = (handler: NextApiHandler, { permissions = [] }: withApiAuthRequiredOptions) => (
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const plugin = await getPlugin();
    const user = await plugin.authentication.getUser(req);

    if (!user) {
      res.status(401).end();
      return;
    }

    if (user && permissions.every(p => user.permissions.includes(p))) {
      return handler(req, res);
    }

    res.status(403).end();
  }
)