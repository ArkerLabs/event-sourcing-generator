import commander = require('commander');
import jsonfile = require('jsonfile');
import * as glob from 'glob-promise';
import * as path from 'path';
import { bashCommand } from './bash-comand';
import { getBinaryPath, getLibPath } from './bin-utils';
import { parseCommandOptions } from './command-options-parser';
import { config, getConfigForSchematic } from './config.store';


export const generateCommands = async (program: commander.Command) => {
  //todo cambiar al binario de node modules
  const result = await bashCommand(
    `${getBinaryPath('schematics')} ${config.get('collection.name').value}:.`,
    ['--list-schematics'],
    true,
  );

  const schematics: string[] = result.toString().split('\n');
  const filteredSchematics = schematics.filter(val => val !== '');
  filteredSchematics.map(async schematic => {
    const schematicDirPath: string = path.join(
      getLibPath(config.get('collection.name').value),
      config.get('collection.outDir').value,
    );

    //start searching on the collection package dir and return the absolute path. Important for the jsonfile
    const files = glob.sync(`**/${schematic}/schema.json`, {
      cwd: schematicDirPath,
      absolute: true,
    });

    if (files.length >= 0 && files[0]) {
      try {
        const schema = jsonfile.readFileSync(files[0]);
        const properties = schema['properties'];
        let optionString = '';
        const cmdArgsKeys = [];
        Object.keys(properties).forEach(key => {
          if (properties[key].$default && properties[key].$default.$source) {
            cmdArgsKeys.push(key);
            optionString += `[${key}] `;
          }
        });

        const cmd = program
          .command(`${schematic} ${optionString}`)
          .passCommandToAction(true)
          .storeOptionsAsProperties(true)
        cmd
          .description(schema['description'])


        const options = getConfigForSchematic(schematic);

        const args: string[] = parseCommandOptions(options);
        Object.keys(properties).forEach(key => {
          cmd.option('--' + key, properties[key].description);
        });
        cmd.option(
          '--dry-run',
          'Run the schematic without merging it with the current file tree.',
          false,
        );
        cmd.action(async () => {
          if (!cmd.dryRun) {
            args.push('--debug=false');
          }

          const allArgs = [];
          for (let i = 0; i < cmd.args.length; i++) {
            if(i < cmdArgsKeys.length){
              allArgs.push(cmd.args[i])
            }
          }

          allArgs.push(...args);

          await bashCommand(
            `${getBinaryPath('schematics')} ${config.get('collection.name').value}:${schematic}`,
            allArgs,
            false,
          );
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  });
};


