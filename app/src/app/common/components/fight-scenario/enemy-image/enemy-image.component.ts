import { Component, computed, HostBinding, input, signal } from '@angular/core';

const HIT_ANIMATION_DURATION = 300; // 0.3 seconds

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
  hitPath = input.required<string>();
  alt = input<string>();
  width = input<string>('250');
  height = input<string>('350');

  hitting = signal(false);
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

  @HostBinding('class.--hitting')
  get cssHitting() {
    return this.hitting();
  }

  // @publicApi
  hit() {
    this.hitting.set(true);
    setTimeout(() => this.hitting.set(false), HIT_ANIMATION_DURATION);
  }

  private addPixels(measure: string): string {
    return measure.endsWith('px') ? measure : `${measure}px`;
  }

  private stripPixels(measure: string): string {
    return measure.replace('px', '');
  }
}
