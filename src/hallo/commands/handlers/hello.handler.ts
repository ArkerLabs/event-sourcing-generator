import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HelloCommand } from '../impl/hello.command';
import { StoreEventBus } from 'event-sourcing-nestjs';

@CommandHandler(HelloCommand)
export class HelloHandler implements ICommandHandler<HelloCommand> {

    constructor(
        private readonly eventBus: StoreEventBus,
    ) {}

    async execute(command: HelloCommand) {

    }

}
