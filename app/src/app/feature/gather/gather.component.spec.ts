import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatherComponent } from './gather.component';

describe('GatherComponent', () => {
  let component: GatherComponent;
  let fixture: ComponentFixture<GatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
