import { mapToPromisesQueueItem } from './functions';
import { PromisesQueueItem, PromisesQueueConfig, PromisesQueueState, InputPromisesQueueItem } from './types';

export class PromisesQueue {

  // State
  private isPending = false;
  private queue: PromisesQueueItem[] = [];

  // Config
  private autoDequeue = true;
  private beforeEach: PromisesQueueConfig['beforeEach'];
  private afterEach: PromisesQueueConfig['afterEach'];

  constructor(config?: PromisesQueueConfig) {
    this.autoDequeue = !!config?.autoDequeue || false;
    this.beforeEach = config?.beforeEach ?? undefined;
    this.afterEach = config?.afterEach ?? undefined;
  }

  add(
    actionOrMessage: InputPromisesQueueItem | InputPromisesQueueItem['message'],
    inputFn?: InputPromisesQueueItem['fn'],
  ): Promise<PromisesQueueState> {
    const action = mapToPromisesQueueItem(actionOrMessage, inputFn);
    this.queue.push(action);

    if (this.autoDequeue) {
      return this._dequeueAll();
    }

    return Promise.resolve(PromisesQueueState.Done);
  }

  addDebounced(
    actionOrMessage: InputPromisesQueueItem | InputPromisesQueueItem['message'],
    inputFn?: InputPromisesQueueItem['fn'],
  ): Promise<PromisesQueueState> {
    if (this.isPending) {
      return Promise.resolve(PromisesQueueState.Pending);
    }
    const action = mapToPromisesQueueItem(actionOrMessage, inputFn);
    return this.add(action);
  }

  async dequeueOne(): Promise<PromisesQueueState> {
    this.checkManualDequeueing();
    return this._dequeueOne();
  }

  async dequeueAll(): Promise<PromisesQueueState> {
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

  private async _dequeueOne(): Promise<PromisesQueueState> {
    if (this.isPending) {
      return Promise.resolve(PromisesQueueState.Pending);
    }

    if (this.queue.length === 0) {
      return Promise.resolve(PromisesQueueState.Empty);
    }

    this.isPending = true;
    const action = this.queue.shift()!;
    await this.resolveAction(action);
    this.isPending = false;

    return PromisesQueueState.Done;
  }

  private async _dequeueAll(): Promise<PromisesQueueState> {

    if (this.isPending) {
      return Promise.resolve(PromisesQueueState.Pending);
    }

    if (this.queue.length === 0) {
      return Promise.resolve(PromisesQueueState.Empty);
    }

    this.isPending = true;
    while (this.queue.length > 0) {
      const action = this.queue.shift()!;
      await this.resolveAction(action);
    }

    this.isPending = false;
    return PromisesQueueState.Done;
  }

  private async resolveAction(action: PromisesQueueItem): Promise<void> {
    if (this.beforeEach) {
      this.beforeEach(action);
    }

    await action.fn();

    if (this.afterEach) {
      this.afterEach(action);
    }
  }
}
