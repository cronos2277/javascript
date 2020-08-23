import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileEntry, EachFile } from './file.entry.module';
import { map, catchError, finalize } from 'rxjs/operators';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { of, from, Observable } from 'rxjs';
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
    /*
      Quando voce se conecta ao database do google, voce pode passar uma funcao como segundo
      parametro e esse segundo parametro poderia ser um orderBy, ou uma clausura where como
      o exemplo abaixo.
      ref.orderBy('date','asc') => O primeiro e a coluna e o segundo seria asc ou desc como no SQL.
      ref.where("1","==","1") => O primeiro e o terceiro sao os valores e o segundo seria a comparacao,
      tipo >< ou == ou != por exemplo. Voce tembem pode encadear como no exemplo abaixo.
      ref => ref.orderBy('date','asc').where("1","==","1")
    */
    this.collection = this.firestore.collection(this.collectionName,ref => ref.orderBy('date'))
  }
  
  public uploadFile(file:File){
    const path = `${this.collectionName}/${file.name}`;
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
    const path = (!folder)?`${this.collectionName}/${filename}`:`${folder}/${filename}`;
    file.task = this.storage.upload(path,file.file);
    file.state = file.task.snapshotChanges().pipe(
      map((s:UploadTaskSnapshot) => file.task.task.snapshot.state),
      catchError(s => of(file.task.task.snapshot.state))
    );
    this.fillAttr(file);
    file.task.snapshotChanges().pipe(
      finalize(() => {         //O finilize chama a cb de conclusao.
        if(file.task.task.snapshot.state == "success"){
          this.collection.add({
            filename:file.file.name,
            path: path,
            date: (new Date()).getTime(),
            size:file.file.size
          });
        }
      })
    ).subscribe(); //Nunca esqueca de dar subscribe eu esqueci disso a database nao era inscrita.
  }

  public fillAttr(file:FileEntry){
    /*
      Os eventos de play, pause, cancelar, assim como o progresso entre outros sao observables.
      e das formas abaixo voce consegue pegar isso.
    */
    file.percentage = file.task.percentageChanges();
    file.uploading = file.state.pipe(map(s => s == "running"));
    file.finished = from(file.task).pipe(map(s => s.state == "success"));
    file.paused = file.state.pipe(map(s => s == "paused"));
    file.error = file.state.pipe(map(s => s == "error"));
    file.canceled = file.state.pipe(map(s => s == "canceled"));
    file.bytesUploaded = file.task.snapshotChanges().pipe(map(s => s.bytesTransferred));
  }

  getFiles():Observable<EachFile[]>{
    return this.collection.snapshotChanges()
    .pipe(
      map((actions) => {        
        return actions.map(a => {
            const file:EachFile = a.payload.doc.data();
            const id = a.payload.doc.id;
            const url = this.storage.ref(file.path).getDownloadURL();
            return {id,...file,url};
          }
        )
      })
    )
  }

  deleteFile(file: EachFile) {
    this.storage.ref(file.path).delete();
    this.collection.doc(file.id).delete();
  }

}
