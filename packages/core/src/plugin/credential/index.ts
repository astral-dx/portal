import { IncomingMessage } from "http";
import { Team } from "../teamManagement";
import { PluginComponent, PortalRequestContext, User } from "../index";

export type Environment = 'Production' | 'Sandbox';

export interface CredentialProperty {
  label: string;
  value: string;
  secret?: boolean;
  helperText?: string;
}

export interface Credential {
  properties: CredentialProperty[];
  environment: Environment;
  name?: string;
}

export interface CredentialPlugin extends PluginComponent {
  getTeamCredentials: (opts: { ctx: PortalRequestContext, teamId: string }) => Promise<Credential[]>;
  createCredential: (opts: { ctx: PortalRequestContext, team: Team, environment: Environment | null }) => Promise<Credential>;
  rotateCredential?: (opts: { ctx: PortalRequestContext, credential: Credential }) => Promise<Credential>;
  deleteCredentials: (opts: { ctx: PortalRequestContext, credentials: Credential[] }) => Promise<void>;
}

export * from './useCredentials';