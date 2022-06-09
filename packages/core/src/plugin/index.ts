import { IncomingMessage, ServerResponse } from 'http';

import { AuthenticationPlugin } from "./authentication";
import { BrandingPlugin } from "./branding";
import { CredentialPlugin } from "./credential";
import { ReferencesPlugin } from "./references";
import { TeamManagementPlugin } from "./teamManagement";

declare global {
  var $config: PortalConfig;
  var $packageJson: Package;
}

export interface PortalConfig {
  plugin: Plugin;
}

export interface PortalRequestContext {
  req: IncomingMessage;
  res: ServerResponse;
  config: PortalConfig;
}

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

export const getPackages = (plugin: Plugin, packageJson: any): Package[] => {
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
        name: plugin[component as keyof Plugin].packageName,
        version: packageJson.dependencies[plugin[component as keyof Plugin].packageName] ?? null,
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
