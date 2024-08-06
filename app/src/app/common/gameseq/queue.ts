import { wait } from '../functions';
import { GameSeqQueueItem, GameSeqQueueConfig, GameSeqQueueState, InputGameSeqQueueItem } from './types';

export function createGameSeqQueueItem<T = any>(
  message: string,
  fn: () => Promise<T>,
) {
  return { message, fn };
}

export class GameSeqQueue {

  // State
  private isPending = false;
  private queue: GameSeqQueueItem[] = [];

  // Config
  private autoDequeue = true;
  private pauseBetweenEvents = 0;
  private beforeEach: GameSeqQueueConfig['beforeEach'];
  private afterEach: GameSeqQueueConfig['afterEach'];

  constructor(config?: GameSeqQueueConfig) {
    this.autoDequeue = !!config?.autoDequeue || true;
    this.pauseBetweenEvents = config?.pauseBetweenEvents ?? 0;
    this.beforeEach = config?.beforeEach ?? undefined;
    this.afterEach = config?.afterEach ?? undefined;
  }

  add(
    actionOrMessage: InputGameSeqQueueItem | InputGameSeqQueueItem['message'],
    inputFn?: InputGameSeqQueueItem['fn'],
  ): Promise<GameSeqQueueState> {
    const action = this.mapToGameSeqQueueItem(actionOrMessage, inputFn);
    this.queue.push(action);

    if (this.autoDequeue) {
      return this._dequeueAll();
    }

    return Promise.resolve(GameSeqQueueState.Done);
  }

  addDebounced(
    actionOrMessage: InputGameSeqQueueItem | InputGameSeqQueueItem['message'],
    inputFn?: InputGameSeqQueueItem['fn'],
  ): Promise<GameSeqQueueState> {
    if (this.isPending) {
      return Promise.resolve(GameSeqQueueState.Pending);
    }
    const action = this.mapToGameSeqQueueItem(actionOrMessage, inputFn);
    return this.add(action);
  }

  async dequeueOne(): Promise<GameSeqQueueState> {
    this.checkManualDequeueing();
    return this._dequeueOne();
  }

  async dequeueAll(): Promise<GameSeqQueueState> {
    this.checkManualDequeueing();
    return this._dequeueAll();
  }

  private checkManualDequeueing(): void {
    if (this.autoDequeue) {
      throw new Error(
        'You cannot manually call dequeue() when "autoDequeue" is enabled'
      );
    }
  }

  private async _dequeueOne(): Promise<GameSeqQueueState> {
    if (this.isPending) {
      return Promise.resolve(GameSeqQueueState.Pending);
    }

    if (this.queue.length === 0) {
      return Promise.resolve(GameSeqQueueState.Empty);
    }

    this.isPending = true;
    const action = this.queue.shift()!;
    await this.resolveAction(action);
    this.isPending = false;

    return GameSeqQueueState.Done;
  }

  private async _dequeueAll(): Promise<GameSeqQueueState> {

    if (this.isPending) {
      return Promise.resolve(GameSeqQueueState.Pending);
    }

    if (this.queue.length === 0) {
      return Promise.resolve(GameSeqQueueState.Empty);
    }

    this.isPending = true;
    while (this.queue.length > 0) {
      const action = this.queue.shift()!;
      await this.resolveAction(action);
    }

    this.isPending = false;
    return GameSeqQueueState.Done;
  }

  private async resolveAction(action: GameSeqQueueItem): Promise<void> {
    if (this.beforeEach) {
      this.beforeEach(action);
    }

    await action.fn();

    if (this.afterEach) {
      this.afterEach(action);
    }

    if (this.pauseBetweenEvents) {
      await wait(this.pauseBetweenEvents);
    }
  }

  private mapToGameSeqQueueItem(
    actionOrMessage: InputGameSeqQueueItem | InputGameSeqQueueItem['message'],
    inputFn?: InputGameSeqQueueItem['fn'],
  ): GameSeqQueueItem {
  
    const isFirstArgString = typeof actionOrMessage === 'string';
    const isInputFn = !!inputFn;
  
    if (isFirstArgString && isInputFn) {
      return {
        message: actionOrMessage,
        fn: () => Promise.resolve(inputFn()),
      };
    }
  
    if (!isFirstArgString && !isInputFn) {
      return {
        message: actionOrMessage.message,
        fn: () => Promise.resolve(actionOrMessage.fn()),
      };
    }
  
    throw new Error('Invalid input');
  }
}
