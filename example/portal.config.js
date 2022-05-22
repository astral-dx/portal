const { initReferences } = require("@astral-dx/plugin-references");
const { initAuth0Authentication } = require('@astral-dx/plugin-auth0');

module.exports = {
  plugin: {
    authentication: initAuth0Authentication({}),
    // authentication: {
    //   packageName: 'local',
    //   loginPath: '/login',
    //   logoutPath: '',
    //   getUser: async () => ({
    //     id: 'afa55b51-dec3-46ec-9dff-48b85444cd21',
    //     role: 'admin',
    //     name: 'Neil Armstrong',
    //     email: 'neil.armstrong@nasa.com',
    //     permissions: [ 'portal-admin' ],
    //     avatar: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_24/1913661/ss-140719-apollo-11-01_0.jpg',
    //   }),
    //   // getUser: async () => undefined,
    //   updateUser: async () => ({
    //     id: 'afa55b51-dec3-46ec-9dff-48b85444cd21',
    //     role: 'admin',
    //     name: 'Neil Armstrong',
    //     email: 'neil.armstrong@nasa.com',
    //     permissions: [ 'portal-admin' ],
    //     avatar: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_24/1913661/ss-140719-apollo-11-01_0.jpg',
    //   }),
    //   deleteUser: async () => {},
    // },
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
    references: initReferences({}),
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
}