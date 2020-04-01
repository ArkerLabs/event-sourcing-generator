import * as chalk from 'chalk';
import * as figlet from 'figlet';

export const helpAction = (msg: string): string => {

  const logo = chalk.blueBright(
    figlet.textSync('es-generator ', { horizontalLayout: 'full' }),
  );

  return logo + '\n\n\n' + msg;
};
