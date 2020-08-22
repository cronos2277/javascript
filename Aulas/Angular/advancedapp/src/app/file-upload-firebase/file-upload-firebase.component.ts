import { Component, OnInit, OnChanges } from '@angular/core';
import { FilesService } from './files.service';
import {FileEntry,EachFile} from './file.entry.module';

@Component({
  selector: 'app-file-upload-firebase',
  templateUrl: './file-upload-firebase.component.html',
  styleUrls: ['./file-upload-firebase.component.css']
})
export class FileUploadFirebaseComponent implements OnInit {

  public files:FileEntry[] = [];
  public cli_files:FileList[] = [];
  constructor(
    private upload:FilesService
  ) { }

  ngOnInit() {
    
  }

  public ondropfiles(file:FileList){
    this.files.splice(0,this.files.length);
    for(let i=0;i<file.length;i++){
      this.files.push({
        file:file.item[i],
        percentage: null,
        uploading:null,
        bytesUploaded:null,
        canceled: null,
        error: null,
        finished:null,
        paused:null,
        state:null,
        task:null
      });
      //this.upload.uploadFile(file.item(i));            
    }    
      this.cli_files.push(file);
      console.log("ondropfiles: ",this.cli_files);      
      
  }

  public exec(){
    console.log(this.files);
  }
  
}
