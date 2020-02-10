#!/usr/bin/env node
import * as program from 'commander';
import { Generator } from './generator';

const generate = async (type: 'command'|'event'|'query', domain: string, name: string, output: string): Promise<void> => {
    const generator = new Generator();
    if (type === 'command') {
        await generator.generate('command', domain, name, output);
        await generator.generate('command-handler', domain, name, output);
    } else if (type === 'query') {
        await generator.generate('query', domain, name, output);
        await generator.generate('query-handler', domain, name, output);
    } else {
        await generator.generate('event', domain, name, output);
        await generator.generate('event-handler', domain, name, output);
        await generator.generate('view-updater', domain, name, output);
    }
    console.log('Generated!');
};

(async () => {
    program
        .version('1.0.2')
        .description("A CLI for generating classes for CQRS + ES for NestJS")
        .requiredOption('-t, --type <type>', '[command|event|query]', (value, previous) => {
            if (value !== 'command' && value !== 'event' && value !== 'query') {
                throw new Error('Type not valid');
            }
            return value;
        })
        .requiredOption('-n, --classname <name>', 'Name')
        .requiredOption('-d, --domain <name>', 'Specify domain name')
        .requiredOption('-o, --output <dir>', 'Output directory', '.')
        .parse(process.argv);

    await generate(program.type, program.domain, program.classname, program.output);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
})();