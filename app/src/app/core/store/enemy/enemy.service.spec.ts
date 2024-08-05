import { TestBed } from '@angular/core/testing';

import { EnemyStoreFeatureService } from './enemy.service';

describe('EnemyStoreFeatureService', () => {
  let service: EnemyStoreFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnemyStoreFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
