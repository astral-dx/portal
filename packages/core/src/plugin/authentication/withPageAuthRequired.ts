import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Permission, Plugin } from '../index';

interface AuthGuardProps {
  plugin: Plugin,
  getServerSideProps?: GetServerSideProps;
  redirectTo: string;
  permissions: Permission[];
}

export const withPageAuthRequired = ({ plugin, getServerSideProps, redirectTo, permissions = [] }: AuthGuardProps) => async (
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<any> | void> => {
  const { res } = ctx;

  const user = await plugin.authentication.getUser(ctx.req);

  if (!user) {
    res.setHeader('location', plugin.authentication.loginPath);
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