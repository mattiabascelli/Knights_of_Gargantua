export type InputGameSeqQueueItem<T = any> = {
  message: string;
  fn: (() => Promise<T>) | (() => T);
};

export type GameSeqQueueItem<T = any> = {
  message: string;
  fn: () => Promise<T>;
};

export type GameSeqQueueConfig = {
  autoDequeue?: boolean;
  pauseBetweenEvents?: number;
  beforeEach?: (action: GameSeqQueueItem) => void;
  afterEach?: (action: GameSeqQueueItem) => void;
};

export enum GameSeqQueueState {
  Empty = 'empty',
  Pending = 'pending',
  Done = 'done',
}

export type GameSeqEvent<TName extends string, TPayload = any> = {
  name: TName;
  payload: TPayload;
};

export type GameSeqEventWithoutPayloadCreator<TName extends string, TPayload = any> = (
  () => GameSeqEvent<TName, TPayload>
);

export type GameSeqEventWithPayloadCreator<TName extends string, TPayload = any> = (
  (payload: TPayload) => GameSeqEvent<TName, TPayload>
);

export type GameSeqEventCreator<TName extends string, TPayload = any> = (
  | GameSeqEventWithoutPayloadCreator<TName, TPayload>
  | GameSeqEventWithPayloadCreator<TName, TPayload>
);