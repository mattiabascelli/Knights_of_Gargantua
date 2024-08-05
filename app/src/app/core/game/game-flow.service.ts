import { Injectable, signal } from '@angular/core';

import { generateGameEvent } from './events/generate-game-event';
import { GameEvent } from './events/types';
import { ActionsQueue } from '@/common/queue/queue';
import { ActionsQueueItem } from '@/common/queue/types';

@Injectable({
  providedIn: 'root'
})
export class GameFlowService {

  event = signal<GameEvent | null>(null);
  private queue = new ActionsQueue({
    debug: true,
    autoDequeue: true,
  });

  nextEvent(seed?: number) {
    this.queue.add({
      name: 'GameFlowService.nextEvent',
      fn: () => {
        const gameEvent = generateGameEvent(seed);
        this.event.set(gameEvent);
        return Promise.resolve();
      },
    });
  }

  enqueue(action: ActionsQueueItem) {
    this.queue.add(action);
  }
}
