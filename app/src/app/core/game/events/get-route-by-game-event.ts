import { ROUTE } from '../../routes';
import { GameEvent, GameEventType } from './types';

export function getRouteByGameEvent(gameEvent: GameEvent | null): string | null {

  if (gameEvent === null) {
    return null;
  }

  switch (gameEvent.type) {
    case GameEventType.Challenge:
      return ROUTE.CHALLENGE;
    case GameEventType.Enemy:
      return ROUTE.ENEMY;
    case GameEventType.NonPlayingCharacter:
      return ROUTE.NPC;
    case GameEventType.Rest:
      return ROUTE.REST;
    case GameEventType.VoidEnergySource:
      return ROUTE.ENERGY_SORCE;
  }
}
