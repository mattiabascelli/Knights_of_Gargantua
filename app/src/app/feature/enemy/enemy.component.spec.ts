import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyFeatureComponent } from './enemy.component';

describe('EnemyFeatureComponent', () => {
  let component: EnemyFeatureComponent;
  let fixture: ComponentFixture<EnemyFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemyFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemyFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
