import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergySourceComponent } from './energy-source.component';

describe('EnergySourceComponent', () => {
  let component: EnergySourceComponent;
  let fixture: ComponentFixture<EnergySourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergySourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
