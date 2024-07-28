import { TestBed } from '@angular/core/testing';

import { PlayerStoreFeatureService } from './player.service';

describe('PlayerStoreFeatureService', () => {
  let service: PlayerStoreFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerStoreFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
