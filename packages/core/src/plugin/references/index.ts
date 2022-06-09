import { PluginComponent, PortalRequestContext } from "../index";

export interface Reference {
  url: string;
  label: string;
  description?: string;
  icon: string;
}

export interface ReferencesPlugin extends PluginComponent {
  getReferences: (opts: { ctx: PortalRequestContext }) => Promise<Reference[]>;
};

export * from './useReferences';