import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyImageComponent } from './enemy-image.component';

describe('EnemyImageComponent', () => {
  let component: EnemyImageComponent;
  let fixture: ComponentFixture<EnemyImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemyImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
