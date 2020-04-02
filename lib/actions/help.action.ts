import * as chalk from 'chalk';
import * as figlet from 'figlet';

export const helpAction = () => {
  const logo = chalk.blueBright(
    figlet.textSync('es-generator ', { horizontalLayout: 'full' }),
  );

  console.log(logo);
  console.log('\n');
  console.log(chalk.magenta("Made with 💙 by ArkerLabs."));

};
