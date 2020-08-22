import { AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
/*
    Essa interface vai modelar o arquivo recebido do Firebase,
    ou seja quando usarmos essa interface o Angular ler essa
    interface, ela vai moldar o arquivo de dados oriundo
    do firebase com base nessa interface abaixo.
*/
export interface FileEntry{    
    file:File,
    name:string,
    task:AngularFireUploadTask,
    percentage:Observable<number>,
    uploading:Observable<boolean>,
    finished:Observable<boolean>,
    paused:Observable<boolean>,
    error:Observable<boolean>,
    canceled:Observable<boolean>,
    bytesUploaded:Observable<number>,
    state:Observable<string>
}

/*
    Aqui temos o molde de cada arquivo individualmente, ou seja
    como ele deve ser moldado.
*/
export interface EachFile{
    filename:string,
    size:number,
    date:number,
    path:string,
    id?:string,
    url?:Observable<string>
}

