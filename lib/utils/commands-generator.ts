import commander = require('commander');
import jsonfile = require('jsonfile');

import { bashCommand } from './bash';
import { config, getConfigForSchematic } from './config.store';

export const generateCommands = async (program: commander.Command) => {
  //todo cambiar al binario de node modules
  const result = await bashCommand(
    `./node_modules/@angular-devkit/schematics-cli/bin/schematics.js ./node_modules/${config.get('collection')}:.`,
    ['--list-schematics'],
    true,
  );

  const schematics: string[] = result.toString().split('\n');
  const filteredSchematics = schematics.filter(val => val !== '');
  filteredSchematics.map(schematic => {
    const file = `./node_modules/${config.get(
      'collection',
    )}/dist/${schematic}/schema.json`;

    const schema = jsonfile.readFileSync(file);

    const properties = schema['properties'];


    let optionString = "";
    Object.keys(properties).forEach(key => {
        if(properties[key].$default && properties[key].$default.$source){
            optionString += `[${key}] `;
        }
      });

    const cmd = program.command(`${schematic} ${optionString}`);
      cmd.description(schema["description"]);
    const options = getConfigForSchematic(schematic);

    const args: string[] = parseCommandOptions(options);
    Object.keys(properties).forEach(key => {
      cmd.option('--' + key, properties[key].description);
    });
    cmd.option("--dry-run", "Run the schematic without merging it with the current file tree.", false);

    cmd.action(async (name:string, module:string, cmd) => {
        if(!cmd.dryRun){
            args.push("--debug=false");
        }
        
        const allArgs = [];
        allArgs.push(name);
        allArgs.push(module);
        allArgs.push(...args);
        

      await bashCommand(
        `./node_modules/@angular-devkit/schematics-cli/bin/schematics.js ./node_modules/${config.get('collection')}:${schematic}`,
        allArgs,
      );
    });
  });
};

export function parseCommandOptions(options: any): string[] {
  const args = [];
  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      const element = options[key];

      args.push(`--${key}=${element}`);
    }
  }

  return args;
}
