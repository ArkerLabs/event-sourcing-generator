import { StorableEvent } from 'event-sourcing-nestjs';

export class %className%Event extends StorableEvent {

    eventAggregate = '';
    eventVersion = 1;

    constructor(
        public readonly id: string,
    ) {
        super();
    }
}
