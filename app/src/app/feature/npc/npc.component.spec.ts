import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcFeatureComponent } from './npc.component';

describe('NpcFeatureComponent', () => {
  let component: NpcFeatureComponent;
  let fixture: ComponentFixture<NpcFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpcFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpcFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
