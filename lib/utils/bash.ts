import chalk = require('chalk');
import { ChildProcess, spawn } from 'child_process';

export const bashCommand = async (
  command: string,
  args: string[],
  collect = false,
) => {
  return new Promise<null | string>((resolve, reject) => {
    const child: ChildProcess = spawn(command, args, {
      shell: true,
      stdio: collect ? 'pipe' : 'inherit',
      cwd: process.cwd()
    });
    
    console.log(process.cwd());
    console.log("calling "+ command + "with args " + args);
    
    if (collect) {
      child.stdout.on('data', data =>
        resolve(data.toString()),
      );
    }

    child.on('close', code => {
      if (code === 0) {
        resolve(null);
      } else {
        console.error(chalk.red('error: code '+ code));
        reject();
      }
    });
  });
};
