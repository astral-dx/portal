import getConfig from 'next/config';

import { AuthenticationPlugin } from "./authentication";
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
};

export interface Package {
  name: string;
  version?: string;
  component?: string;
};

export interface ConfigInformation {
  coreVersion: string;
  plugin: {
    authentication: Pick<PluginComponent, 'packageName'>;
    branding: Pick<PluginComponent, 'packageName'>;
    references: Pick<PluginComponent, 'packageName'>;
    teamManagement: Pick<PluginComponent, 'packageName'>;
    credential: Pick<PluginComponent, 'packageName'>;
  }
};

export interface PluginComponent {
  packageName: string;
  folders?: {
    pages?: string;
    components?: string;
    services?: string;
  },
}

export const getPlugin = (): Plugin => {
  const { serverRuntimeConfig } = getConfig();
  return serverRuntimeConfig.portalConfig.plugin;
};

export const getPackages = (): Package[] => {
  const config = getPlugin();
  const { serverRuntimeConfig } = getConfig();
  const { packageJson } = serverRuntimeConfig;
  const isPortalDevelopment = packageJson.name === '@astral-dx/portal';
  const packages: Package[] = [];

  packages.push({
    name: '@astral-dx/portal',
    version: isPortalDevelopment ? 'dev' : packageJson.dependencies['@astral-dx/portal']
  });

  packages.push({
    name: '@astral-dx/core',
    version: isPortalDevelopment ? 'dev' : packageJson.dependencies['@astral-dx/core']
  });

  return packages.concat(
    ['authentication', 'branding', 'references', 'teamManagement', 'credential']
      .map((component) => ({
        name: config[component as keyof Plugin].packageName,
        version: packageJson.dependencies[config[component as keyof Plugin].packageName] ?? null,
        component,
      }))
  );
};

export type { AuthenticationPlugin, User, Permission } from "./authentication";
export * from './authentication';

export type { BrandingPlugin, Brand } from "./branding";
export * from './branding';

export type { CredentialPlugin, Environment, Credential } from "./credential";
export * from './credential';

export type { ReferencesPlugin, Reference } from "./references";
export * from './references';

export type { TeamManagementPlugin, Team } from "./teamManagement";
export * from './teamManagement';
