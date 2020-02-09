#!/usr/bin/env node
import * as program from 'commander';
import { Generator } from './generator';

const generate = async (type: 'command'|'event'|'query', domain: string, name: string): Promise<void> => {
    const generator = new Generator();
    if (type === 'command') {
        await generator.generate('command', domain, name);
        await generator.generate('command-handler', domain, name);
    } else if (type === 'query') {
        await generator.generate('query', domain, name);
        await generator.generate('query-handler', domain, name);
    } else {
        await generator.generate('event', domain, name);
        await generator.generate('event-handler', domain, name);
        await generator.generate('view-updater', domain, name);
    }
    console.log('Generated!');
};

(async () => {
    program
        .version('1.0.1')
        .description("A CLI for generating classes for CQRS + ES for NestJS")
        .requiredOption('-t, --type <type>', '[command|event|query]', (value, previous) => {
            if (value !== 'command' && value !== 'event' && value !== 'query') {
                throw new Error('Type not valid');
            }
            return value;
        })
        .requiredOption('-n, --classname <name>', 'Name')
        .requiredOption('-d, --domain <name>', 'Specify domain name')
        .parse(process.argv);

    await generate(program.type, program.domain, program.classname);

    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
})();