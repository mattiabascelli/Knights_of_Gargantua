import { TestBed } from '@angular/core/testing';

import { UiStoreFeatureService } from './ui.service';

describe('UiStoreFeatureService', () => {
  let service: UiStoreFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiStoreFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
