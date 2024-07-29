import { Component, computed, HostBinding, input } from '@angular/core';

// TODO: Move
export type CharacterStat = {
  name: string;
  value: number;
};

export const HEALTH_BAR_COLOR = {
  LOW: '#d42e08', // TODO: Choose colors, maybe reference CSS vars
  MID: '#ffac26', // TODO: Choose colors, maybe reference CSS vars
  HIGH: '#5fb519', // TODO: Choose colors, maybe reference CSS vars
} as const;

export type HealthBarColor = typeof HEALTH_BAR_COLOR[
  keyof typeof HEALTH_BAR_COLOR
];

// TODO: Move
export type HealthBarStyle = {
  size: number; // 0 <= size <= 1;
  color: HealthBarColor;
};

@Component({
  selector: 'app-fighter-indicator',
  standalone: true,
  imports: [],
  templateUrl: './fighter-indicator.component.html',
  styleUrl: './fighter-indicator.component.css'
})
export class FighterIndicatorComponent {
  name = input.required<string>();
  level = input.required<number>();
  health = input.required<number>();
  healthCap = input.required<number>();
  width = input<string>();

  private healthBarStyle = computed(() => {
    const current = this.health();
    const max = this.healthCap();
    const size = current / max;
    const color = this.getHealthBarColor(size);
    return { size, color };
  });

  @HostBinding('style.--_health-bar-size')
  get cssHealthBarSize() {
    return this.healthBarStyle().size;
  }

  @HostBinding('style.--_health-bar-color')
  get cssHealthBarColor() {
    return this.healthBarStyle().color;
  }

  @HostBinding('style.--_health-bar-width')
  get cssHealthBarWidth() {
    return this.width();
  }

  private getHealthBarColor(fraction: number): HealthBarColor {
    if (fraction <= 0.1) {
      return HEALTH_BAR_COLOR.LOW;
    }

    if (fraction <= 0.5) {
      return HEALTH_BAR_COLOR.MID;
    }

    return HEALTH_BAR_COLOR.HIGH;
  }
}
