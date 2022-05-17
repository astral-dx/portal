import { AuthenticationPlugin, User } from "./authentication";
import { BrandingPlugin } from "./branding";
import { CredentialPlugin } from "./credential";
import { ReferencesPlugin } from "./references";
import { TeamManagementPlugin } from "./teamManagement";

export interface Plugin {
  authentication: AuthenticationPlugin;
  branding: BrandingPlugin;
  references: ReferencesPlugin;
  teamManagement: TeamManagementPlugin;
  credential: CredentialPlugin;
}

const defaultPlugin: Plugin = {
  authentication: {
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
    getReferences: async () => ([
      { url: 'https://google.com', label: 'Google', icon: 'bolt' },
    ])
  },
  teamManagement: {
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
}

export const getPlugin = async (): Promise<Plugin> => {
  try {
    // moving this to a variable so that static checks
    // don't know it doesn't exist during portal development
    const configPath = '../../portal.config.js';
  
    // @ts-ignore 
    const config = await import(configPath);

    if (config && config.plugin) {
      return {
        ...defaultPlugin,
        ...config.plugin,
      }
    }
  
    return defaultPlugin;
  } catch (e) {
    return defaultPlugin;
  }
};

export type { User } from './authentication';