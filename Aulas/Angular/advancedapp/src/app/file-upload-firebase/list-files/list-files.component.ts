import { Component, OnInit} from '@angular/core';
import { FilesService } from '../files.service';
import { Observable } from 'rxjs';
import { EachFile } from '../file.entry.module';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit{

  files:Observable<EachFile[]>;
  constructor(
    private service:FilesService
  ) { }
  
  ngOnInit() {    
    this.files = this.service.getFiles();
    this.files.subscribe(
      e => console.log("Files cought from Firebase:",e)
    );
  } 

  /*
    Essa funcao ela formata a data, no caso o uso dela 
    no template esta nessa linha:
    <li>Data: {{file.date | date:'medium'}}</li>
  */
  public getDate(date){
    return date(date);
  }

  public delete(file:EachFile){
    if(confirm("Do you want remove?"))this.service.deleteFile(file);
  }
}
