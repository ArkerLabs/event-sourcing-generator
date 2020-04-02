import chalk = require('chalk');
import commander = require('commander');
import inquirer = require('inquirer');
import prettyjson = require('prettyjson');

import { config } from '../utils/config.store';

export function createConfigCommand(program: commander.Command) {
  const listCmd = new commander.Command('list')
    .description('List the avaliable configuration options.')
    .action(() => {
      prettyPrintConfigValues();
    });

  program.addCommand(listCmd);

  for (const schematic in config.all) {
    if (config.all.hasOwnProperty(schematic)) {
      const options = config.all[schematic];

      const schematicConfigCmd = program.command(`${schematic}`);

      schematicConfigCmd.action(async () => {
        const questions = [];
        for (const option in options) {
          if (options.hasOwnProperty(option)) {
            const value = options[option];
            questions.push({
              type: value.type,
              name: option,
              message: value.description,
              default: false,
            });
          }
        }

        const response = await inquirer.prompt(questions);

        for (const option in response) {
          config.set(`${schematic}.${option}.value`, response[option]);
        }
      });
    }
  }
}

function prettyPrintConfigValues() {
  console.log(chalk.blue('CONFIG'));
  const printObject = {};
  Object.keys(config.all).map(val => {
    if (typeof config.all[val] == 'object') {
      const subObject = {};
      for (const iterator of Object.keys(config.all[val])) {
        subObject[iterator] = config.all[val][iterator].value;
      }
      printObject[val] = subObject;
    } else {
      printObject[val] = config.all[val];
    }
  });
  console.log(prettyjson.render(printObject, { noColor: false }));
}
