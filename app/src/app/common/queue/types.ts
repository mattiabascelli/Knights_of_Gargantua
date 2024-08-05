export type ActionsQueueItem<T = any> = {
  name: string;
  fn: () => Promise<T>;
};

export type ActionsQueueConfig = {
  autoDequeue?: boolean;
  beforeEach?: (action: ActionsQueueItem) => void;
  afterEach?: (action: ActionsQueueItem) => void;
};

export enum ActionsQueueState {
  Empty = 'empty',
  Pending = 'pending',
  Done = 'done',
}