import { computed, effect, Injectable, OnDestroy, Signal, signal } from '@angular/core';

import { Enemy } from '@/core/game/enemy';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnemyStoreFeatureService implements OnDestroy {

  defeated = new Subject<void>();

  initialized = signal(false);
  name = signal('');
  level = signal(0);
  health = signal(0);
  healthCap = signal(0);
  armor = signal(0);
  damage = signal(0);

  enemy: Signal<Enemy> = computed(() => ({
    name: this.name(),
    level: this.level(),
    health: this.health(),
    healthCap: this.healthCap(),
    armor: this.armor(),
    damage: this.damage(),
    image: {
      idle: '/img/enemy-1.png', // TODO
      defending: '/img/enemy-1-blood.png', // TODO
    },
  }));

  constructor() {
    effect(() => this.effectOnDefeated(), {
      allowSignalWrites: true,
    });
  }

  ngOnDestroy() {
    this.defeated.complete();
  }

  takeDamage(damage: number) {
    this.health.update(health => Math.max(health - damage, 0));
  }

  private effectOnDefeated(): void {
    const health = this.health();
    const initialized = this.initialized();

    if (!initialized) {
      return;
    }

    if (health === 0) {
      this.initialized.set(false);
      this.defeated.next();
    }
  }
}
