import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private storage:AngularFireStorage
  ) { }
  
  public uploadFile(file:File){
    const path = `myfiles/${file.name}`;
    const task = this.storage.upload(path,file);
    task.snapshotChanges().subscribe(
      status => {
        console.log(status)
        return status;
      }
    )
  }

}
