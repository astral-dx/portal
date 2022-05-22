import {
  ReferencesPlugin
} from "@astral-dx/core";
import fs from 'fs-extra';

interface InitReferencesProps {
  configPath?: string;
}

export const initReferences = ({configPath = './references.config.js'}: InitReferencesProps): ReferencesPlugin => {
  console.log(configPath)
  return {
    packageName: '@astral-dx/plugin-references',
    getReferences: async () => {

      console.log(fs.lstatSync(configPath))

      return [
        { url: 'https://api.nasa.gov/', label: 'Documentation', description: 'This catalog focuses on broadly useful and user friendly APIs.', icon: 'book' },
        { url: 'https://github.com/nasa', label: 'GitHub', description: 'Open source repositories from NASA including ReadOpen data initative.', icon: 'code' },
      ]
    }
  }
}

// [
//   { url: 'https://api.nasa.gov/', label: 'Documentation', description: 'This catalog focuses on broadly useful and user friendly APIs.', icon: 'book' },
//   { url: 'https://github.com/nasa', label: 'GitHub', description: 'Open source repositories from NASA including ReadOpen data initative.', icon: 'code' },
// ]