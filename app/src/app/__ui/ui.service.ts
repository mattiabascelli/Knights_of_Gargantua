import { Injectable } from '@angular/core';

import { withLoader } from './loader';
import { withNotifications } from './notifications';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loader = withLoader();
  notifications = withNotifications();
}
