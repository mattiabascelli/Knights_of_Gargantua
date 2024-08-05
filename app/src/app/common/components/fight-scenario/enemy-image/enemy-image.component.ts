import { Component, computed, HostBinding, input, signal } from '@angular/core';

import { DEFAULT_ANIMATION_DURATION } from '@/core/game/constants';
import { wait } from '@/common/functions';

@Component({
  selector: 'app-enemy-image',
  exportAs: 'app-enemy-image',
  standalone: true,
  imports: [],
  templateUrl: './enemy-image.component.html',
  styleUrl: './enemy-image.component.css',
})
export class EnemyImageComponent {

  idlePath = input.required<string>();
  defendingPath = input.required<string>();
  alt = input<string>();
  width = input<string>('250');
  height = input<string>('350');
  animationDuration = input(DEFAULT_ANIMATION_DURATION);

  attacking = signal(false);
  defending = signal(false);
  widthNumeric = computed(() => this.stripPixels(this.width()));
  heightNumeric = computed(() => this.stripPixels(this.height()));

  @HostBinding('style.--_width')
  get cssWidth() {
    return this.addPixels(this.width());
  }

  @HostBinding('style.--_height')
  get cssHeight() {
    return this.addPixels(this.height());
  }

  @HostBinding('class.--attacking')
  get cssAttacking() {
    return this.attacking();
  }

  @HostBinding('class.--defending')
  get cssDefending() {
    return this.defending();
  }

  // @publicApi
  async attack(): Promise<void> {
    this.attacking.set(true);
    await wait(this.animationDuration());
    this.attacking.set(false);
  }

  // @publicApi
  async defend(): Promise<void> {
    this.defending.set(true);
    await wait(this.animationDuration());
    this.defending.set(false);
  }

  private addPixels(measure: string): string {
    return measure.endsWith('px') ? measure : `${measure}px`;
  }

  private stripPixels(measure: string): string {
    return measure.replace('px', '');
  }
}
