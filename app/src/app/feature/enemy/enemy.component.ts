import { Component, inject, OnInit, viewChild } from '@angular/core';

import { FightScenarioComponent } from '@/common/components/fight-scenario';
import { StoreService } from '@/core/store';

@Component({
  selector: 'app-feature-enemy',
  standalone: true,
  imports: [
    FightScenarioComponent,
  ],
  templateUrl: './enemy.component.html',
  styleUrl: './enemy.component.css'
})
export class EnemyFeatureComponent implements OnInit {

  private store = inject(StoreService);

  player = this.store.player.player;
  enemy = this.store.enemy.enemy;

  fightScenario = viewChild.required(FightScenarioComponent);

  // TODO: Remove
  constructor() {
    this.store.player.name.set('John Doe');
    this.store.player.level.set(3);
    this.store.player.health.set(10);
    this.store.player.healthCap.set(10);
    this.store.player.initialized.set(true);

    this.store.enemy.name.set('Some Random Monster');
    this.store.enemy.level.set(1);
    this.store.enemy.health.set(4);
    this.store.enemy.healthCap.set(4);
    this.store.enemy.damage.set(2);
    this.store.enemy.initialized.set(true);
  }

  ngOnInit() {
    this.store.enemy.defeated.subscribe(() => {
      console.log('Enemy was defeated!');
      this.store.enemy.health.set(this.store.enemy.healthCap());
      this.store.enemy.initialized.set(true);
    });
  }

  async onAttackAction() {
    console.log('onAttackAction');
    // TODO: Check for missed attack
    await this.fightScenario().attack();
    const damage = 1; // TODO
    this.store.enemy.takeDamage(damage);
  }

  onHealedAction() {
    console.log('onHealedAction');
  }

  onEnchantedAction() {
    console.log('onEnchantedAction');
  }

  onUsedScrollAction() {
    console.log('onUsedScrollAction');
  }
}
