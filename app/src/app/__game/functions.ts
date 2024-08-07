import { CombatCharacter, KogPlayer, KogState } from './state';

export function createNewPlayer(name: string): KogPlayer {
  return {
    name,
    health: 5,
    healthCap: 5,
    attack: 1,
    attackBonus: 0,
    armor: 0,
    armorBonus: 0,
    potions: 1,
    potionsCap: 1,
    enchantedArmorDurability: 0,
    enchantedWeaponDurability: 0,
    voidEnergy: 0,
    level: 1,
    exp: 0,
    image: {
      idle: '/img/human.png',
      back: '/img/human-back.png',
      enchanting: '/img/human-enchanting.png',
    },
  };
}

export function assertPlayerExists(state: KogState) {
  const player = state.player;
  if (!player) {
    throw new Error('No player exists!');
  }
}

export function assertEnemyExists(state: KogState) {
  const enemy = state.enemy;
  if (!enemy) {
    throw new Error('No enemy exists!');
  }
}

export function calculateDamage(
  a: CombatCharacter,
  b: CombatCharacter,
  critFn?: (a: CombatCharacter, b: CombatCharacter) => number,
) {
  const attackCrit = critFn ? critFn(a, b) : 0;
  const attack = a.attack + a.attackBonus + attackCrit;
  const armor = b.armor + b.armorBonus;
  return attack - armor;
}

export function baseCrit(
  a: CombatCharacter,
  b: CombatCharacter,
): number {
  return chance(5) ? 1 : 0;
}

export function chance(thresholdPercentage: number) {
  if (thresholdPercentage >= 100) {
    return true;
  }

  return Math.random() > 1 - (thresholdPercentage / 100);
}