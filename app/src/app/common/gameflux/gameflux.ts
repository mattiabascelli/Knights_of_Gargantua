import { PromisesQueue } from '../queue';

export const GAMEFLUX_EVENT = 'gameFluxEvent';

export type GamefluxEvent<TName extends string, TPayload = any> = {
  name: TName;
  payload: TPayload;
};

export type GamefluxEventWithoutPayloadCreator<TName extends string, TPayload = any> = (
  () => GamefluxEvent<TName, TPayload>
);

export type GamefluxEventWithPayloadCreator<TName extends string, TPayload = any> = (
  (payload: TPayload) => GamefluxEvent<TName, TPayload>
);

export type GamefluxEventCreator<TName extends string, TPayload = any> = (
  | GamefluxEventWithoutPayloadCreator<TName, TPayload>
  | GamefluxEventWithPayloadCreator<TName, TPayload>
);

export class Gameflux<TName extends string> {

  private _destroy = new AbortController();
  private eventHandlers = new Map<
    TName,
    (
      event: GamefluxEvent<TName>,
      trigger: (event: GamefluxEvent<TName>, config?: { debounced?: boolean }) => void,
    ) => void
  >();

  constructor(
    private rootElement: HTMLElement,
    private queue: PromisesQueue,
  ) {}

  init() {
    this.rootElement.addEventListener(
      GAMEFLUX_EVENT,
      this.eventsHandler.bind(this) as unknown as EventListener,
      { signal: this._destroy.signal },
    );
  }

  on(
    eventName: TName,
    handler: (
      event: GamefluxEvent<TName>,
      trigger: (event: GamefluxEvent<TName>, config?: { debounced?: boolean }) => void,
    ) => void,
  ): Gameflux<TName> {
    this.eventHandlers.set(eventName, handler);
    return this;
  }

  destroy() {
    this._destroy.abort();
  }

  event(
    name: TName
  ): GamefluxEventWithoutPayloadCreator<TName, undefined> {
    return () => ({ name, payload: undefined });
  }

  eventWithPayload<TPayload = any>(
    name: TName
  ): GamefluxEventWithPayloadCreator<TName, TPayload> {
    return (payload: TPayload) => ({ name, payload });
  }

  trigger(event: GamefluxEvent<TName>, config?: { debounced?: boolean }) {
    if (!!config?.debounced) {
      this.queue.addDebounced(event.name, () => this._trigger(event));
    } else {
      this.queue.add(event.name, () => this._trigger(event));
    }
  }

  private eventsHandler(event: CustomEvent<GamefluxEvent<TName>>): void {

    // TODO: Remove
    console.log('Gameflux.eventsHandler', event.detail.name, event.detail.payload);

    const handler = this.eventHandlers.get(event.detail.name);
    if (handler) {
      handler(event.detail, this.trigger.bind(this));
    }
  }

  private _trigger(event: GamefluxEvent<TName>) {
    this.rootElement.dispatchEvent(
      new CustomEvent<GamefluxEvent<TName>>(
        GAMEFLUX_EVENT,
        { detail: event },
      )
    );
  }
}
