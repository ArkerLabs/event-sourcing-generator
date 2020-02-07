import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { %className%Command } from '../impl/%name%.command';
import { StoreEventBus } from 'event-sourcing-nestjs';

@CommandHandler(%className%Command)
export class %className%Handler implements ICommandHandler<%className%Command> {

    constructor(
        private readonly eventBus: StoreEventBus,
    ) {}

    async execute(command: %className%Command) {
        
    }

}
