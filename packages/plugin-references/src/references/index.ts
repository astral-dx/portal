import {
  ReferencesPlugin
} from "@astral-dx/core";
import fs from 'fs-extra';

interface InitReferencesProps {
  configPath?: string;
}

export const initReferences = ({configPath = '.'}: InitReferencesProps): ReferencesPlugin => {
  return {
    packageName: '@astral-dx/plugin-references',
    getReferences: async () => {
      const FILE_NAME = 'references.config.js';

      try {
        console.log(`${configPath}/${FILE_NAME}`);
        console.log(fs.readdirSync(configPath));
        // const config = await fs.readFile(`${configPath}/${FILE_NAME}`)
        // console.log(config)
        // console.log(Buffer.from(config).toJSON());
        const config = await import(`${configPath}/${FILE_NAME}`);
        console.log(config);
      } catch (e) {
        throw new Error(`Could not load references config at ${configPath}/${FILE_NAME}`);
      }

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