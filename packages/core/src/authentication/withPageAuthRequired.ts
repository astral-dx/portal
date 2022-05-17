import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getPlugin } from '../plugin';

interface AuthGuardProps {
  getServerSideProps?: GetServerSideProps;
  redirectTo: string;
  permissions: string[];
}

export const withPageAuthRequired = ({ getServerSideProps, redirectTo, permissions = [] }: AuthGuardProps) => async (
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<any> | void> => {
  const plugin = await getPlugin();
  const user = await plugin.authentication.getUser(ctx.req);

  if (!user) {
    const { res } = ctx;
    res.setHeader('location', plugin.authentication.loginPath);
    res.statusCode = 302;
    res.end();
    return;
  }

  if (user && permissions.every(p => user.permissions.includes(p))) {
    if (getServerSideProps) {
      return await getServerSideProps(ctx);
    }
  
    return { props: {} };
  }

  const { res } = ctx;
  res.setHeader('location', redirectTo);
  res.statusCode = 302;
  res.end();
  return;
};