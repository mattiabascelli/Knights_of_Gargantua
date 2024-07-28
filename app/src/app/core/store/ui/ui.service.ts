import { Injectable } from '@angular/core';

import { UiNotifications } from './notification';

@Injectable({
  providedIn: 'root'
})
export class UiStoreFeatureService {
  notifications = new UiNotifications();
}
