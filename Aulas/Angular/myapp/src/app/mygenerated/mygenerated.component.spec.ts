import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MygeneratedComponent } from './mygenerated.component';

describe('MygeneratedComponent', () => {
  let component: MygeneratedComponent;
  let fixture: ComponentFixture<MygeneratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MygeneratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MygeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
