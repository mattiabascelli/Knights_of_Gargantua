import { Component, output } from '@angular/core';

import { FighterIndicatorComponent } from "./fighter-indicator/fighter-indicator.component";

@Component({
  selector: 'app-fight-scenario',
  standalone: true,
  imports: [
    FighterIndicatorComponent,
  ],
  templateUrl: './fight-scenario.component.html',
  styleUrl: './fight-scenario.component.css'
})
export class FightScenarioComponent {
  attacked = output();
  healed = output();
  enchanted = output();
  usedScroll = output();
}
