import chalk = require('chalk');
import { ChildProcess, spawn } from 'child_process';

export const bashCommand = async (
  command: string,
  args: string[],
  collect = false,
  cwd = process.cwd()
) => {
  return new Promise<null | string>((resolve, reject) => {
        
    console.log(cwd);
    console.log("calling "+ command + "with args " + args);

    const child: ChildProcess = spawn(command, args, {
      shell: true,
      stdio: collect ? 'pipe' : 'inherit',
      cwd: cwd
    });

    
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
