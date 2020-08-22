import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }
  public isdragging:boolean = false;
  ngOnInit() {
  }

  public ondragover(event:DragEvent){
    console.log(event);
    this.isdragging = true;
  }

  public ondragleave(event:DragEvent){
    console.log(event);
    this.isdragging = false;
  }

}
