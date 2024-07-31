import { Injectable, signal } from '@angular/core';

import { ActionsQueue } from '@/common/queue/queue';
import { ActionsQueueItem } from '@/common/queue/types';
import { GameEvent, generateGameEvent } from '../events';

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
