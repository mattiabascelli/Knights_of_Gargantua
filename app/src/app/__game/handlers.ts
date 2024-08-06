import { GameSeq } from '@/common/gameseq';
import { enemyEvent, KogEvent, pageEvent, playerEvent } from './events';

export function registerKogGameHandlers(game: GameSeq<KogEvent>) {

  // State
  let player = {
    name: 'John Doe',
    hp: 10,
  };

  let enemy = {
    hp: 5,
  };

  game.on(KogEvent.PlayerChoosesName, (event, trigger) => {
    player.name = event.payload;
    trigger(pageEvent.fight());
  });

  game.on(KogEvent.PlayerAttacks, (_, trigger) => {
    if (chance(10)) {
      trigger(playerEvent.misses());
      return;
    }

    const damage = 2 + (chance(50) ? 1 : 0);
    trigger(playerEvent.hits(damage));
  });

  game.on(KogEvent.PlayerMisses, (_, trigger) => {
    trigger(enemyEvent.attacks());
  });

  game.on(KogEvent.PlayerHits, (event, trigger) => {
    const damage = event.payload;
    enemy.hp -= damage;
    if (enemy.hp === 0) {
      trigger(enemyEvent.dies());
      return;
    }
    trigger(enemyEvent.attacks());
  });

  game.on(KogEvent.EnemyAttacks, (_, trigger) => {
    if (chance(10)) {
      trigger(enemyEvent.misses());
      return;
    }

    const damage = 2 + (chance(50) ? 1 : 0);
    trigger(enemyEvent.hits(damage));
  });

  game.on(KogEvent.EnemyHits, (event, trigger) => {
    const damage = event.payload;
    player.hp -= damage;
    if (player.hp === 0) {
      trigger(playerEvent.dies());
      return;
    }
  });
}

// TODO: Move
export function chance(thresholdPercentage: number) {
  if (thresholdPercentage >= 100) {
    return true;
  }

  return Math.random() > 1 - (thresholdPercentage / 100);
}
