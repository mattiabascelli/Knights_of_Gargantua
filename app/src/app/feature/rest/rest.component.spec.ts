import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestFeatureComponent } from './rest.component';

describe('RestFeatureComponent', () => {
  let component: RestFeatureComponent;
  let fixture: ComponentFixture<RestFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
