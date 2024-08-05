import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergySourceFeatureComponent } from './energy-source.component';

describe('EnergySourceFeatureComponent', () => {
  let component: EnergySourceFeatureComponent;
  let fixture: ComponentFixture<EnergySourceFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergySourceFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergySourceFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
