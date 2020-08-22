import { Component, OnInit } from '@angular/core';
import { FilesService } from './files.service';

@Component({
  selector: 'app-file-upload-firebase',
  templateUrl: './file-upload-firebase.component.html',
  styleUrls: ['./file-upload-firebase.component.css']
})
export class FileUploadFirebaseComponent implements OnInit {

  constructor(
    private upload:FilesService
  ) { }

  ngOnInit() {
  }

  public ondropfiles(file:FileList){
    for(let i=0;i<file.length;i++){
      this.upload.uploadFile(file.item(i));
    }
      console.log("ondropfiles: ",file);
  }
}
