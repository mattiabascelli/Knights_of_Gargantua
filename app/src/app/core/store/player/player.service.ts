import { computed, Injectable, Signal, signal } from '@angular/core';

import { Player } from '@/core/game/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerStoreFeatureService {

  initialized = signal(false);
  name = signal('');
  health = signal(0);
  healthCap = signal(0);
  agility = signal(0);
  presence = signal(0);
  strength = signal(0);
  toughness = signal(0);
  damage = signal(0);
  armor = signal(0);
  potions = signal(0);
  potionsCap = signal(0);
  scrollBlast = signal(0);
  enchantedArmorDurability = signal(0);
  enchantedWeaponDurability = signal(0);
  voidEnergy = signal(0);
  level = signal(0);
  exp = signal(0);

  player: Signal<Player> = computed(() => ({
    name: this.name(),
    health: this.health(),
    healthCap: this.healthCap(),
    agility: this.agility(),
    presence: this.presence(),
    strength: this.strength(),
    toughness: this.toughness(),
    damage: this.damage(),
    armor: this.armor(),
    potions: this.potions(),
    potionsCap: this.potionsCap(),
    scrollBlast: this.scrollBlast(),
    enchantedArmorDurability: this.enchantedArmorDurability(),
    enchantedWeaponDurability: this.enchantedWeaponDurability(),
    voidEnergy: this.voidEnergy(),
    level: this.level(),
    exp: this.exp(),
    image: {
      idle: '/img/human.png', // TODO
      back: '/img/human-back.png', // TODO
      enchanting: '/img/human-enchanting.png', // TODO
    },
  }));
}
