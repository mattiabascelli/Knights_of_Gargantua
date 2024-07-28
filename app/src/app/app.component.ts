import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { GameFlowService, getRouteByGameEvent } from './core/game';
import { StoreService } from './core/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private router = inject(Router);
  private gameFlow = inject(GameFlowService);
  private store = inject(StoreService);

  onNextGameEventEffect = effect(() => this.onNextGameEvent());
  onNotificationEffect = effect(() => this.onNotification());

  private onNextGameEvent() {
    const gameEvent = this.gameFlow.event();
    const route = getRouteByGameEvent(gameEvent);
    if (route) {
      this.router.navigate([`/${route}`]);
    }
  }

  private onNotification() {
    const notifications = this.store.ui.notifications.notifications();
    notifications.forEach(notif => console.log(notif));
  }
}
