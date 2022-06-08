import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Plugin, Permission } from '../index';

interface withApiAuthRequiredOptions {
  plugin: Plugin,
  permissions: Permission[];
}

export const withApiAuthRequired = (handler: NextApiHandler, { plugin, permissions = [] }: withApiAuthRequiredOptions) => (
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
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