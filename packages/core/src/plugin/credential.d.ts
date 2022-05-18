import { IncomingMessage } from "http";
import { Team } from "./teamManagement";
import { PluginComponent } from "./index";

export type Environment = 'production' | 'sandbox';

export interface Credential {
  properties: Array<{ label: string; value: string; secret: boolean; }>;
  environment?: Environment;
}

export interface CredentialPlugin extends PluginComponent {
  getUserCredentials: (req: IncomingMessage) => Promise<Credential[]>;
  createCredential: (team: Team, environment?: Environment) => Promise<Credential>;
  rotateCredential?: (credential: Credential) => Promise<Credential>;
  deleteCredential: (credential: Credential) => Promise<void>;
}