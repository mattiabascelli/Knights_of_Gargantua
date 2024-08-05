import { inject, Injectable } from '@angular/core';

import { UiStoreFeatureService } from './ui';
import { PlayerStoreFeatureService } from './player';
import { EnemyStoreFeatureService } from './enemy';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  ui = inject(UiStoreFeatureService);
  player = inject(PlayerStoreFeatureService);
  enemy = inject(EnemyStoreFeatureService);
}
