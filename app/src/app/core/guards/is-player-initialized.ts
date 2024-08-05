import { inject } from '@angular/core';
import { RedirectCommand, Router } from '@angular/router';

import { DEFAULT_ROUTE } from '../routes';
import { StoreService } from '../store';

export function isPlayerInitialized() {
  const router = inject(Router);
  const store = inject(StoreService);

  if (!store.player.initialized()) {
    store.ui.notifications.error('Player is not initialized!');
    const welcomePage = router.parseUrl(`/${DEFAULT_ROUTE}`);
    return new RedirectCommand(welcomePage);
  }

  return true;
}
