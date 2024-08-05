import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightScenarioComponent } from './fight-scenario.component';

describe('FightScenarioComponent', () => {
  let component: FightScenarioComponent;
  let fixture: ComponentFixture<FightScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightScenarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
