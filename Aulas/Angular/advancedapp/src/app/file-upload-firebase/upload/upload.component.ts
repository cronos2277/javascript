import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Output(null) dropFiles = new EventEmitter<FileList>();     
  constructor() { }
  public isdragging:boolean = false;
  ngOnInit() {
  }

  public ondragover(event:DragEvent){
    /*
      Executado quando o usuario arrasta um arquivo dentro do bloco
    */
    event.preventDefault();    
    this.isdragging = true;
  }

  public ondragleave(event:DragEvent){
    /*
      Executado quando o usuario larga o botao
      do mouse.
    */
    event.preventDefault();
    console.log("Event no dragleave: ",event);
    this.isdragging = false;
  }

  public ondrop(event:DragEvent){
    /*
      Executado quando o elemento eh largado
    */
    event.preventDefault();
    console.log("Event no ondrop: ",event);
    console.log("DroppedFiles", event.dataTransfer);   
    this.dropFiles.emit(event.dataTransfer.files); 
    this.isdragging = false;        
  } 

}
