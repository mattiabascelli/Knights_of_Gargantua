import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectFeatureComponent } from './collect.component';

describe('CollectFeatureComponent', () => {
  let component: CollectFeatureComponent;
  let fixture: ComponentFixture<CollectFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
