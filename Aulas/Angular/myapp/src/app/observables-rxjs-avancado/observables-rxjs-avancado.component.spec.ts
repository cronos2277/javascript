import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesRxjsAvancadoComponent } from './observables-rxjs-avancado.component';

describe('ObservablesRxjsAvancadoComponent', () => {
  let component: ObservablesRxjsAvancadoComponent;
  let fixture: ComponentFixture<ObservablesRxjsAvancadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservablesRxjsAvancadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservablesRxjsAvancadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
