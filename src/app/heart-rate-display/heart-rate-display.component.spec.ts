import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartRateDisplayComponent } from './heart-rate-display.component';

describe('HeartRateDisplayComponent', () => {
  let component: HeartRateDisplayComponent;
  let fixture: ComponentFixture<HeartRateDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartRateDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartRateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
