import { ActionsQueueItem, ActionsQueueConfig, ActionsQueueState } from './types';

export class ActionsQueue {

  // State
  private isPending = false;
  private queue: ActionsQueueItem[] = [];

  // Config
  private autoDequeue = true;
  private beforeEach: ActionsQueueConfig['beforeEach'];
  private afterEach: ActionsQueueConfig['afterEach'];

  constructor(config?: ActionsQueueConfig) {
    this.autoDequeue = !!config?.autoDequeue || false;
    this.beforeEach = config?.beforeEach ?? undefined;
    this.afterEach = config?.afterEach ?? undefined;
  }

  add(action: ActionsQueueItem): Promise<ActionsQueueState> {
    this.queue.push(action);

    if (this.autoDequeue) {
      return this._dequeueAll();
    }

    return Promise.resolve(ActionsQueueState.Done);
  }

  addDebounced(action: ActionsQueueItem): Promise<ActionsQueueState> {
    if (this.isPending) {
      return Promise.resolve(ActionsQueueState.Pending);
    }
    return this.add(action);
  }

  async dequeueOne(): Promise<ActionsQueueState> {
    this.checkManualDequeueing();
    return this._dequeueOne();
  }

  async dequeueAll(): Promise<ActionsQueueState> {
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

  private async _dequeueOne(): Promise<ActionsQueueState> {
    if (this.isPending) {
      return Promise.resolve(ActionsQueueState.Pending);
    }

    if (this.queue.length === 0) {
      return Promise.resolve(ActionsQueueState.Empty);
    }

    this.isPending = true;
    const action = this.queue.shift()!;
    await this.resolveAction(action);
    this.isPending = false;

    return ActionsQueueState.Done;
  }

  private async _dequeueAll(): Promise<ActionsQueueState> {

    if (this.isPending) {
      return Promise.resolve(ActionsQueueState.Pending);
    }

    if (this.queue.length === 0) {
      return Promise.resolve(ActionsQueueState.Empty);
    }

    this.isPending = true;
    while (this.queue.length > 0) {
      const action = this.queue.shift()!;
      await this.resolveAction(action);
    }

    this.isPending = false;
    return ActionsQueueState.Done;
  }

  private async resolveAction(action: ActionsQueueItem): Promise<void> {
    if (this.beforeEach) {
      this.beforeEach(action);
    }

    await action.fn();

    if (this.afterEach) {
      this.afterEach(action);
    }
  }
}