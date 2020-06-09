import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModuloComponent } from './http-modulo.component';

describe('HttpModuloComponent', () => {
  let component: HttpModuloComponent;
  let fixture: ComponentFixture<HttpModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
