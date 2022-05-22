import { IncomingMessage } from "http";
import { Team } from "../teamManagement";
import { PluginComponent } from "../index";

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
  getUserCredentials: (req: IncomingMessage) => Promise<Credential[]>;
  createCredential: (team: Team, environment?: Environment) => Promise<Credential>;
  rotateCredential?: (credential: Credential) => Promise<Credential>;
  deleteCredential: (credential: Credential) => Promise<void>;
}

export * from './useCredentials';