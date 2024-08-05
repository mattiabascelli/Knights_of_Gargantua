export type Player = {
  name: string;
  health: number;
  healthCap: number;
  agility: number;
  presence: number;
  strength: number;
  toughness: number;
  damage: number;
  armor: number;
  potions: number;
  potionsCap: number;
  scrollBlast: number;
  enchantedArmorDurability: number;
  enchantedWeaponDurability: number;
  voidEnergy: number;
  level: number;
  exp: number;
  image: {
    idle: string;
    back: string;
    enchanting: string;
  };
};
