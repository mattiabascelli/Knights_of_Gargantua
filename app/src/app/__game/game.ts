import { GameSeq } from '@/common/gameseq';
import { KogEvent } from './events';
import { registerKogGameHandlers } from './handlers';

export function createGame(): GameSeq<KogEvent> {
  const game = new GameSeq<KogEvent>();
  registerKogGameHandlers(game);
  return game;
}
