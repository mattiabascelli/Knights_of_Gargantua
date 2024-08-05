import { Injectable, signal } from '@angular/core';

import { InputPromisesQueueItem, PromisesQueue, PromisesQueueItem } from '@/common/queue';
import { GameEvent, generateGameEvent } from '../events';

@Injectable({
  providedIn: 'root'
})
export class GameFlowService {

  event = signal<GameEvent | null>(null);
  private queue = new PromisesQueue({
    autoDequeue: true,
    beforeEach: this.beforeEachAction.bind(this),
  });

  nextEvent(seed?: number) {
    this.queue.add('Trigger next game event', () => {

      // TODO: Remove
      console.log('Resolving next game event. Seed = ', seed);

      const gameEvent = generateGameEvent(seed);
      console.log(gameEvent);
      this.event.set(gameEvent);
    });
  }

  enqueue(
    actionOrMessage: InputPromisesQueueItem | InputPromisesQueueItem['message'],
    inputFn?: InputPromisesQueueItem['fn'],
  ) {
    this.queue.add(actionOrMessage, inputFn);
  }

  enqueueDebounced(
    actionOrMessage: InputPromisesQueueItem | InputPromisesQueueItem['message'],
    inputFn?: InputPromisesQueueItem['fn'],
  ) {
    this.queue.addDebounced(actionOrMessage, inputFn);
  }

  beforeEachAction(action: PromisesQueueItem) {
    this.log(action.message);
  }

  log(message: string): void {
    const t = (new Date()).toISOString();
    console.log(`[Knights of Gargantua] [${t}] ${message}`);
  }
}
