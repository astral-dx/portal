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
        primaryColor: '#fc3d21',
        secondaryColor: '#0b3d91',
        title: 'NASA Developer Portal',
        subtitle: 'Welcome to the NASA API portal',
      }),
    },
    references: {
      packageName: 'local',
      getReferences: async () => ([
        { url: 'https://api.nasa.gov/', label: 'Documentation', description: 'This catalog focuses on broadly useful and user friendly APIs.', icon: 'book' },
        { url: 'https://github.com/nasa', label: 'GitHub', description: 'Open source repositories from NASA including ReadOpen data initative.', icon: 'code' },
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
      getUserTeam: async () => ({
        id: '123',
        name: 'Rover Team',
        permissions: [],
        type: 'portal-consumer',
      }),
      getUserTeamMembers: async () => [{
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
        properties: [
          { label: 'Client ID', value: 'abc123', secret: true },
          { label: 'Client Secret', value: 'abc123', secret: true },
        ],
        environment: 'production',
      }, {
        properties: [
          { label: 'Client ID', value: 'abc123', secret: true },
          { label: 'Client Secret', value: 'abc123', secret: true },
        ],
        environment: 'sandbox',
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