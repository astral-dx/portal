This is the [Astral DX](https://astral.sh/) API developer portal.

![Astral DX Logo](https://static.wixstatic.com/media/3b1cdf_29b9afcb43dd489bbca1802a0ff6371a~mv2.png/v1/fill/w_282,h_100,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Astral%20Logo.png)

Product and Partnership teams use the Astral DX API portal get a Stripe-like API portal, without the months of engineering expense.

_Features_
- Branded Developer API Portal
- Automated API Credential Management (Sandbox and Production Enviroments)
- Administrative Security
- Supports Developer Teams & Invitations

## Getting Started

First, create an `.env.local` at the root of the project and provide any necessary environment variables.

```bash
# .env.local

# For Auth0 Authencation
AUTH0_SECRET=
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

# For Auth0 Team Management
AUTH0_ADMIN_INVITE_SIGNING_SECRET=
AUTH0_TEAM_INVITE_SIGNING_SECRET=

# For Auth0 API Credentials
PRODUCTION_AUTH0_MANAGEMENT_CLIENT_DOMAIN=
PRODUCTION_AUTH0_MANAGEMENT_CLIENT_ID=
PRODUCTION_AUTH0_MANAGEMENT_CLIENT_SECRET=
SANDBOX_AUTH0_MANAGEMENT_CLIENT_DOMAIN=
SANDBOX_AUTH0_MANAGEMENT_CLIENT_ID=
SANDBOX_AUTH0_MANAGEMENT_CLIENT_SECRET=
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start customizing your API developer portal by modifying `portal.config.js`. Refresh your page to see changes.

## Plugins

We're focused on providing an out of the box experience with the tools your team is already using.

- `@astral-dx/plugin-auth0` [Auth0](https://auth0.com/) - supports User Authencation, Team mangement, and API Credentials
- `@astral-dx/plugin-kong` [Kong](https://konghq.com/) - _Coming soon!_
- `@astral-dx/plugin-apigee` [Apigee](https://cloud.google.com/apigee) - _Coming soon!_
- `@astral-dx/plugin-tyk` [Tyk](https://tyk.io/) - _Coming soon!_
- `@astral-dx/plugin-zuplo` [Zuplo](https://zuplo.com/) - _Coming soon!_

Don't see a plugin your looking for? Reach out and let us know! [contact@astral.sh](mailto:contact@astral.sh)

## Customization

Astral DX Developer API Portal supports custom implementations for any of our core concepts:
- User Authencation
- Team Mangement
- API Credential Management
- Branding
- References
- _Custom Pages coming soon!_

Cusomization documentation is also _coming soon!_
