import { Injectable, signal } from '@angular/core';

export type PlayerStats = {
  agility: number;
  presence: number;
  strength: number;
  toughness: number;
};

@Injectable({
  providedIn: 'root'
})
export class PlayerStoreFeatureService {

  initialized = signal(false);
  name = signal('');
  health = signal(-1);
  stats = signal<PlayerStats>({
    agility: 0,
    presence: 0,
    strength: 0,
    toughness: 0,
  });
  damage = signal(0);
  armor = signal(0);
  potions = signal(0);
  maxPotions = signal(0);
  scrollBlast = signal(0);
  enchantedArmorDurability = signal(0);
  enchantedWeaponDurability = signal(0);
  voidEnergy = signal(0);
  level = signal(0);
  exp = signal(0);
}
