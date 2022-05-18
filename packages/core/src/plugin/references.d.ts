import { PluginComponent } from "./index";

export interface Reference {
  url: string;
  label: string;
  icon: string;
}

export interface ReferencesPlugin extends PluginComponent {
  getReferences: () => Promise<Reference[]>;
}
