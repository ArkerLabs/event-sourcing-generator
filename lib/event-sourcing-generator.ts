#!/usr/bin/env node
import commander = require('commander');

import { createConfigCommand } from './actions/config.action';
import { helpAction } from './actions/help.action';
import { generateCommands } from './utils/commands-generator';

(async () => {
  const program = new commander.Command();
  program
    .description('A CLI for generating classes for CQRS + ES for NestJS')
    .version('1.1.0');

  const configCommand = new commander.Command('config').action(() =>
    configCommand.outputHelp(),
  );

  program.addCommand(configCommand);

  createConfigCommand(configCommand);
  await generateCommands(program);

  await program.parseAsync(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp(helpAction);
  }
})()
  .then()
  .catch(err => console.error(err));
