import { signalState } from '@ngrx/signals';

export type CombatCharacter = {
  attack: number;
  attackBonus: number;
  armor: number;
  armorBonus: number;
};

export type KogPlayerImage = {
  idle: string;
  back: string;
  enchanting: string;
};

export type KogPlayer = {
  name: string;
  health: number;
  healthCap: number;
  attack: number;
  attackBonus: number;
  armor: number;
  armorBonus: number;
  potions: number;
  potionsCap: number;
  enchantedArmorDurability: number;
  enchantedWeaponDurability: number;
  voidEnergy: number;
  level: number;
  exp: number;
  image: KogPlayerImage;
};

export type KogEnemy = {
  name: string;
  title: string;
  health: number;
  healthCap: number;
  armor: number;
  armorBonus: number;
  attack: number;
  attackBonus: number;
};

export enum KogPage {
  Welcome = 'welcome',
  Fight = 'fight',
}

export type KogState = {
  player: KogPlayer | null;
  enemy: KogEnemy | null;
  page: KogPage;
};

export const KOG_INITIAL_STATE: KogState = {
  player: null,
  enemy: null,
  page: KogPage.Welcome,
};

export function createKogState() {
  return signalState<KogState>(KOG_INITIAL_STATE);
}