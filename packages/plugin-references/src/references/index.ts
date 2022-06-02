import {
  ReferencesPlugin,
  Reference
} from "@astral-dx/core";

interface InitReferencesProps {
  references: Reference[];
}

export const initReferences = ({references}: InitReferencesProps): ReferencesPlugin => {
  return {
    packageName: '@astral-dx/plugin-references',
    getReferences: async () => {

      return references;
    }
  }
}

// [
//   { url: 'https://api.nasa.gov/', label: 'Documentation', description: 'This catalog focuses on broadly useful and user friendly APIs.', icon: 'book' },
//   { url: 'https://github.com/nasa', label: 'GitHub', description: 'Open source repositories from NASA including ReadOpen data initative.', icon: 'code' },
// ]