import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileEntry, EachFile } from './file.entry.module';
import { map, catchError, finalize } from 'rxjs/operators';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { of, from } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  public collectionName = 'myfiles';
  private collection: AngularFirestoreCollection<EachFile>;
  constructor(
    private storage:AngularFireStorage,
    private firestore:AngularFirestore
  ) { 
    this.collection = this.firestore.collection(
      this.collectionName, 
      ref => ref.orderBy('date','asc').where("1","==","1")
    )
  }
  
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

  public upload(file: FileEntry,folder?:string){
    const filename = `${(new Date()).getTime()}_${file.file.name}`;
    const path = (!folder)?`myfiles/${filename}`:`${folder}/${filename}`;
    file.task = this.storage.upload(path,file.file);
    file.state = file.task.snapshotChanges().pipe(
      map((s:UploadTaskSnapshot) => file.task.task.snapshot.state),
      catchError(s => of(file.task.task.snapshot.state))
    );
    this.fillAttr(file);
    file.task.snapshotChanges().pipe(
      finalize(() => {
        if(file.task.task.snapshot.state == "success"){
          this.collection.add({
            filename:file.file.name,
            path: path,
            date: (new Date()).getTime(),
            size:file.file.size
          })
        }
      })
    )
  }

  public fillAttr(file:FileEntry){
    file.percentage = file.task.percentageChanges();
    file.uploading = file.state.pipe(map(s => s == "running"));
    file.finished = from(file.task).pipe(map(s => s.state == "success"));
    file.paused = file.state.pipe(map(s => s == "paused"));
    file.error = file.state.pipe(map(s => s == "error"));
    file.canceled = file.state.pipe(map(s => s == "canceled"));
    file.bytesUploaded = file.task.snapshotChanges().pipe(map(s => s.bytesTransferred));
  }

}
