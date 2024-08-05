import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeFeatureComponent } from './challenge.component';

describe('ChallengeFeatureComponent', () => {
  let component: ChallengeFeatureComponent;
  let fixture: ComponentFixture<ChallengeFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
