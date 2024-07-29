import { Component, viewChild } from '@angular/core';

import { FightScenarioComponent } from '@/common/components/fight-scenario';

@Component({
  selector: 'app-feature-enemy',
  standalone: true,
  imports: [
    FightScenarioComponent,
  ],
  templateUrl: './enemy.component.html',
  styleUrl: './enemy.component.css'
})
export class EnemyFeatureComponent {

  fightScenario = viewChild.required(FightScenarioComponent);

  onAttackAction() {
    console.log('onAttackAction');
    this.fightScenario().animateEnemyHit();
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
