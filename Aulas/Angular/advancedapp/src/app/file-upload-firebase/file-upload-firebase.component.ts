import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FilesService } from './files.service';
import {FileEntry} from './file.entry.module';

@Component({
  selector: 'app-file-upload-firebase',
  templateUrl: './file-upload-firebase.component.html',
  styleUrls: ['./file-upload-firebase.component.css']
})
export class FileUploadFirebaseComponent implements OnInit {

  public files:FileEntry[] = [];  
  constructor(
    private upload:FilesService
  ) { }

  ngOnInit() {
    
  }

  public ondropfiles(file:FileList){        
    for(let i=0;i<file.length;i++){
      this.files.push({        
        file:file[i],
        name:file[i].name,
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
      console.log("Array preenchido",this.files)                
    }
                      
  }

  public submit(event){
    this.uploading();
  }

  private uploading(){    
    this.files.forEach(
      each => this.upload.upload(each)
    )
  }

  public reset(event){    
    this.files = [];
    console.log(event);
  }   
  
  //splice apaga elemento do array, o primeiro parametro 
  //eh o indice e o segundo a quantidade
  remove(index:number){
    this.files.splice(index,1);    
  }
  
}
