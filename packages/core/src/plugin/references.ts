export interface Reference {
  url: string;
  label: string;
  icon: string;
}

export interface ReferencesPlugin {
  getReferences: () => Promise<Reference[]>;
}
