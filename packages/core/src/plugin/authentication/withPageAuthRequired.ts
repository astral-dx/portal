import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getPlugin, Permission } from '../index';

interface AuthGuardProps {
  getServerSideProps?: GetServerSideProps;
  redirectTo: string;
  permissions: Permission[];
}

export const withPageAuthRequired = ({ getServerSideProps, redirectTo, permissions = [] }: AuthGuardProps) => async (
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<any> | void> => {
  const { res } = ctx;

  const plugin = getPlugin();
  const user = await plugin.authentication.getUser(ctx.req);

  if (!user) {
    console.log('redirecting to login');
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

  console.log('redirecting to ' + redirectTo);
  res.setHeader('location', redirectTo);
  res.statusCode = 302;
  res.end();
  return { props: {} };
};