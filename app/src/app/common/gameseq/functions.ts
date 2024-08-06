import { GameSeqEvent } from './types';

export function gameSeqEventsCreator<TName extends string>() {
  return {

    plain: (
      name: TName,
    ): GameSeqEvent<TName, undefined> => {
      return { name, payload: undefined };
    },

    payload: <TPayload extends any>(
      name: TName,
      payload: TPayload,
    ): GameSeqEvent<TName, TPayload> => {
      return { name, payload };
    },

  };
}
