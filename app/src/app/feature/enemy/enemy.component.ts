import { Component, inject, OnInit, viewChild } from '@angular/core';

import { FightScenarioComponent } from '@/common/components/fight-scenario';
import { StoreService } from '@/core/store';
import { GameFlowService } from '@/core/game/flow';

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

  private gameFlow = inject(GameFlowService);
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
    this.gameFlow.enqueueDebounced({
      name: 'onAttackAction',
      fn: async () => {
        // TODO: Check for missed attack
        await this.fightScenario().attack();
        const damage = 1; // TODO
        this.store.enemy.takeDamage(damage);
      },
    });
  }

  onHealedAction() {
    this.gameFlow.enqueueDebounced({
      name: 'onHealedAction',
      fn: async () => {
        // TODO...
      },
    });
  }

  onEnchantedAction() {
    this.gameFlow.enqueueDebounced({
      name: 'onEnchantedAction',
      fn: async () => {
        // TODO...
      },
    });
  }

  onUsedScrollAction() {
    this.gameFlow.enqueueDebounced({
      name: 'onUsedScrollAction',
      fn: async () => {
        // TODO...
      },
    });
  }
}
