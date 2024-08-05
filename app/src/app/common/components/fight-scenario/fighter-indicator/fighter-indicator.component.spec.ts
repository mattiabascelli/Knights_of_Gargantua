import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterIndicatorComponent } from './fighter-indicator.component';

describe('FighterIndicatorComponent', () => {
  let component: FighterIndicatorComponent;
  let fixture: ComponentFixture<FighterIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FighterIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FighterIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
