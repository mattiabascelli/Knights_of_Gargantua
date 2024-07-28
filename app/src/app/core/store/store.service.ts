import { inject, Injectable } from '@angular/core';

import { PlayerStoreFeatureService } from './player/player.service';
import { UiStoreFeatureService } from './ui/ui.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  ui = inject(UiStoreFeatureService);
  player = inject(PlayerStoreFeatureService);
}
