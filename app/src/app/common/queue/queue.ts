import { ActionsQueueItem, ActionsQueueConfig, ActionsQueueState } from './types';

export class ActionsQueue {
  private isPending = false;
  private queue: ActionsQueueItem[] = [];
  private debug = false;
  private autoDequeue = true;

  constructor(config?: ActionsQueueConfig) {
    this.debug = !!config?.debug || false;
    this.autoDequeue = !!config?.autoDequeue || false;
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
    this.log(action);
    await action.fn();
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
      this.log(action);
      await action.fn();
    }
    this.isPending = false;
    return ActionsQueueState.Done;
  }

  private log(action: ActionsQueueItem): void {
    if (!this.debug) {
      return;
    }

    const timestamp = (new Date()).toISOString();
    console.log(`[ActionsQueue] [${timestamp}] ${action.name}`);
  }
}