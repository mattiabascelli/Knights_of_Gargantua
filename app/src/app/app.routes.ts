import { Routes } from '@angular/router';

import { ChallengeFeatureComponent } from './feature/challenge';
import { EnemyFeatureComponent } from './feature/enemy';
import { EnergySourceFeatureComponent } from './feature/energy-source';
import { CollectFeatureComponent } from './feature/collect';
import { NpcFeatureComponent } from './feature/npc';
import { RestFeatureComponent } from './feature/rest';
import { WelcomeFeatureComponent } from './feature/welcome';
import { DEFAULT_ROUTE, ROUTE } from './core/routes';
import { isPlayerInitialized } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: DEFAULT_ROUTE,
  },
  {
    path: ROUTE.WELCOME,
    component: WelcomeFeatureComponent,
  },
  {
    path: ROUTE.CHALLENGE,
    canActivate: [isPlayerInitialized],
    component: ChallengeFeatureComponent,
  },
  {
    path: ROUTE.ENEMY,
    canActivate: [isPlayerInitialized],
    component: EnemyFeatureComponent,
  },
  {
    path: ROUTE.ENERGY_SORCE,
    canActivate: [isPlayerInitialized],
    component: EnergySourceFeatureComponent,
  },
  {
    path: ROUTE.COLLECT,
    canActivate: [isPlayerInitialized],
    component: CollectFeatureComponent,
  },
  {
    path: ROUTE.NPC,
    canActivate: [isPlayerInitialized],
    component: NpcFeatureComponent,
  },
  {
    path: ROUTE.REST,
    canActivate: [isPlayerInitialized],
    component: RestFeatureComponent,
  },
  {
    path: '**',
    component: WelcomeFeatureComponent,
  },
];
