import { Routes } from '@angular/router';

import { WelcomeComponent } from './feature/welcome';
import { FightComponent, isPlayerInitialized } from './feature/fight';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome',
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'fight',
    component: FightComponent,
    canActivate: [isPlayerInitialized],
  },
];
