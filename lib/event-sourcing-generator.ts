#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
import commander = require('commander');

import { createConfigCommand } from './actions/config.action';
import { helpAction } from './actions/help.action';
import { generateCommands } from './utils/commands-generator';

const pkgJson = require('../package.json');

(async () => {
  const program = new commander.Command();
  program
    .usage('[command] [options]')
    .description('A CLI for generating classes for CQRS + ES for NestJS')
    .version(pkgJson.version);

  const configCommand = new commander.Command('config').action(() =>
    configCommand.outputHelp(),
  );

  program.addCommand(configCommand);

  createConfigCommand(configCommand);
  await generateCommands(program);

  if (process.argv.length < 3) {
    program.help(helpAction);
  }
  await program.parseAsync(process.argv);

})()
  .then()
  .catch(err => console.error(err));
