import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PortalConfig, Permission } from '../index';

interface withApiAuthRequiredOptions {
  config: PortalConfig,
  permissions: Permission[];
}

export const withApiAuthRequired = (handler: NextApiHandler, { config, permissions = [] }: withApiAuthRequiredOptions) => (
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const user = await config.plugin.authentication.getUser({ ctx: { req, res, config } });

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