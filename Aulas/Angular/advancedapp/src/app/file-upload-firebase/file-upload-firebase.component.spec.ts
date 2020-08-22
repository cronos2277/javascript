import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadFirebaseComponent } from './file-upload-firebase.component';

describe('FileUploadFirebaseComponent', () => {
  let component: FileUploadFirebaseComponent;
  let fixture: ComponentFixture<FileUploadFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
