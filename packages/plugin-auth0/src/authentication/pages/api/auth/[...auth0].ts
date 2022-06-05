import { getPlugin } from "@astral-dx/core";
import { handleAuth, handleCallback, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

export default handleAuth({
  login: async (req, res) => {
    const { teamToken, adminToken } = req.query;

    if (teamToken && typeof teamToken === 'string') {
      const returnTo = `/api/team/join?teamToken=${teamToken}`;

      return await handleLogin(req, res, {
        authorizationParams: { returnTo, screen_hint: 'signup' },
        returnTo,
      });
    }

    if (adminToken && typeof adminToken === 'string') {
      const returnTo = `/api/admin/join?adminToken=${adminToken}`;

      return await handleLogin(req, res, {
        authorizationParams: { returnTo, screen_hint: 'signup' },
        returnTo,
      });
    }

    const plugin = getPlugin();
    const user = await plugin.authentication.getUser(req);

    if (user) {
      res.redirect('/').end();
      return;
    }

    return await handleLogin(req, res);
  },

  callback: handleCallback,

  logout: handleLogout,
});