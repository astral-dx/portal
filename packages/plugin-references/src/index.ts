import {
  ReferencesPlugin,
  Reference
} from "@astral-dx/core";

export const initReferences = (references: Reference[]): ReferencesPlugin => {
  return {
    packageName: '@astral-dx/plugin-references',
    getReferences: async () => references,
  }
};