import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerStoreFeatureService {
  initialized = signal(false);
  name = signal('');
  health = signal(-1);
  agility = signal(-1);
  presence = signal(-1);
  strength = signal(-1);
  toughness = signal(-1);
  damage = signal(0);
  armor = signal(0);
  potions = signal(0);
  enchantedArmorDurability = signal(-1);
  enchantedWeaponDurability = signal(-1);
  voidEnergy = signal(0);
}
