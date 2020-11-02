import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUnicComponent } from './vehicle-unic.component';

describe('VehicleUnicComponent', () => {
  let component: VehicleUnicComponent;
  let fixture: ComponentFixture<VehicleUnicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleUnicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleUnicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
