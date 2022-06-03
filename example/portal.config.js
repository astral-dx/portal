const { initReferences } = require("@astral-dx/plugin-references");
const { initAuth0Authentication, initAuth0TeamManagement } = require('@astral-dx/plugin-auth0');

module.exports = {
  plugin: {
    authentication: initAuth0Authentication({}),
    teamManagement: initAuth0TeamManagement({}),
    branding: {
      packageName: 'local',
      getBrand: async () => ({
        logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/NASA_Worm_logo.svg/2560px-NASA_Worm_logo.svg.png',
        faviconHref: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png',
        primaryColor: '#ff0000',
        secondaryColor: '#000',
        title: 'NASA Developer Portal',
        subtitle: 'Welcome to the NASA API portal',
      }),
    },
    references: initReferences({
      references: [
        { url: 'https://api.nasa.gov/', label: 'Documentation', description: 'This catalog focuses on broadly useful and user friendly APIs.', icon: 'book' },
        { url: 'https://github.com/nasa', label: 'GitHub', description: 'Open source repositories from NASA including ReadOpen data initative.', icon: 'code' },
      ]
    }),
    credential: {
      packageName: 'local',
      createCredential: async () => ({
        properties: [{ label: 'Token', value: '', secret: true }],
        environment: 'Production',
      }),
      rotateCredential: async (oldCredential) => ({
        properties: [
          {
            label: 'Client ID',
            value: Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join(''),
            helperText: 'The identifier for the client your application, use to call our API.',
          },
          {
            label: 'Client Secret',
            value: Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join(''),
            secret: true,
            helperText: 'Your client secret is known only to your application and the authorization server. Protect your client secret and never include it in mobile or browser-based apps.',
          },
        ],
        name: oldCredential.name,
        environment: oldCredential.environment,
      }),
      deleteCredentials: async () => {},
      getTeamCredentials: async () => [{
        properties: [
          {
            label: 'Client ID',
            value: '91dd69ab-d280-429c-9600-14a55bc6bc98',
            helperText: 'The identifier for the client your application, use to call our API.',
          },
          {
            label: 'Client Secret',
            value: '87c149cf74df527c9dbfd4045dd9ba1c3c04ba772095dc6ee8f1eecdea084236',
            secret: true,
            helperText: 'Your client secret is known only to your application and the authorization server. Protect your client secret and never include it in mobile or browser-based apps.',
          },
        ],
        name: 'Shuttle Interface',
        environment: 'Production',
      }, {
        properties: [
          {
            label: 'Client ID',
            value: 'c0c89272-3585-4e39-86af-4801f39b522e',
            helperText: 'The identifier for the client your application, use to call our API.',
          },
          {
            label: 'Client Secret',
            value: '26cc3032b7cf9f3fe0f072e4f7eda97bdd7bb527600a44d11b819c8fe65f054d',
            secret: true,
            helperText: 'Your client secret is known only to your application and the authorization server. Protect your client secret and never include it in mobile or browser-based apps.',
          },
        ],
        name: 'Thruster System',
        environment: 'Production',
      }, {
        properties: [
          {
            label: 'Client ID',
            value: 'd3a04af0-8e92-4210-80fe-c6cc86a55987',
            helperText: 'The identifier for the client your application, use to call our API.',
          },
          {
            label: 'Client Secret',
            value: 'bb612f82f358d719630628f66aa2906b26e889643e4c36ab48c566c644a30abc',
            secret: true,
            helperText: 'Your client secret is known only to your application and the authorization server. Protect your client secret and never include it in mobile or browser-based apps.',
          },
        ],
        environment: 'Sandbox',
      }],
    },
  },
};