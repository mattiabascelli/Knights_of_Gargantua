import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnemyStoreFeatureService {
  name = signal('');
  health = signal(0);
  armor = signal(0);
  damage = signal(0);
}
