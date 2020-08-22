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
    event.preventDefault();
    console.log("Event no dragover: ",event);
    this.isdragging = true;
  }

  public ondragleave(event:DragEvent){
    event.preventDefault();
    console.log("Event no dragleave: ",event);
    this.isdragging = false;
  }

  public ondrop(event:DragEvent){
    event.preventDefault();
    console.log("Event no ondrop: ",event);
    console.log("DroppedFiles", event.dataTransfer);
    this.dropFiles.emit(event.dataTransfer.files);
  }

}
