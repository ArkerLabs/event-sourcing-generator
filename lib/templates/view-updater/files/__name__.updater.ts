import { IViewUpdater, ViewUpdaterHandler } from 'event-sourcing-nestjs';
import { %className%Event } from '../impl/%name%.event';

@ViewUpdaterHandler(%className%Event)
export class %className%Updater implements IViewUpdater<%className%Event> {

    async handle(event: %className%Event) {
    }
}
