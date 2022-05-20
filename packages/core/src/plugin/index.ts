import { AuthenticationPlugin } from "./authentication";
import { BrandingPlugin } from "./branding";
import { CredentialPlugin } from "./credential";
import { ReferencesPlugin } from "./references";
import { TeamManagementPlugin } from "./teamManagement";

declare var __portalConfig: {
  plugin: Plugin;
};

export interface Plugin {
  authentication: AuthenticationPlugin;
  branding: BrandingPlugin;
  references: ReferencesPlugin;
  teamManagement: TeamManagementPlugin;
  credential: CredentialPlugin;
};

export interface PluginComponent {
  packageName: string;
  folders?: {
    pages?: string;
    components?: string;
  }
}

export const getPlugin = async (): Promise<Plugin> => {
  const config = __portalConfig;

  if (config && config.plugin) {
    return config.plugin
  }

  throw new Error('Portal configuration file not found.')
};

export type { AuthenticationPlugin, User } from "./authentication";
export * from './authentication';

export type { BrandingPlugin, Brand } from "./branding";
export * from './branding';

export type { CredentialPlugin, Environment, Credential } from "./credential";
export * from './credential';

export type { ReferencesPlugin, Reference } from "./references";
export * from './references';

export type { TeamManagementPlugin, Team, TeamType } from "./teamManagement";
export * from './teamManagement';
