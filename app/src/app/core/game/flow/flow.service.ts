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
    autoDequeue: true,
    beforeEach: this.beforeEachAction.bind(this),
  });

  nextEvent(seed?: number) {
    this.queue.add({
      name: 'Trigger next game event',
      fn: () => {
        const gameEvent = generateGameEvent(seed);
        console.log(gameEvent);
        this.event.set(gameEvent);
        return Promise.resolve();
      },
    });
  }

  enqueue(action: ActionsQueueItem) {
    this.queue.add(action);
  }

  enqueueDebounced(action: ActionsQueueItem) {
    this.queue.addDebounced(action);
  }

  beforeEachAction(action: ActionsQueueItem) {
    this.log(action.name);
  }

  log(message: string): void {
    const t = (new Date()).toISOString();
    console.log(`[GameFlow] [${t}] ${message}`);
  }
}