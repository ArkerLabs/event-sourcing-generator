import chalk = require('chalk');
import commander = require('commander');
import inquirer = require('inquirer');
import { config } from '../utils/config.store';
import path = require('path');
import { prettyPrintConfigValues } from '../utils/config-printer';
import { getLibPath } from '../utils/bin-utils';

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

      const schematicConfigCmd = program.command(`${schematic}`).description(options.description || "");

      schematicConfigCmd.action(async () => {
        const questions = [];

        if (options.type) {
          questions.push({
            type: options.type,
            name: schematic,
            message: options.description,
            default: options.value,
          });
        } else {
          for (const option in options) {
            if (options.hasOwnProperty(option) && option !== "description") {
              const value = options[option];
              questions.push({
                type: value.type,
                name: option,
                message: value.description,
                default: value.value,
              });
            }
          }
        }

        const response = await inquirer.prompt(questions);

        for (const option in response) {
          if (
            schematic === 'collection' && option === "name" &&
            config.all[schematic] &&
            config.all[schematic].name &&
            config.all[schematic].name.value
          ) {
            try {
              getLibPath(
                path.join(response[option]),
              );
              config.set(`${schematic}.name.value`, response[option]);
            } catch (error) {
              console.error(
                chalk.redBright(
                  `The collection ${response[option]} is not installed in the current project. Please install it using npm i ${response[option]}`,
                ),
              );
            }
          } else {
            config.set(`${schematic}.${option}.value`, response[option]);
          }
        }
      });
    }
  }
}

