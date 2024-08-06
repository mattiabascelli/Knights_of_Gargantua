export type InputPromisesQueueItem<T = any> = {
  message: string;
  fn: (() => Promise<T>) | (() => T);
};

export type PromisesQueueItem<T = any> = {
  message: string;
  fn: () => Promise<T>;
};

export type PromisesQueueConfig = {
  autoDequeue?: boolean;
  pauseBetweenEvents?: number;
  beforeEach?: (action: PromisesQueueItem) => void;
  afterEach?: (action: PromisesQueueItem) => void;
};

export enum PromisesQueueState {
  Empty = 'empty',
  Pending = 'pending',
  Done = 'done',
}
