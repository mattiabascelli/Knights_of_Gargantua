import { patchState } from '@ngrx/signals';

import { GameSeq } from '@/common/gameseq';
import { enemyEvent, KogEvent, pageEvent, playerEvent } from './events';
import { createKogState } from './state';
import { assertPlayerExists, assertEnemyExists, calculateDamage, baseCrit, createNewPlayer, chance } from './functions';

export function registerKogGameHandlers(game: GameSeq<KogEvent>) {

  const state = createKogState();

  game.on(KogEvent.PlayerChoosesName, (event, trigger) => {
    const playerName = event.payload;
    const player = createNewPlayer(playerName);
    patchState(state, { player });
    trigger(pageEvent.fight());
  });

  game.on(KogEvent.PlayerAttacks, (_, trigger) => {
    const currentState = state();
    assertPlayerExists(currentState);
    assertEnemyExists(currentState);

    if (chance(10)) {
      return trigger(playerEvent.misses());
    }

    trigger(playerEvent.hits());
  });

  game.on(KogEvent.PlayerMisses, (_, trigger) => {
    const currentState = state();
    assertPlayerExists(currentState);
    assertEnemyExists(currentState);
    trigger(enemyEvent.attacks());
  });

  game.on(KogEvent.PlayerHits, (_, trigger) => {
    const currentState = state();
    assertPlayerExists(currentState);
    assertEnemyExists(currentState);
    const player = state.player()!;
    const enemy = structuredClone(state.enemy()!);
    const damage = calculateDamage(player, enemy, baseCrit);
    enemy.health -= damage;

    if (enemy.health <= 0) {
      return trigger(enemyEvent.dies());
    }

    patchState(state, { enemy });
    trigger(enemyEvent.attacks());
  });

  game.on(KogEvent.EnemyAttacks, (_, trigger) => {
    const currentState = state();
    assertPlayerExists(currentState);
    assertEnemyExists(currentState);

    if (chance(10)) {
      return trigger(enemyEvent.misses());
    }
    
    trigger(enemyEvent.hits());
  });

  game.on(KogEvent.EnemyHits, (_, trigger) => {
    const currentState = state();
    assertPlayerExists(currentState);
    assertEnemyExists(currentState);

    const player = structuredClone(currentState.player!);
    const enemy = currentState.enemy!;
    const damage = calculateDamage(enemy, player, baseCrit);
    player.health -= damage;

    if (enemy.health <= 0) {
      return trigger(playerEvent.dies());
    }

    patchState(state, { player });
  });
}