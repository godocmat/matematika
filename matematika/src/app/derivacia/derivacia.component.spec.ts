import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivaciaComponent } from './derivacia.component';

describe('DerivaciaComponent', () => {
  let component: DerivaciaComponent;
  let fixture: ComponentFixture<DerivaciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DerivaciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DerivaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
