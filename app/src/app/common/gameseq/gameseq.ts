import { GameSeqQueue } from './queue';
import { GameSeqEvent, GameSeqEventWithoutPayloadCreator, GameSeqEventWithPayloadCreator } from './types';

export const GAME_SEQ_EVENT_NAME = 'gameSeqEvent';

export class GameSeq<TName extends string> {

  private gameEventName: string;
  private _destroy = new AbortController();
  private queue!: GameSeqQueue;

  // TODO: Better typing
  private eventHandlers = new Map<
    TName,
    (
      event: GameSeqEvent<TName>,
      trigger: (event: GameSeqEvent<TName>, config?: { debounced?: boolean }) => void,
    ) => void
  >();

  constructor(
    private rootElement: HTMLElement,
    queue?: GameSeqQueue,
    gameEventPrefix?: string,
  ) {
    this.gameEventName = this.buildGameEventName(gameEventPrefix);
    this.queue = this.queue ?? new GameSeqQueue({ autoDequeue: true });
  }

  init() {
    this.rootElement.addEventListener(
      this.gameEventName,
      this.eventsHandler.bind(this) as unknown as EventListener,
      { signal: this._destroy.signal },
    );
  }

  on(
    eventName: TName,
    handler: (
      event: GameSeqEvent<TName>,
      trigger: (event: GameSeqEvent<TName>, config?: { debounced?: boolean }) => void,
    ) => void,
  ): GameSeq<TName> {
    this.eventHandlers.set(eventName, handler);
    return this;
  }

  destroy() {
    this._destroy.abort();
  }

  event(
    name: TName
  ): GameSeqEventWithoutPayloadCreator<TName, undefined> {
    return () => ({ name, payload: undefined });
  }

  eventWithPayload<TPayload = any>(
    name: TName
  ): GameSeqEventWithPayloadCreator<TName, TPayload> {
    return (payload: TPayload) => ({ name, payload });
  }

  trigger(event: GameSeqEvent<TName>, config?: { debounced?: boolean }) {
    if (!!config?.debounced) {
      this.queue.addDebounced(event.name, () => this._trigger(event));
    } else {
      this.queue.add(event.name, () => this._trigger(event));
    }
  }

  private buildGameEventName(prefix?: string): string {
    if (!prefix || prefix === GAME_SEQ_EVENT_NAME) {
      return GAME_SEQ_EVENT_NAME;
    }

    return `${GAME_SEQ_EVENT_NAME}:${prefix}`;
  }

  private eventsHandler(event: CustomEvent<GameSeqEvent<TName>>): void {
    const handler = this.eventHandlers.get(event.detail.name);
    if (handler) {
      handler(event.detail, this.trigger.bind(this));
    }
  }

  private _trigger(event: GameSeqEvent<TName>) {
    this.rootElement.dispatchEvent(
      new CustomEvent<GameSeqEvent<TName>>(
        this.gameEventName,
        { detail: event },
      )
    );
  }
}
