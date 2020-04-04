import chalk = require('chalk');
import { config } from './config.store';
import prettyjson = require('prettyjson');

export function prettyPrintConfigValues() {
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
