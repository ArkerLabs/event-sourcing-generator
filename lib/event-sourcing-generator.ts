#!/usr/bin/env node
import commander = require('commander');
import { createConfigCommand } from './actions/config.action';
import { helpAction } from './actions/help.action';
import { generateCommands } from './utils/commands-generator';

/* eslint-disable @typescript-eslint/no-var-requires */
const pkgJson = require('../package.json');

(async () => {
  const program = new commander.Command();
  program
    .usage('[command] [options]')
    .description('A CLI for generating classes for CQRS + ES for NestJS')
    .version(pkgJson.version);
  
  program.command("info").alias("i").description("Show CLI Info.").action(helpAction);
  const configCommand = new commander.Command('config').action(() =>
    configCommand.outputHelp(),
  );

  program.addCommand(configCommand);

  createConfigCommand(configCommand);
  await generateCommands(program);

  await program.parseAsync(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
})()
  .then()
  .catch(err => console.error(err));


