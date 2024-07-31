import { Component, HostListener, input, output, signal, viewChild } from '@angular/core';

import { DEFAULT_ANIMATION_DURATION } from '@/core/game/constants';
import { Enemy } from '@/core/game/enemy';
import { Player } from '@/core/game/player';
import { KeyboardKeyCode } from '@/common/types';
import { PadStartPipe } from '@/common/pipes/pad-start';
import { FighterIndicatorComponent } from './fighter-indicator/fighter-indicator.component';
import { EnemyImageComponent } from './enemy-image/enemy-image.component';

@Component({
  selector: 'app-fight-scenario',
  standalone: true,
  imports: [
    FighterIndicatorComponent,
    EnemyImageComponent,
    PadStartPipe,
  ],
  templateUrl: './fight-scenario.component.html',
  styleUrl: './fight-scenario.component.css'
})
export class FightScenarioComponent {

  player = input.required<Player>();
  enemy = input.required<Enemy>();
  animationDuration = input(DEFAULT_ANIMATION_DURATION);

  attacked = output();
  healed = output();
  enchanted = output();
  usedScroll = output();

  isAttacking = signal(false);
  isDefending = signal(false);

  private enemyImage = viewChild.required(EnemyImageComponent);

  // @publicApi
  async attack() {
    this.isAttacking.set(true);
    await this.enemyImage().defend();
    this.isAttacking.set(false);
  }

  // @publicApi
  async defend() {
    this.isDefending.set(true);
    await this.enemyImage().attack();
    this.isDefending.set(false);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    switch (event.code) {
      case KeyboardKeyCode.W:
        this.attacked.emit();
        break;
      case KeyboardKeyCode.A:
        this.enchanted.emit();
        break;
      case KeyboardKeyCode.S:
        this.healed.emit();
        break;
      case KeyboardKeyCode.D:
        this.usedScroll.emit();
        break;
    }
  }
}
