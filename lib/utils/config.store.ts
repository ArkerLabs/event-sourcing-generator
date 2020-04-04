/* eslint-disable @typescript-eslint/no-var-requires */
import configStore = require('configstore');

const packageJson = require('../../package.json');

export const config = new configStore(packageJson.name, {
  collection: {
    description: 'Specifies the default schematics collection to use.',
    name: {
      type: 'string',
      value: '@arkerlabs/es-schematics',
      description: 'The collection name to use schematics from.',
    },
    outDir: {
      type: 'string',
      value: 'dist',
      description:
        'The directory where your schematic output is located. It will be used for parsing the schema.json file.',
    },
  },
  event: {
    description:
      'Specifies the default config for @arkerlabs/es-schematics event.',
    createHandler: {
      type: 'boolean',
      value: true,
      description: 'Create automatically a handler associated with this event.',
    },
    createUpdater: {
      type: 'boolean',
      value: true,
      description:
        'Create automatically an updater associated with this event.',
    },
    spec: { type: 'boolean', value: true, description: 'Create a spec file.' },
  },
  query: {
    description:
      'Specifies the default config for @arkerlabs/es-schematics query.',
    spec: { type: 'boolean', value: true, description: 'Create a spec file.' },
  },
  command: {
    description:
      'Specifies the default config for @arkerlabs/es-schematics command.',
    spec: { type: 'boolean', value: true, description: 'Create a spec file.' },
  },
});

export function getConfigForSchematic(schematic: string) {
  const schematicConfig = {};

  if (config.all[schematic]) {
    for (const iterator of Object.keys(config.all[schematic])) {
      schematicConfig[iterator] = config.all[schematic][iterator].value;
    }
  }

  return schematicConfig;
}
