import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioModuloComponent } from './formulario-modulo.component';

describe('FormularioModuloComponent', () => {
  let component: FormularioModuloComponent;
  let fixture: ComponentFixture<FormularioModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
