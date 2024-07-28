import { Injectable, signal } from '@angular/core';

import { generateGameEvent } from './events/generate-game-event';
import { GameEvent } from './events/types';

@Injectable({
  providedIn: 'root'
})
export class GameFlowService {

  event = signal<GameEvent | null>(null);

  nextEvent(seed?: number) {
    const gameEvent = generateGameEvent(seed);
    this.event.set(gameEvent);
    console.log('GameFlowService.nextEvent()', gameEvent); // TODO: Remove
  }
}
