import { inject } from '@angular/core';

import { PlayerStoreFeatureService } from '@/core/store/player';
import { RedirectCommand, Router } from '@angular/router';

export function isPlayerInitialized() {
  const router = inject(Router);
  const player = inject(PlayerStoreFeatureService);

  if (!player.initialized()) {
    console.log('Player is not inizialized, redirect to welcome page');
    const url = router.parseUrl('/welcome');
    return new RedirectCommand(url);
  }

  return true;
}
