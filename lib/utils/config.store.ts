/* eslint-disable @typescript-eslint/no-var-requires */
import configStore = require('configstore');

const packageJson = require('../../package.json');

export const config = new configStore(packageJson.name, {
  collection: '@arkerlabs/es-schematics',
  event: {
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
