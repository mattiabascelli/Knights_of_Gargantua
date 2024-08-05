export type ActionsQueueItem<T = any> = {
  name: string;
  fn: () => Promise<T>;
};

export type ActionsQueueConfig = {
  debug?: boolean;
  autoDequeue?: boolean;
};

export enum ActionsQueueState {
  Empty = 'empty',
  Pending = 'pending',
  Done = 'done',
}