import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullIncidenciaComponent } from './full-incidencia.component';

describe('FullIncidenciaComponent', () => {
  let component: FullIncidenciaComponent;
  let fixture: ComponentFixture<FullIncidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullIncidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
