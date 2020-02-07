import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { %className%Event } from '../impl/%name%.event';

@EventsHandler(%className%Event)
export class %className%Handler implements IEventHandler<%className%Event> {

    handle(event: %className%Event) {
    }
}
