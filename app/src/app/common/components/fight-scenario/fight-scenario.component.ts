import { Component, output, viewChild } from '@angular/core';

import { FighterIndicatorComponent } from './fighter-indicator/fighter-indicator.component';
import { EnemyImageComponent } from './enemy-image/enemy-image.component';

@Component({
  selector: 'app-fight-scenario',
  standalone: true,
  imports: [
    FighterIndicatorComponent,
    EnemyImageComponent,
  ],
  templateUrl: './fight-scenario.component.html',
  styleUrl: './fight-scenario.component.css'
})
export class FightScenarioComponent {
  attacked = output();
  healed = output();
  enchanted = output();
  usedScroll = output();

  private enemyImage = viewChild.required(EnemyImageComponent);

  // @publicApi
  animateEnemyHit() {
    this.enemyImage().hit();
  }
}
