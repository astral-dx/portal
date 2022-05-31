import { IncomingMessage } from "http";
import { Team } from "../teamManagement";
import { PluginComponent, User } from "../index";

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
  getTeamCredentials: (teamId: string, requestedBy: User) => Promise<Credential[]>;
  createCredential: (team: Team, environment: Environment | null, requestedBy: User) => Promise<Credential>;
  rotateCredential?: (credential: Credential, requestedBy: User) => Promise<Credential>;
  deleteCredentials: (credentials: Credential[], requestedBy: User) => Promise<void>;
}

export * from './useCredentials';