import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Permission, PortalConfig } from '../index';

interface AuthGuardProps {
  config: PortalConfig,
  getServerSideProps?: GetServerSideProps;
  redirectTo: string;
  permissions: Permission[];
}

export const withPageAuthRequired = ({ config, getServerSideProps, redirectTo, permissions = [] }: AuthGuardProps) => async (
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<any> | void> => {
  const { req, res } = ctx;

  const [ loginPath, user ] = await Promise.all([
    config.plugin.authentication.loginPath({ ctx: { req, res, config } }),
    config.plugin.authentication.getUser({ ctx: { req, res, config } }),
  ]);

  if (!user) {
    res.setHeader('location', loginPath);
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  if (user && permissions.every(p => user.permissions.includes(p))) {
    if (getServerSideProps) {
      return await getServerSideProps(ctx);
    }
  
    return { props: {} };
  }

  res.setHeader('location', redirectTo);
  res.statusCode = 302;
  res.end();
  return { props: {} };
};