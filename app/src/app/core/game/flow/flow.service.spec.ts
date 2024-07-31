import { TestBed } from '@angular/core/testing';

import { GameFlowService } from './game-flow.service';

describe('GameFlowService', () => {
  let service: GameFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
