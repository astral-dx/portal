module.exports = {
  plugin: {
    authentication: {
      packageName: 'local',
      loginPath: '/login',
      logoutPath: '',
      getUser: async () => ({
        id: 'alsdkfj',
        role: 'admin',
        name: 'Neil Armstrong',
        email: 'neil.armstrong@nasa.com',
        permissions: ['test'],
      }),
      // getUser: async () => undefined,
      updateUser: async () => ({
        id: 'alsdkfj',
        role: 'admin',
        name: 'Neil Armstrong',
        email: 'neil.armstrong@nasa.com',
        permissions: ['test'],
      }),
      deleteUser: async () => {},
    },
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
    references: {
      packageName: 'local',
      getReferences: async () => ([
        { url: 'https://google.com', label: 'Google', description: 'Search the world\'s information, including webpages, images, videos and more.', icon: 'bolt' },
        { url: 'https://google.com', label: 'Google', description: 'Search the world\'s information, including webpages, images, videos and more.', icon: 'bolt' },
        { url: 'https://google.com', label: 'Google', description: 'Search the world\'s information, including webpages, images, videos and more.', icon: 'bolt' },
      ])
    },
    teamManagement: {
      packageName: 'local',
      addUserToTeam: async () => {},
      removeUserFromTeam: async () => {},
      createTeam: async () => ({
        id: '123',
        name: 'Rover Team',
        permissions: [],
        type: 'portal-consumer',
      }),
      updateTeam: async () => ({
        id: '123',
        name: 'Rover Team',
        permissions: [],
        type: 'portal-consumer',
      }),
      deleteTeam: async () => {},
      getUserTeams: async () => [{
        id: '123',
        name: 'Rover Team',
        permissions: [],
        type: 'portal-consumer',
      }],
      getTeamUsers: async () => [{
        id: 'alsdkfj',
        role: 'admin',
        name: 'Neil Armstrong',
        email: 'neil.armstrong@nasa.com',
        permissions: ['test'],
      }],
      getTeamInviteLink: async () => '',
    },
    credential: {
      packageName: 'local',
      getUserCredentials: async () => [{
        properties: [{ label: 'Token', value: 'abc123', secret: true }],
        environment: 'production',
      }],
      createCredential: async () => ({
        properties: [{ label: 'Token', value: 'abc123', secret: true }],
        environment: 'production',
      }),
      rotateCredential: async () => ({
        properties: [{ label: 'Token', value: 'abc123', secret: true }],
        environment: 'production',
      }),
      deleteCredential: async () => {},
    },
  },
};